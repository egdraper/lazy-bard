import { GSM } from "../../game-state-manager.service"
import { AssetBlock, GridAsset } from "../../models/asset.model"
import { Cell } from "../../models/map"

export function getAllAssetsBlocksBeingHovered(hoveringCell: Cell): AssetBlock[] {
  const coveringBlocks: AssetBlock[] = []
  GSM.GridController.iterateYCells(hoveringCell.location.x, (cell: Cell) => {
    if(cell.location.y < hoveringCell.location.y) { return }

    const distanceFromHoveringCell = cell.location.y - hoveringCell.location.y
    GSM.AssetController.getAllAssetBlocksAtCell(cell).forEach(assetBlock => {
      if(assetBlock.zIndex + 1 === distanceFromHoveringCell) {
        coveringBlocks.push(assetBlock)
      }
    })
  })
  return coveringBlocks
}

export function getAllAssetsBeingHovered(hoveringCell: Cell): GridAsset[] {
  const assetBlocks = getAllAssetsBlocksBeingHovered(hoveringCell)
  return assetBlocks.map(block => GSM.AssetController.getAssetById(block.ownerAssetId))
}

export function getTopAssetBeingHovered(hoveringCell: Cell): GridAsset{
  const topBlock = getAllAssetsBlocksBeingHovered(hoveringCell).pop()
  if(topBlock) {
    return GSM.AssetController.getAssetById(topBlock.ownerAssetId)
  } else {
    return undefined
  }
}

export function getTopAssetBlockBeingHovered(hoveringCell: Cell): AssetBlock {
  return getAllAssetsBlocksBeingHovered(hoveringCell).pop()
}