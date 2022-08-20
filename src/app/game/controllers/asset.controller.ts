import { Subject } from 'rxjs';
import { Orientation } from '../extensions/asset/orientation.ts/direction';
import { GSM } from '../game-state-manager.service';
import { Asset, AssetBlock, BackgroundAsset, BlockEdge, PlaceableAsset } from '../models/asset.model';
import { Cell, RenderingLayers } from '../models/map';

export class AssetController {
  public assets: { [assetId: string]: Asset } = {}
  public assetArray: Asset[] = []

  public selectedAssets: Asset[] = []
  public assetBlocks: { [coordinate: string]: AssetBlock } = {}   // coordinate format:  "x1:y1:z2:character"
  public backgroundAssets: BackgroundAsset[] = []

  public assetClickedAtZIndex = new Subject<Asset>();

  constructor() {
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this));
    GSM.KeyController.keyDown.subscribe(this.setDirectionByKey.bind(this))
  }

  public addAsset(asset: Asset, anchoringCell: Cell, zIndex: number): void {
    if(!anchoringCell) { return }

    asset.baseZIndex = zIndex
    asset.anchorCell = anchoringCell
    asset.id = `map:${GSM.GridController.map.id}-cell:${anchoringCell.id}:z${zIndex}:${asset.layer}`;

    this.updateBlockProperty(asset, anchoringCell, zIndex);
    this.refreshAssetIterator();
  }

  public addBackgroundAsset(asset: Asset, zIndex: number): void {
    const block = new AssetBlock()
    block.id = `x${asset.anchorCell.location.x}:y${asset.anchorCell.location.y}:z${zIndex}:background`
    block.cell = asset.anchorCell
    block.obstructed = false,
    block.zIndex = zIndex
    asset.baseZIndex = zIndex    
    asset.ownedBlockIds = [block.id]
    this.backgroundAssets.push(asset);
  }

  public getAssetById(assetId: string): Asset  {
    return this.assets[assetId]
  }

  public getAsset(cell: Cell, zIndex: number, layer: RenderingLayers): Asset {
    if(!cell) { return null}
    const block = this.assetBlocks[`${cell.id}:z${zIndex}:${layer}`];
    return this.assets[block?.ownerAssetId]
  }

  public getAssetByLocation(x: number, y: number, zIndex: number, layer: RenderingLayers): Asset {
    const cell = GSM.GridController.getCellByLocation(x,y)
    return this.getAsset(cell, zIndex, layer)
  }

  public getAssetsByCellAtZ(cell: Cell, zIndex: number): {layer: RenderingLayers, asset: Asset}[] {
    const assets = []
    GSM.RendererController.iterateAllRenderingLayers(layer => {
      const asset = this.getAsset(cell, zIndex, layer)
      if(asset) {
        assets.push({layer, asset})
      }
    })
    return assets
  }

  public getTopAssetByCell(cell: Cell, excludeLayers?: RenderingLayers[]): Asset {
    const blocks = this.getAllAssetBlocksAtCell(cell)
    const assets = blocks.map(block => this.getAssetById(block.ownerAssetId))
    const assetsWithLayer = assets.filter(asset => !excludeLayers.includes(asset.layer))
    
    if(assetsWithLayer.length === 0 ) { return null} 
    
    return assetsWithLayer.pop()
  }

  public getAssetByAnchorCell(cell: Cell): Asset {
    const assets = this.getAssetsByCell(cell)
    return assets.find(asset => asset.anchorCell === cell)
  }

  public getAssetsByAnchorCell(cell: Cell): Asset[] {
    const assets = this.getAssetsByCell(cell)
    return assets.filter(asset => asset.anchorCell.id === cell.id)
  }

  public getSelectedAssets(): Asset[] {
    return this.selectedAssets
  }

  public isCellBlockObstructed(cell: Cell, zIndex): boolean {
    let obstructed = false
    
    GSM.RendererController.iterateAllRenderingLayers(layer => {
      const assetBlock = this.getAssetBlock(cell, zIndex, layer)
      if (assetBlock && assetBlock.obstructed) { obstructed = true }
    })

    return obstructed
  }

  public toggleAssetSelection(asset): void {
    if(this.selectedAssets.find(_asset => _asset.id === asset.id)) {
      this.selectedAssets = this.selectedAssets.filter(_asset => _asset.id !== asset.id)
    } else {
      this.selectedAssets.push(asset)
    }
  }

  public getAssetBlockById(blockId: string): AssetBlock {
    return this.assetBlocks[blockId]
  }

  public getAssetBlock(cell: Cell, zIndex: number, layer: RenderingLayers): AssetBlock {
    return this.assetBlocks[`${cell.id}:z${zIndex}:${layer}`]
  }

  public getAssetBlocksAtZ(cell: Cell, zIndex: number): AssetBlock[] {
    const assetBlocks = []

    GSM.RendererController.iterateAllRenderingLayers((layer) => {
      const block = this.assetBlocks[`${cell.id}:z${zIndex}:${layer}`]
      if(block) {
        assetBlocks.push(block)
      }
    })
    return assetBlocks
  }

  public getAssetBlockInAsset(cell: Cell, zIndex: number, layer: RenderingLayers): AssetBlock[] {
    const asset = this.getAsset(cell, zIndex, layer)
    return asset.ownedBlockIds.map(id => this.getAssetBlockById(id))
  }

  public getAllAssetBlocksAtCell(cell: Cell): AssetBlock[] {
    const assetBlocks = []
    GSM.RendererController.iterateAllRenderingLayers(layer => {
      for(let i = 0; i < GSM.Settings.maxHeight; i++) {
        const assetBlock = this.assetBlocks[`${cell.id}:z${i}:${layer}`]
        if(assetBlock) { assetBlocks.push(assetBlock) }
      }
    })
    return assetBlocks
  }

  public getAllAssetBlocksByEdge(asset: Asset, edge: BlockEdge ): AssetBlock[] {
    if(!asset.ownedBlockIds) { return [] }
    let assetBlocks = []
    const blocks = asset.ownedBlockIds.map(id => this.getAssetBlockById(id))
    
    assetBlocks = blocks.filter(block => {
      return (edge.down === block?.edge.down || edge.down === undefined)
        && (edge.up === block?.edge.up || edge.up === undefined)
        && (edge.north === block?.edge.north || edge.north === undefined)
        && (edge.east === block?.edge.east || edge.east === undefined)
        && (edge.south === block?.edge.south || edge.south === undefined)
        && (edge.west === block?.edge.west || edge.west === undefined)
      })
    return assetBlocks
  }

  public getAssetsByCell(cell: Cell): Asset[] {
    const assetList: Asset[] = []
    for(let i = 0; i < GSM.Settings.maxHeight; i++) {
      GSM.RendererController.iterateAllRenderingLayers(layer => {
        const asset = this.getAsset(cell, i, layer)
        if (asset && !assetList.find(a => a.id === asset.id)) { assetList.push(asset) }
      })
    }
    return assetList
  }

  public iterateAsset(callBack: (asset: Asset) => void) {
    this.assetArray.forEach(asset => { callBack(asset) })
  }

  public deselectAllAssets(): void {
    this.selectedAssets = []
  }

  public changeZAxis(direction: 'up' | 'down', asset: Asset): void {
    const upAssets = GSM.AssetController.getAssetBlocksAtZ(asset.anchorCell, asset.baseZIndex + asset.attributes.size.z)
    const downAssets = GSM.AssetController.getAssetBlocksAtZ(asset.anchorCell, asset.baseZIndex - 1);

    if (direction === 'up' && upAssets.length === 0) {
      this.updateBlockProperty(asset, asset.anchorCell, ++asset.baseZIndex);
      GSM.EventController.assetEnteredCell.next({asset: asset, cell: asset.anchorCell})
      return;
    }
    if (direction === 'down' && downAssets.length === 0) {
      this.updateBlockProperty(asset, asset.anchorCell, --asset.baseZIndex);
      GSM.EventController.assetEnteredCell.next({asset: asset, cell: asset.anchorCell})
      return;
    }

  }

  public switchAssetToNewCell(asset: Asset, newCell: Cell, newZIndex: number) {
    asset.ownedBlockIds.forEach(blockId => {
      delete this.assetBlocks[blockId]
    })

    delete this.assets[asset.id]

    asset.anchorCell = newCell
    asset.id = `map:${GSM.GridController.map.id}-cell:${newCell.id}:z${newZIndex}:${asset.layer}`;
    this.assets[asset.id] = asset
    this.updateBlockProperty(asset, asset.anchorCell, newZIndex)
    this.refreshAssetIterator()
  }

  public removeAsset(asset: Asset): void {
    asset.ownedBlockIds.forEach(id => { delete this.assetBlocks[id] })
    this.selectedAssets = []
    delete this.assets[asset.id]
    this.refreshAssetIterator()
    GSM.RendererController.renderAsSingleImage()
  }

  public refreshAssetIterator(): void {
    const tempArray = []

    Object.keys(this.assets).forEach(key => {
      tempArray.push(this.assets[key])
    })

    this.assetArray = this.sortAssets(tempArray)
  }

  public getAllAssetBlocksCoveringCell(coveredCell: Cell): AssetBlock[] {
    const coveringBlocks: AssetBlock[] = []
    
    GSM.GridController.iterateYCellsFrom(coveredCell.location.y, coveredCell.location.x, (cell: Cell) => {
      const distanceFromHoveringCell = cell.location.y - coveredCell.location.y
      GSM.AssetController.getAllAssetBlocksAtCell(cell).forEach(assetBlock => {
        if(assetBlock.zIndex + (assetBlock.obstructed ? 1 : 0) === distanceFromHoveringCell) {
          coveringBlocks.push(assetBlock)
        }
      })
    })
    return coveringBlocks
  }

  public getFrontBlockCoveringCell(coveredCell: Cell): AssetBlock[] {
    const coveringBlocks: AssetBlock[] = []
    GSM.GridController.iterateYCellsFrom(coveredCell.location.y, coveredCell.location.x, (cell: Cell) => {
      const distanceFromHoveringCell = cell.location.y - coveredCell.location.y
      GSM.AssetController.getAllAssetBlocksAtCell(cell).forEach(assetBlock => {
        if(assetBlock.zIndex === distanceFromHoveringCell) {
          if(assetBlock.obstructed) {
            coveringBlocks.push(assetBlock)
          }
        }
      })
    })
    return coveringBlocks
  }

  public getAssetBlocksCoveringCellAtZ(coveredCell: Cell, zIndex: number): AssetBlock[] {
    const coveringBlocks: AssetBlock[] = []
    
    GSM.GridController.iterateYCellsFrom(coveredCell.location.y + 1, coveredCell.location.x, (cell: Cell) => {
      const distanceFromHoveringCell = cell.location.y - coveredCell.location.y
      GSM.AssetController.getAssetBlocksAtZ(cell, zIndex + distanceFromHoveringCell - 1).forEach(assetBlock => {
        if(assetBlock.obstructed) {
          coveringBlocks.push(assetBlock)
        }
      })  
    })
    return coveringBlocks
  }

  public getAllAssetsCoveringCell(hoveringCell: Cell): Asset[] {
    const assetBlocks = this.getAllAssetBlocksCoveringCell(hoveringCell)
    return assetBlocks.map(block => GSM.AssetController.getAssetById(block.ownerAssetId))
  }
  
 public getTopAssetCoveringCell(hoveringCell: Cell, excludeLayers: RenderingLayers[] = []): Asset{
    const blocks = this.getAllAssetBlocksCoveringCell(hoveringCell)
    const assets = blocks.map(block => GSM.AssetController.getAssetById(block.ownerAssetId))
    const filteredAssets = assets.filter(asset => !excludeLayers.includes(asset.layer)) 
   
    if(filteredAssets.length > 0) {
      return filteredAssets.pop()
    } else {
      return undefined
    }
  }
  
  public getTopAssetBlockCoveringCell(hoveringCell: Cell): AssetBlock {
    return this.getAllAssetBlocksCoveringCell(hoveringCell).pop()
  }

  // Helper

  private animateAsset(frame: number): void {
    GSM.AssetController.iterateAsset((asset: PlaceableAsset) => {
      if (asset.animating) {
        if (frame % asset.animation.changeEveryNthFrame === 0) {
          asset.movement.updateAnimation();
        }
      }
    });
  }

  // obstructed: ["000:010:000", "111:111:111", "111:111:111"]
  private updateBlockProperty(asset: Asset, selectedCell: Cell, zIndex: number) {
    let xOffset = Math.floor(asset.attributes.size.x / 2) 
    xOffset = xOffset - Math.floor(xOffset / 2)
    let yOffset = Math.floor(asset.attributes.size.y / 2)
    yOffset = Math.floor(yOffset / 2)
    
    if(asset.ownedBlockIds) {
      asset.ownedBlockIds.forEach(id => {
        delete this.assetBlocks[id]
      })
    }

    asset.ownedBlockIds = [];
    asset.anchorCell = GSM.GridController.getCellByLocation(selectedCell.location.x - xOffset, selectedCell.location.y + yOffset)

    asset.attributes.obstructed.forEach((zIndexSet, zIndexOffset) => {
      const rows = zIndexSet.split(':');
      let distanceFromAnchor = asset.attributes.size.y - 1;

      rows.forEach((obstructions: string, yIndex) => {
        obstructions.split('').forEach((blockObstruction, xIndex) => {
          const cellY = asset.anchorCell.location.y - distanceFromAnchor;
          const cellX = asset.anchorCell.location.x + xIndex;
          const cell = GSM.GridController.getCellByLocation(cellX, cellY);
          
          const blockEdge: BlockEdge = {
            down: zIndexOffset === 0,
            up: zIndexOffset === asset.attributes.size.z - 1,
            north: yIndex === 0,
            south: yIndex === asset.attributes.size.y - 1,
            east: xIndex === 0,
            west: xIndex === asset.attributes.size.x - 1,
          };
         
          const assetBlock: AssetBlock = {
            id: `${cell.id}:z${zIndex + zIndexOffset}:${asset.layer}`,
            zIndex: zIndex + zIndexOffset,
            cell: cell,
            obstructed: blockObstruction === "1",
            edge: blockEdge,
            ownerAssetId: asset.id
          }

          this.assetBlocks[`${cell.id}:z${zIndex + zIndexOffset}:${asset.layer}`] = assetBlock 
          this.assets[asset.id] = asset

          
          asset.ownedBlockIds.push(assetBlock.id);
        });
        distanceFromAnchor--
      });
    });
  }

  public sortAssets(assetArray: Asset[]): Asset[] {
    let sortedArray = []
    sortedArray = assetArray.sort((a: Asset, b: Asset) => {
      if(a.anchorCell.location.x === b.anchorCell.location.x && a.anchorCell.location.y === b.anchorCell.location.y) {
        if(a.baseZIndex < b.baseZIndex) {
          return -1
        } 
        if(a.baseZIndex === b.baseZIndex) {
          if(a.layer < b.layer) {
            return -1
          }
          return 1
        }
      }
      if(a.anchorCell.location.y < b.anchorCell.location.y) {
        return -1
      }
      if(a.anchorCell.location.y > b.anchorCell.location.y) {
        return 1
      }

      if(a.anchorCell.location.x < b.anchorCell.location.x) {
        return -1
      }
      if(a.anchorCell.location.x > b.anchorCell.location.x) {
        return 1
      }


      return 0
    })
    // sortedArray = sortedArray.filter((a: GridAsset<TerrainTile>) => {
    //   if(!a.tile.topWith) { return true }

    //   if(a.tile.drawsWith || a.tile.drawsWithTop) {
    //     return true
    //   }

    //   return false
    // })
    return sortedArray
  }

  protected setDirectionByKey(keyEvent: KeyboardEvent): void {
    this.selectedAssets.forEach((asset: PlaceableAsset) => {
      if(asset.orientation) {
        if (keyEvent.code === 'KeyW') {
          asset.orientation.currentOrientation = Orientation.Up
        }
    
        if (keyEvent.code === 'KeyA') {
          asset.orientation.currentOrientation = Orientation.Left
        }
    
        if (keyEvent.code === 'KeyD') {
          asset.orientation.currentOrientation= Orientation.Right
        }
    
        if (keyEvent.code === 'KeyS') {
          asset.orientation.currentOrientation = Orientation.Down
        }

        GSM.EventController.playerOrientationChanged.next({asset: asset, cell: asset.anchorCell})
      }
    })  
  }
}
