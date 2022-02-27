import { GSM } from "../../game-state-manager.service"
import { NeighborLocation, TerrainCell } from "../../models/map"

export class BaseTerrainGenerator {
  public autoPopulateForegroundTerrain(terrainId: string, randomLeft?: number, randomRight?: number): void {
    let path
    
        // Places random obstacles in the map to make the path somewhat wind around
    // for (let i = 0; i < 5; i++) {
    //    try {
    //         this.clearObstacles(map)
    //         this.randomlyPlaceInvisibleObstacles(map)
    //         path = ShortestPath.find(map.grid[`x0:y${randomLeft}`], map.grid[`x${map.width - 2}:y${randomRight}`], [])
    
    //       } catch { console.log("error") }
        // }
    //     this.clearObstacles(map)
    
        // Adds random objects like trees or cliffs
        this.addRandomTerrain(terrainId)
    
        // Creates a drawn path if desired
        // path.forEach(cell => {
        //   if (cell.neighbors[0]) { cell.neighbors[0].backgroundGrowableTileId = defaultMapSettings.pathTypeId }
        //   if (cell.neighbors[1]) { cell.neighbors[1].backgroundGrowableTileId = defaultMapSettings.pathTypeId }
        //   if (cell.neighbors[4]) { cell.neighbors[4].backgroundGrowableTileId = defaultMapSettings.pathTypeId }
        //   cell.backgroundGrowableTileId = defaultMapSettings.pathTypeId
        // })
    
        // creates a randomized boarder to encapsulate the map
        this.createRandomizedBoarder(terrainId)
    
        // clears all obstacles from path
        // this.clearOpening(path)
        this.terrainCleanup()
      
    }
    

  private createRandomizedBoarder(terrainId: string): void {
    GSM.GridController.iterateAllCells((cell: TerrainCell) => {
      // Outer most layer
      if (cell.x < 2 || cell.x > GSM.GridController.gameMap.size.width - 3) {
        cell.obstacle = true
        cell.drawableTileId = terrainId
      }
      if (cell.y < 3 || cell.y > GSM.GridController.gameMap.size.height - 3) {
        cell.obstacle = true
        cell.drawableTileId = terrainId
      }

      // left side 2nd layer
      if (cell.x === 2) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Top, terrainId)
      }

      // left side 3rd layer
      if (cell.x === 3 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Left).obstacle 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Top)
        && GSM.GridController.getNeighbor(cell, NeighborLocation.TopLeft).obstacle
      ) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Top, terrainId)
      }

      // top side 2nd layer
      if (cell.y === 3) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
      }

      // Top side 3rd Layer
      if (cell.y === 4 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Top).obstacle 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Right)
        && GSM.GridController.getNeighbor(cell, NeighborLocation.TopRight)
      ) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
      }
    })


    GSM.GridController.iterateAllCells((cell: TerrainCell) => {
      // right side 2nd layers
      if (cell.x === GSM.GridController.gameMap.size.width - 3) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Bottom, terrainId)
      }

      // bottom side 2nd layer
      if (cell.y === GSM.GridController.gameMap.size.height - 3) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
      }
    })
    

    GSM.GridController.iterateAllCells((cell: TerrainCell) => {
      // right side 3rd layer
      if (cell.x === GSM.GridController.gameMap.size.width - 4 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Right).obstacle 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom) 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.BottomRight).obstacle
      ) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Bottom, terrainId)
      }
      // bottom side 3rd layer
      if (cell.y === GSM.GridController.gameMap.size.height - 4 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom).obstacle 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.Right) 
        && GSM.GridController.getNeighbor(cell, NeighborLocation.BottomRight).obstacle) {
        this.setEdgeLayerRandomization(cell, NeighborLocation.Right, terrainId)
      }
    })
  }

  private setEdgeLayerRandomization(cell: TerrainCell, neighborIndex: NeighborLocation, terrainId: string): void {
    const random = !Math.floor(Math.random() * 2)
    if (random) {
      const neighbor = GSM.GridController.getNeighbor(cell, neighborIndex) as TerrainCell
      if (neighbor) {
        neighbor.obstacle = true
        neighbor.drawableTileId = terrainId
      }

      cell.obstacle = true
      cell.drawableTileId = terrainId
    }
  }

//   private randomlyPlaceInvisibleObstacles(map: GameMap): void {
//     map.gridDisplay.forEach(row => {
//       row.forEach(cell => {
//         cell.obstacle = !Math.floor(Math.random() * 4)
//       })
//     })
//   }


  private addRandomTerrain(terrainId: string, weight: number = 3): void {
    for (let i = 0; i < GSM.GridController.gameMap.size.width; i++) {
      const randomY = Math.floor(Math.random() * GSM.GridController.gameMap.size.height)
      const randomX = Math.floor(Math.random() * GSM.GridController.gameMap.size.height)

      const startCell = GSM.GridController.getCell(randomX, randomY) as TerrainCell
      startCell.obstacle = true
      startCell.drawableTileId = terrainId

      const neighbors = GSM.GridController.getAllNeighbors(startCell) as TerrainCell[]
      for (let i = 0; i < 8; i++) {
        if (neighbors[i]) {
          neighbors[i].obstacle = true
          neighbors[i].drawableTileId = terrainId

          this.populateCell(startCell, i, weight, terrainId)
        }
      }
    }
  }

  private terrainCleanup(): void {
    GSM.GridController.iterateAllCells((cell: TerrainCell) => {
      if(cell.drawableTileId) {  
        const rightCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Right) as TerrainCell
        const leftCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Left) as TerrainCell
        const topCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Top) as TerrainCell
        const bottomCell = GSM.GridController.getNeighbor(cell, NeighborLocation.Bottom) as TerrainCell

        if(rightCell && !rightCell.drawableTileId && leftCell && !leftCell.drawableTileId) {
          cell.drawableTileId = undefined
          cell.obstacle = false
        }

        if(topCell && !topCell.drawableTileId && bottomCell && !bottomCell.drawableTileId) {
          cell.drawableTileId = undefined
          cell.obstacle = false
        }
      }
    })
  }

  private populateCell(cell: TerrainCell, neighborIndex: number, weight: number, terrainId: string): void {
    const isPlaced = !Math.floor(Math.random() * weight)
    if (!cell) { return }
    if (GSM.GridController.getNeighbor(cell, neighborIndex) && neighborIndex < 8 && isPlaced) {
      const neighbor = GSM.GridController.getNeighbor(cell, neighborIndex)
      const neighbors = GSM.GridController.getAllNeighbors(neighbor) as TerrainCell[]

      for (let i = 0; i < 8; i++) {
        if (neighbors[i]) {
          const startCell = neighbors[i] as TerrainCell
          const topCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.Top) as TerrainCell
          const rightCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.Right) as TerrainCell
          const topRightCell = GSM.GridController.getNeighbor(startCell, NeighborLocation.TopRight) as TerrainCell
          
          startCell.obstacle = true
          startCell.drawableTileId = terrainId

          if (topCell) {
            topCell.obstacle = true
            topCell.drawableTileId = terrainId
          }
          if (rightCell) {
            rightCell.obstacle = true
            rightCell.drawableTileId = terrainId
          }
          if (topRightCell) {
            topRightCell.obstacle = true
            topRightCell.drawableTileId = terrainId
          }
        }

        this.populateCell(neighbors[i], neighborIndex++, weight, terrainId)
      }

    } else {
      return
    }
  }
  
//   private clearObstacles(map: GameMap): void {
//     map.gridDisplay.forEach(row => {
//       row.forEach(cell => {
//         cell.obstacle = false
//       })
//     })
//   }
}