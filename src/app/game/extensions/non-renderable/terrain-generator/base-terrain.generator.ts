// import { GSM } from "../../../game-state-manager.service"
// import { ElevationLayers, NeighborLocation, MapAssetImageCell } from "../../../models/map"

// export class BaseTerrainGenerator {
//   public autoPopulateForegroundTerrain(terrainId: string, randomLeft?: number, randomRight?: number): void {
//     this.addRandomTerrain(terrainId)
//     this.createRandomizedBoarder(terrainId)
//     this.terrainCleanup()      
//   }
    

//   private createRandomizedBoarder(terrainId: string): void {
//     GSM.GridController.iterateCells((cell: MapAssetImageCell) => {
//       // Outer most layer
//       if (cell.x < 2 || cell.x > GSM.GridController.gameMap.size.width - 3) {
//         cell.obstacle = true
//         cell.drawableTileId = terrainId
//       }
//       if (cell.y < 3 || cell.y > GSM.GridController.gameMap.size.height - 3) {
//         cell.obstacle = true
//         cell.drawableTileId = terrainId
//       }

//       // left side 2nd layer
//       if (cell.x === 2) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Top, terrainId)
//       }

//       // left side 3rd layer
//       if (cell.x === 3 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Left, ElevationLayers.TerrainLayer).obstacle 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Top, ElevationLayers.TerrainLayer)
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.TopLeft, ElevationLayers.TerrainLayer).obstacle
//       ) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Top, terrainId)
//       }

//       // top side 2nd layer
//       if (cell.y === 3) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
//       }

//       // Top side 3rd Layer
//       if (cell.y === 4 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Top, ElevationLayers.TerrainLayer).obstacle 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Right, ElevationLayers.TerrainLayer)
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight, ElevationLayers.TerrainLayer)
//       ) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
//       }
//     })


//     GSM.GridController.iterateCells((cell: MapAssetImageCell) => {
//       // right side 2nd layers
//       if (cell.x === GSM.GridController.gameMap.size.width - 3) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Bottom, terrainId)
//       }

//       // bottom side 2nd layer
//       if (cell.y === GSM.GridController.gameMap.size.height - 3) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
//       }
//     })
    

//     GSM.GridController.iterateCells((cell: MapAssetImageCell) => {
//       // right side 3rd layer
//       if (cell.x === GSM.GridController.gameMap.size.width - 4 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Right, ElevationLayers.TerrainLayer).obstacle 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom, ElevationLayers.TerrainLayer) 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.BottomRight, ElevationLayers.TerrainLayer).obstacle
//       ) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Bottom, terrainId)
//       }
//       // bottom side 3rd layer
//       if (cell.y === GSM.GridController.gameMap.size.height - 4 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom, ElevationLayers.TerrainLayer).obstacle 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.Right, ElevationLayers.TerrainLayer) 
//         && GSM.GridController.getNeighbor(cell, NeighborLocation.BottomRight, ElevationLayers.TerrainLayer).obstacle) {
//         this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
//       }
//     })
//   }

//   private setEdgeLayerRandomization(cell: MapAssetImageCell, neighborIndex: NeighborLocation, terrainId: string): void {
//     const random = !Math.floor(Math.random() * 2)
//     if (random) {
//       const neighbor = GSM.GridController.getNeighbor(cell, neighborIndex, ElevationLayers.TerrainLayer) as MapAssetImageCell
//       if (neighbor) {
//         neighbor.obstacle = true
//         neighbor.drawableTileId = terrainId
//       }

//       cell.obstacle = true
//       cell.drawableTileId = terrainId
//     }
//   }

// //   private randomlyPlaceInvisibleObstacles(map: GameMap): void {
// //     map.gridDisplay.forEach(row => {
// //       row.forEach(cell => {
// //         cell.obstacle = !Math.floor(Math.random() * 4)
// //       })
// //     })
// //   }


//   private addRandomTerrain(terrainId: string, weight: number = 3): void {
//     for (let i = 0; i < GSM.GridController.gameMap.size.width; i++) {
//       const randomY = Math.floor(Math.random() * GSM.GridController.gameMap.size.height)
//       const randomX = Math.floor(Math.random() * GSM.GridController.gameMap.size.height)

//       const startCell = GSM.GridController.getCell(randomX, randomY, ElevationLayers.TerrainLayer) as MapAssetImageCell
//       startCell.obstacle = true
//       startCell.drawableTileId = terrainId

//       const neighbors = GSM.GridController.getAllNeighbors(startCell, ElevationLayers.TerrainLayer) as MapAssetImageCell[]
//       for (let i = 0; i < 8; i++) {
//         if (neighbors[i]) {
//           neighbors[i].obstacle = true
//           neighbors[i].drawableTileId = terrainId

//           this.populateCell(startCell, i, weight, terrainId)
//         }
//       }
//     }
//   }

//   private terrainCleanup(): void {
//     GSM.GridController.iterateCells(ElevationLayers.TerrainLayer, (cell: MapAssetImageCell) => {
//       if(cell.drawableTileId) {  
//         const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right, ElevationLayers.TerrainLayer) as MapAssetImageCell
//         const leftCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Left, ElevationLayers.TerrainLayer) as MapAssetImageCell
//         const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top, ElevationLayers.TerrainLayer) as MapAssetImageCell
//         const bottomCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom, ElevationLayers.TerrainLayer) as MapAssetImageCell

//         if(rightCell && !rightCell.drawableTileId && leftCell && !leftCell.drawableTileId) {
//           cell.drawableTileId = undefined
//           cell.obstacle = false
//         }

//         if(topCell && !topCell.drawableTileId && bottomCell && !bottomCell.drawableTileId) {
//           cell.drawableTileId = undefined
//           cell.obstacle = false
//         }
//       }
//     })
//   }

//   private populateCell(cell: MapAssetImageCell, neighborIndex: number, weight: number, terrainId: string): void {
//     const isPlaced = !Math.floor(Math.random() * weight)
//     if (!cell) { return }
//     if (GSM.GridController.getNeighbor(cell, neighborIndex, ElevationLayers.TerrainLayer) && neighborIndex < 8 && isPlaced) {
//       const neighbor = GSM.GridController.getNeighbor(cell, neighborIndex, ElevationLayers.TerrainLayer)
//       const neighbors = GSM.GridController.getAllNeighbors(neighbor, ElevationLayers.TerrainLayer) as MapAssetImageCell[]

//       for (let i = 0; i < 8; i++) {
//         if (neighbors[i]) {
//           const startCell = neighbors[i] as MapAssetImageCell
//           const topCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.Top, ElevationLayers.TerrainLayer) as MapAssetImageCell
//           const rightCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.Right, ElevationLayers.TerrainLayer) as MapAssetImageCell
//           const topRightCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.TopRight, ElevationLayers.TerrainLayer) as MapAssetImageCell
          
//           startCell.obstacle = true
//           startCell.drawableTileId = terrainId

//           if (topCell) {
//             topCell.obstacle = true
//             topCell.drawableTileId = terrainId
//           }
//           if (rightCell) {
//             rightCell.obstacle = true
//             rightCell.drawableTileId = terrainId
//           }
//           if (topRightCell) {
//             topRightCell.obstacle = true
//             topRightCell.drawableTileId = terrainId
//           }
//         }

//         this.populateCell(neighbors[i], neighborIndex++, weight, terrainId)
//       }

//     } else {
//       return
//     }
//   }
  
// //   private clearObstacles(map: GameMap): void {
// //     map.gridDisplay.forEach(row => {
// //       row.forEach(cell => {
// //         cell.obstacle = false
// //       })
// //     })
// //   }
// }