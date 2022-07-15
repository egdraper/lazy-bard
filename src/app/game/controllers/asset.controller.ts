import { Subject } from 'rxjs';
import { assetAttributes } from '../db/asset-items';
import { GSM } from '../game-state-manager.service';
import { Asset, AssetBlock, BackgroundAsset, BlockEdge, GridAsset } from '../models/asset.model';
import { Cell, NeighborLocation, RenderingLayers } from '../models/map';
import { AssetTile } from '../models/sprite-tile.model';

export class AssetController {
  public assets: { [assetId: string]: GridAsset } = {}
  public assetArray: GridAsset[] = [];
  public selectedAssets: { [assetId: string]: GridAsset } = {}
  public assetBlocks: { [coordinate: string]: AssetBlock } = {}   // coordinate format:  "x1:y1:z2:character"
  public backgroundAssets: BackgroundAsset[] = []

  public assetClickedAtZIndex = new Subject<GridAsset>();

  constructor() {
    GSM.FrameController.frameFire.subscribe(this.animateAsset.bind(this));
  }

  public addAsset(asset: GridAsset, anchoringCell: Cell, zIndex: number): void {
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
    const block = this.assetBlocks[`x${cell.location.x}:y${cell.location.y}:z${zIndex}:${layer}`];
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
    const assets = []
    Object.keys(this.selectedAssets).forEach(key => {
      assets.push(this.selectedAssets[key])
    })
    return assets
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
    if(this.selectedAssets[asset.id]) {
      delete this.selectedAssets[asset.id]
    } else {
      this.selectedAssets[asset.id] = asset
    }
  }

  public getAssetBlockById(blockId: string): AssetBlock {
    return this.assetBlocks[blockId]
  }

  public getAssetBlock(cell: Cell, zIndex: number, layer: RenderingLayers): AssetBlock {
    return this.assetBlocks[`x${cell.location.x}:y${cell.location.y}:z${zIndex}:${layer}`]
  }

  public getAssetBlockInAsset(cell: Cell, zIndex: number, layer: RenderingLayers): AssetBlock[] {
    const asset = this.getAsset(cell, zIndex, layer)
    return asset.ownedBlockIds.map(id => this.getAssetBlockById(id))
  }

  public getAllAssetBlocksAtCell(cell: Cell): AssetBlock[] {
    const assetBlocks = []
    GSM.RendererController.iterateRenderingLayers(layer => {
      for(let i = 0; i < GSM.Settings.maxHeight; i++) {
        const assetBlock = this.assetBlocks[`x${cell.location.x}:y${cell.location.y}:z${i}:${layer}`]
        if(assetBlock) { assetBlocks.push(assetBlock) }
      }
    })
    return assetBlocks
  }

  public getAllAssetBlocksByEdge(asset: GridAsset, edge: BlockEdge ): AssetBlock[] {
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
    const assetList = []
    for(let i = 0; i < GSM.Settings.maxHeight; i++) {
      GSM.RendererController.iterateRenderingLayers(layer => {
        const asset = this.getAsset(cell, i, layer)
        if (asset) { assetList.push(asset) }
      })
    }
    return assetList
  }

  public iterateAsset(callBack: (asset: GridAsset) => void) {
    this.assetArray.forEach(asset => { callBack(asset) })
  }

  public deselectAllAssets(): void {
    this.selectedAssets = {}
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

    asset.anchorCell = newCell
    this.updateBlockProperty(asset, asset.anchorCell, newZIndex)
    this.refreshAssetIterator()
  }

  public removeAsset(asset: GridAsset, layer: RenderingLayers): void {
    this.assetArray = this.assetArray.filter(savedAsset => asset.id !== savedAsset.id)
    asset.ownedBlockIds.forEach(id => { delete this.assetBlocks[id] })
    this.assets[asset.id]
    this.refreshAssetIterator()
  }

  public refreshAssetIterator(): void {
    const newAssetList: GridAsset[] = []

    GSM.GridController.iterateCells((cell) => {
      const gridAssets = this.getAssetsByAnchorCell(cell)
      gridAssets.forEach(asset => {
        newAssetList.push(asset);
      })      
    })
    this.assetArray = newAssetList
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
  private updateBlockProperty(asset: GridAsset, anchoringCell: Cell, zIndex: number) {
    asset.ownedBlockIds = [];
    asset.anchorCell = anchoringCell

    asset.attributes.obstructed.forEach((zIndexSet, zIndexOffset) => {
      const rows = zIndexSet.split(':');
      let distanceFromAnchor = asset.attributes.size.y - 1;

      rows.forEach((obstructions: string, yIndex) => {
        obstructions.split('').forEach((blockObstruction, xIndex) => {
          const cellY = anchoringCell.location.y - distanceFromAnchor;
          const cellX = anchoringCell.location.x + xIndex;
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
            id: `x${cellX}:y${cellY}:z${zIndex + zIndexOffset}:${asset.layer}`,
            zIndex: zIndex + zIndexOffset,
            cell: cell,
            obstructed: blockObstruction === "1",
            edge: blockEdge,
            ownerAssetId: asset.id
          }

          this.assetBlocks[`x${cellX}:y${cellY}:z${zIndex + zIndexOffset}:${asset.layer}`] = assetBlock 
          this.assets[asset.id] = asset

          
          asset.ownedBlockIds.push(assetBlock.id);
        });
      });
    });
  }
}
