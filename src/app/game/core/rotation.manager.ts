import { GSM } from '../game-state-manager.service'
import { MapRotationIndex } from '../models/map'
import { PlaceableAsset } from '../models/asset.model'
import { TerrainCleanup } from './utils/terrain-cleanup'
import { FullImageGenerator } from './utils/create-background-image'

export class RotationManager {
  public currentRotationIndex: MapRotationIndex = MapRotationIndex.northUp

  constructor() {
    GSM.GridManager.newGridCreated.subscribe(this.addRotatedGridIterators.bind(this))
  }

  private addRotatedGridIterators() {
    GSM.GridManager.gridIterator[MapRotationIndex.westUp] = []
    GSM.GridManager.gridIterator[MapRotationIndex.southUp] = []
    GSM.GridManager.gridIterator[MapRotationIndex.eastUp] = []
    
    for (let x = 0; x < GSM.GridManager.map.size.x; x++) {
      for (let y = GSM.GridManager.map.size.y - 1; y >= 0;  y--) {
        GSM.GridManager.gridIterator[MapRotationIndex.westUp].push(GSM.GridManager.getCellById(`x${x}:y${y}`))
      }
    }      

    for (let y = GSM.GridManager.map.size.y - 1; y >= 0;  y--) {
      for (let x = GSM.GridManager.map.size.x - 1; x >= 0; x--) {
        GSM.GridManager.gridIterator[MapRotationIndex.southUp].push(GSM.GridManager.getCellById(`x${x}:y${y}`))
      }
    }

    for (let x = GSM.GridManager.map.size.x - 1; x >= 0; x--) {
      for (let y = 0; y < GSM.GridManager.map.size.y; y++) {
        GSM.GridManager.gridIterator[MapRotationIndex.eastUp].push(GSM.GridManager.getCellById(`x${x}:y${y}`))
      }
    }
  } 

  public rotateClockwise(): void {
    const assets = GSM.AssetManager.assets
    const map = GSM.GridManager.map

    if (this.currentRotationIndex === MapRotationIndex.northUp) {
      let newX = map.size.x - 1
      let newY = 0

      for (let y = 0; y < map.size.y; y++) {
        newY = 0;
        for (let x = 0; x < map.size.x; x++) {
          const cell = GSM.GridManager.getCellById(`x${x}:y${y}`)       
            cell.location.x = newX
            cell.location.y = newY
            cell.position.x = newX * GSM.Settings.blockSize
            cell.position.y = newY * GSM.Settings.blockSize

            const assets = GSM.AssetManager.getAssetsByAnchorCell(cell)
            assets.forEach((asset: PlaceableAsset) => {
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

          const cell = GSM.GridManager.getCellById(`x${x}:y${y}`)

          cell.location.x = newY
          cell.location.y = newX
          cell.position.x = newY * GSM.Settings.blockSize
          cell.position.y = newX * GSM.Settings.blockSize
         
          const assets = GSM.AssetManager.getAssetsByCell(cell)
          assets.forEach((asset: PlaceableAsset) => {
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

          const cell = GSM.GridManager.getCellById(`x${x}:y${y}`)

          cell.location.x = newX
          cell.location.y = newY
          cell.position.x = newX * GSM.Settings.blockSize
          cell.position.y = newY * GSM.Settings.blockSize

          const assets = GSM.AssetManager.getAssetsByCell(cell)
          assets.forEach((asset: PlaceableAsset) => {
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
          const cell = GSM.GridManager.getCellById(`x${x}:y${y}`)

          cell.location.x = newY
          cell.location.y = newX
          cell.position.x = newY * GSM.Settings.blockSize
          cell.position.y = newX * GSM.Settings.blockSize

          const assets = GSM.AssetManager.getAssetsByCell(cell)
          assets.forEach((asset: PlaceableAsset) => {
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

    GSM.AssetManager.assetArray.forEach((asset: PlaceableAsset) => {
      asset.anchorCell = GSM.GridManager.getCellByLocation(asset.anchorCell.location.x, asset.anchorCell.location.y + asset.attributes.size.y - 1)
    })

    TerrainCleanup.run()
    GSM.AssetManager.refreshAssetIterator()

    const module = GSM.CanvasModuleManager.canvasModules.find(module => module.canvasName === "base")
    FullImageGenerator.generateBackgroundImage(module.renderers)
    FullImageGenerator.generateForegroundStaticAssetImage()
  }

  public rotateCounterClockwise(): void {}
}
