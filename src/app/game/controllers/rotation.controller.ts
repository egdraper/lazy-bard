import { GSM } from '../game-state-manager.service'
import { MapRotationIndex, RenderingLayers } from '../models/map'
import { Asset } from '../models/asset.model'
import { generateBackgroundImage, generateLayerImage } from './utils/create-background-image'
import { terrainCleanup } from './utils/terrain-cleanup'


export class RotationController {
  public currentRotationIndex: MapRotationIndex = MapRotationIndex.northUp

  constructor() {
    GSM.GridController.newGridCreated.subscribe(this.addRotatedGridIterators.bind(this))
  }

  private addRotatedGridIterators() {
    GSM.GridController.gridIterator[MapRotationIndex.westUp] = []
    GSM.GridController.gridIterator[MapRotationIndex.southUp] = []
    GSM.GridController.gridIterator[MapRotationIndex.eastUp] = []
    
    for (let x = 0; x < GSM.GridController.map.size.x; x++) {
      for (let y = GSM.GridController.map.size.y - 1; y >= 0;  y--) {
        GSM.GridController.gridIterator[MapRotationIndex.westUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }      

    for (let y = GSM.GridController.map.size.y - 1; y >= 0;  y--) {
      for (let x = GSM.GridController.map.size.x - 1; x >= 0; x--) {
        GSM.GridController.gridIterator[MapRotationIndex.southUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }

    for (let x = GSM.GridController.map.size.x - 1; x >= 0; x--) {
      for (let y = 0; y < GSM.GridController.map.size.y; y++) {
        GSM.GridController.gridIterator[MapRotationIndex.eastUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }
  } 

  public rotateClockwise(): void {
    const assets = GSM.AssetController.assets
    const map = GSM.GridController.map

    if (this.currentRotationIndex === MapRotationIndex.northUp) {
      let newX = map.size.x - 1
      let newY = 0

      for (let y = 0; y < map.size.y; y++) {
        newY = 0;
        for (let x = 0; x < map.size.x; x++) {
          const cell = GSM.GridController.getCellById(`x${x}:y${y}`)       
            cell.location.x = newX
            cell.location.y = newY
            cell.position.x = newX * GSM.Settings.blockSize
            cell.position.y = newY * GSM.Settings.blockSize

            const assets = GSM.AssetController.getAssetsByAnchorCell(cell)
            assets.forEach((asset: Asset) => {
              if(asset.movement && asset.movement.movementOffset) {
                asset.movement.movementOffset.x = cell.position.x
                asset.movement.movementOffset.y = cell.position.y
                asset.movement.resetTrackingToCell(cell)
              }
            })
          newY++
        }
        newX--
      }
    }


    if (this.currentRotationIndex === MapRotationIndex.westUp) {
      let newX = map.size.x - 1
      let newY = map.size.y - 1

      for (let y = 0; y < map.size.y; y++) {
        newY = map.size.y - 1;
        for (let x = 0; x < map.size.x; x++) {

          const cell = GSM.GridController.getCellById(`x${x}:y${y}`)

          cell.location.x = newY
          cell.location.y = newX
          cell.position.x = newY * GSM.Settings.blockSize
          cell.position.y = newX * GSM.Settings.blockSize
         
          const assets = GSM.AssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movement && asset.movement.movementOffset) {
              asset.movement.movementOffset.x = cell.position.x
              asset.movement.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell)
            }
          })

          newY--
        }
        newX--
      }
    }

    if (this.currentRotationIndex === MapRotationIndex.southUp) {
      let newX = 0
      let newY = map.size.y - 1

      for (let y = 0; y < map.size.y; y++) {
        newY = map.size.y - 1;
        for (let x = 0; x < map.size.x; x++) {

          const cell = GSM.GridController.getCellById(`x${x}:y${y}`)

          cell.location.x = newX
          cell.location.y = newY
          cell.position.x = newX * GSM.Settings.blockSize
          cell.position.y = newY * GSM.Settings.blockSize

          const assets = GSM.AssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movement && asset.movement.movementOffset) {
              asset.movement.movementOffset.x = cell.position.x
              asset.movement.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell)
            }
          })
          newY--
        }
        newX++
      }
    }

    if (this.currentRotationIndex === MapRotationIndex.eastUp) {
      let newX = 0
      let newY = 0

      for (let y = 0; y < map.size.y; y++) {
        newY = 0
        for (let x = 0; x < map.size.x; x++) {
          const cell = GSM.GridController.getCellById(`x${x}:y${y}`)

          cell.location.x = newY
          cell.location.y = newX
          cell.position.x = newY * GSM.Settings.blockSize
          cell.position.y = newX * GSM.Settings.blockSize

          const assets = GSM.AssetController.getAssetsByCell(cell)
          assets.forEach((asset: Asset) => {
            if(asset.movement && asset.movement.movementOffset) {
              asset.movement.movementOffset.x = cell.position.x
              asset.movement.movementOffset.y = cell.position.y
              asset.movement.resetTrackingToCell(cell)
            }
          })

          newY++
        }
        newX++
      }
    }

    if (this.currentRotationIndex === 3) {
      this.currentRotationIndex = 0
    } else {
      this.currentRotationIndex++
    }

    GSM.AssetController.assetArray.forEach((asset: Asset) => {
      asset.anchorCell = GSM.GridController.getCellByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y + asset.attributes.size.y - 1)
    })

    terrainCleanup()
    GSM.AssetController.refreshAssetIterator()

    const module = GSM.CanvasModuleController.canvasModules.find(module => module.canvasName === "base")
    generateBackgroundImage(module.renderers)
    generateLayerImage("foreground", RenderingLayers.TerrainLayer)
    generateLayerImage("foreground", RenderingLayers.ObjectLayer)
  }

  public rotateCounterClockwise(): void {}
}
