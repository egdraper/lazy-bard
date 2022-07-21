import { Subject } from 'rxjs';
import { assetAttributes } from '../db/asset-items';
import { GSM } from '../game-state-manager.service';
import { Asset, AssetBlock, BackgroundAsset, BlockEdge, GridAsset } from '../models/asset.model';
import { Cell, MapRotationIndex, NeighborLocation, RenderingLayers, Size } from '../models/map';

export class AssetController {
  public assets: { [assetId: string]: GridAsset } = {}
  public assetArray: GridAsset[] = []

  public selectedAssets: GridAsset[] = []
  public assetBlocks: { [coordinate: string]: AssetBlock } = {}   // coordinate format:  "x1:y1:z2:character"
  public backgroundAssets: BackgroundAsset[] = []

  public assetClickedAtZIndex = new Subject<GridAsset>();

  constructor() {
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this));
    // this.assetArray[MapRotationIndex.northUp] = []
    // this.assetArray[MapRotationIndex.westUp] = []
    // this.assetArray[MapRotationIndex.southUp] = []
    // this.assetArray[MapRotationIndex.eastUp] = []
  }

  public addAsset(asset: GridAsset, anchoringCell: Cell, zIndex: number): void {
    if(!anchoringCell) { return }

    asset.baseZIndex = zIndex
    asset.anchorCell = anchoringCell
    asset.id = `map:${GSM.GameData.map.id}-cell:${anchoringCell.id}:z${zIndex}:${asset.layer}`;

    this.setAssetAttributes(asset);
    this.updateBlockProperty(asset, anchoringCell, zIndex);
    this.refreshAssetIterator();
  }

  public addBackgroundAsset(asset: GridAsset, zIndex: number): void {
    const block = new AssetBlock()
    block.id = `x${asset.anchorCell.location.x}:y${asset.anchorCell.location.y}:z${zIndex}:background`
    block.cell = asset.anchorCell
    block.obstructed = false,
    block.zIndex = zIndex
    asset.baseZIndex = zIndex    
    asset.ownedBlockIds = [block.id]
    this.backgroundAssets.push(asset);
  }

  public getAssetById(assetId: string): GridAsset  {
    return this.assets[assetId]
  }

  public getAsset(cell: Cell, zIndex: number, layer: RenderingLayers): GridAsset {
    if(!cell) { return null}
    const block = this.assetBlocks[`${cell.id}:z${zIndex}:${layer}`];
    return this.assets[block?.ownerAssetId]
  }

  public getAssetsByCellAtZ(cell: Cell, zIndex: number): {layer: RenderingLayers, asset: GridAsset}[] {
    const assets = []
    GSM.RendererController.iterateRenderingLayers(layer => {
      const asset = this.getAsset(cell, zIndex, layer)
      if(asset) {
        assets.push({layer, asset})
      }
    })
    return assets
  }

  public getAssetByAnchorCell(cell: Cell): GridAsset {
    const assets = this.getAssetsByCell(cell)
    return assets.find(asset => asset.anchorCell === cell)
  }

  public getAssetsByAnchorCell(cell: Cell): GridAsset[] {
    const assets = this.getAssetsByCell(cell)
    return assets.filter(asset => asset.anchorCell.id === cell.id)
  }

  public getSelectedAssets(): GridAsset[] {
    return this.selectedAssets
  }

  public isCellBlockObstructed(cell: Cell, zIndex): boolean {
    let obstructed = false
    GSM.RendererController.iterateRenderingLayers(layer => {
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

  public getAssetBlockInAsset(cell: Cell, zIndex: number, layer: RenderingLayers): AssetBlock[] {
    const asset = this.getAsset(cell, zIndex, layer)
    return asset.ownedBlockIds.map(id => this.getAssetBlockById(id))
  }

  public getAllAssetBlocksAtCell(cell: Cell): AssetBlock[] {
    const assetBlocks = []
    GSM.RendererController.iterateRenderingLayers(layer => {
      for(let i = 0; i < GSM.Settings.maxHeight; i++) {
        const assetBlock = this.assetBlocks[`${cell.id}:z${i}:${layer}`]
        if(assetBlock) { assetBlocks.push(assetBlock) }
      }
    })
    return assetBlocks
  }

  public getAllAssetBlocksByEdge(asset: GridAsset, edge: BlockEdge ): AssetBlock[] {
    if(!asset.ownedBlockIds) { return [] }
    let assetBlocks = []
    const blocks = asset.ownedBlockIds.map(id => this.getAssetBlockById(id))
    
    assetBlocks = blocks.filter(block => {
      return (edge.down === block.edge.down || edge.down === undefined)
        && (edge.up === block.edge.up || edge.up === undefined)
        && (edge.north === block.edge.north || edge.north === undefined)
        && (edge.east === block.edge.east || edge.east === undefined)
        && (edge.south === block.edge.south || edge.south === undefined)
        && (edge.west === block.edge.west || edge.west === undefined)
      })
    return assetBlocks
  }

  public getAssetsByCell(cell: Cell): GridAsset[] {
    const assetList: GridAsset[] = []
    for(let i = 0; i < GSM.Settings.maxHeight; i++) {
      GSM.RendererController.iterateRenderingLayers(layer => {
        const asset = this.getAsset(cell, i, layer)
        if (asset && !assetList.find(a => a.id === asset.id)) { assetList.push(asset) }
      })
    }
    return assetList
  }

  public iterateAsset(callBack: (asset: GridAsset) => void) {
    this.assetArray.forEach(asset => { callBack(asset) })
  }

  public deselectAllAssets(): void {
    this.selectedAssets = []
  }

  public changeZAxis(direction: 'up' | 'down', asset: GridAsset): void {
    const upAssets = GSM.CellNeighborsController.getImmediateNeighboringAssets(asset, NeighborLocation.Up);
    const downAssets = GSM.CellNeighborsController.getImmediateNeighboringAssets(asset, NeighborLocation.Down);

    if (direction === 'up' && upAssets.length === 0) {
      this.updateBlockProperty(asset, asset.anchorCell, ++asset.baseZIndex);
      return;
    }
    if (direction === 'down' && downAssets.length === 0) {
      this.updateBlockProperty(asset, asset.anchorCell, --asset.baseZIndex);
      return;
    }
  }

  public switchAssetToNewCell(asset: GridAsset, newCell: Cell, newZIndex: number) {
    asset.ownedBlockIds.forEach(blockId => {
      delete this.assetBlocks[blockId]
    })

    delete this.assets[asset.id]

    asset.anchorCell = newCell
    asset.id = `map:${GSM.GameData.map.id}-cell:${newCell.id}:z${newZIndex}:${asset.layer}`;
    this.assets[asset.id] = asset
    this.updateBlockProperty(asset, asset.anchorCell, newZIndex)
    this.refreshAssetIterator()
  }

  public removeAsset(asset: GridAsset, layer: RenderingLayers): void {
    asset.ownedBlockIds.forEach(id => { delete this.assetBlocks[id] })
    delete this.selectedAssets[asset.id]
    delete this.assets[asset.id]
    this.refreshAssetIterator()
  }

  public refreshAssetIterator(): void {
    const tempArray = []
    let finalTemp = []

    Object.keys(this.assets).forEach(key => {
      tempArray.push(this.assets[key])
    })

    finalTemp = tempArray.sort((a: GridAsset, b: GridAsset) => {
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

      if(a.anchorCell.location.x === b.anchorCell.location.x && a.anchorCell.location.y === b.anchorCell.location.y) {
        if(a.baseZIndex < b.baseZIndex) {
          return -1
        } else {
          return 1
        }
      }

      return 0
    })

    this.assetArray = finalTemp
  }

  public getAllAssetsBlocksCoveringCell(coveredCell: Cell): AssetBlock[] {
    const coveringBlocks: AssetBlock[] = []
    GSM.GridController.iterateYCells(coveredCell.location.x, (cell: Cell) => {
      if(cell.location.y < coveredCell.location.y) { return }
  
      const distanceFromHoveringCell = cell.location.y - coveredCell.location.y
      GSM.AssetController.getAllAssetBlocksAtCell(cell).forEach(assetBlock => {
        if(assetBlock.zIndex + 1 === distanceFromHoveringCell) {
          coveringBlocks.push(assetBlock)
        }
      })
    })
    return coveringBlocks
  }
  
  public getAllAssetsCoveringCell(hoveringCell: Cell): GridAsset[] {
    const assetBlocks = this.getAllAssetsBlocksCoveringCell(hoveringCell)
    return assetBlocks.map(block => GSM.AssetController.getAssetById(block.ownerAssetId))
  }
  
 public getTopAssetCoveringCell(hoveringCell: Cell): GridAsset{
    const topBlock = this.getAllAssetsBlocksCoveringCell(hoveringCell).pop()
    if(topBlock) {
      return GSM.AssetController.getAssetById(topBlock.ownerAssetId)
    } else {
      return undefined
    }
  }
  
  public getTopAssetBlockCoveringCell(hoveringCell: Cell): AssetBlock {
    return this.getAllAssetsBlocksCoveringCell(hoveringCell).pop()
  }

  // Helper

  private animateAsset(frame: number): void {
    GSM.AssetController.iterateAsset((asset: Asset) => {
      if (asset.animating) {
        if (frame % asset.animation.changeEveryNthFrame === 0) {
          asset.movement.updateAnimation();
        }
      }
    });
  }

  // May need to be its own util
  private setAssetAttributes(asset: GridAsset): void {
    asset.attributes = assetAttributes.find((attribute) => asset.attributesId === attribute.id)
  }

  // obstructed: ["000:010:000", "111:111:111", "111:111:111"]
  private updateBlockProperty(asset: GridAsset, selectedCell: Cell, zIndex: number) {
    let xOffset = Math.floor(asset.attributes.size.x / 2) 
    xOffset = xOffset - Math.floor(xOffset / 2)
    let yOffset = Math.floor(asset.attributes.size.y / 2)
    yOffset = Math.floor(yOffset / 2)
    
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
}
