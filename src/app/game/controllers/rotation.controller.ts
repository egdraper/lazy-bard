import { GSM } from '../game-state-manager.service'
import { MapRotationIndex } from '../models/map'
import { Asset } from '../models/asset.model'
import { terrainCleanup } from './utils/terrain-cleanup'
import { generateBackgroundImage } from './utils/create-background-image'

export class RotationController {
  public currentRotationIndex: MapRotationIndex = MapRotationIndex.northUp

  constructor() {
    GSM.GridController.newGridCreated.subscribe(this.addRotatedGridIterators.bind(this))
  }

  private addRotatedGridIterators() {
    GSM.GridController.gridIterator[MapRotationIndex.westUp] = []
    GSM.GridController.gridIterator[MapRotationIndex.southUp] = []
    GSM.GridController.gridIterator[MapRotationIndex.eastUp] = []
    
    for (let x = 0; x < GSM.GameData.map.size.x; x++) {
      for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
        GSM.GridController.gridIterator[MapRotationIndex.westUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }      

    for (let y = GSM.GameData.map.size.y - 1; y >= 0;  y--) {
      for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
        GSM.GridController.gridIterator[MapRotationIndex.southUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }

    for (let x = GSM.GameData.map.size.x - 1; x >= 0; x--) {
      for (let y = 0; y < GSM.GameData.map.size.y; y++) {
        GSM.GridController.gridIterator[MapRotationIndex.eastUp].push(GSM.GridController.getCellById(`x${x}:y${y}`))
      }
    }
  } 

  public rotateClockwise(): void {
    const map = GSM.GameData.map

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

    GSM.AssetController.refreshAssetIterator()
    GSM.CanvasModuleController.canvasModules.forEach(module => {
      if(module.canvas === "base") {
        GSM.ImageController.baseLayerImage = generateBackgroundImage(module.renderers)
      }
    })
  }

  public rotateCounterClockwise(): void {}
}
