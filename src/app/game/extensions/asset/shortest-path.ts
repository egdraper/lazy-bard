import { Asset } from "../../models/asset.model"
import { GSM } from "../../game-state-manager.service"
import { Cell, RenderingLayers } from "../../models/map"

export interface Visited {
  cell?: Cell
  steps?: {
    distance?: number,
    odd?: boolean,
    moves?: number
  }
  checked?: boolean
}

export abstract class TravelPath {
  public abstract find(start: Cell, end: Cell, asset?: Asset ): Cell[] 
} 

export class ShortestPath extends TravelPath {
  private maxSearches = 2000000
  private searchIndex = 0
  private asset: Asset

  public find(start: Cell, end: Cell, asset: Asset): Cell[] {
    this.asset = asset
    const zAsset = GSM.AssetController.getAssetByCellAtZ(end, asset.zIndex)
    if(zAsset && !zAsset.blocks.obstructions[zAsset.zIndex]) {
  
    } else {
      end = this.verifyClosetLocation(start, end)
    } 
    return this.start(start, end)
  }

  private start(start: Cell, end: Cell): Cell[] {
    if(!end) { return [] }
   
    this.searchIndex = 0
    const visited: any = { }
    visited[`x${start.location.x}:y${start.location.y}`] = { cell: start, steps: { moves: 0, distance: 0, odd: true } }

    this.visitedNow(end, visited)
    const shortestPath = []
    shortestPath.push(end)
    return this.getShortestPath(visited[`x${end.location.x}:y${end.location.y}`], shortestPath)
  }

  private getShortestPath(cell: any, shortest: Cell[]) {
    if (cell.prevCel) {
     shortest.push(cell.prevCel.cell)
     cell.prevCel.cell.path = true
     this.getShortestPath(cell.prevCel, shortest)
    }

    return shortest
  }

  private visitedNow(endingPoint: Cell, visited: any) {
    if(!endingPoint) { return }
    if(this.maxSearches < this.searchIndex) { return }
    
    if ((visited[`x${endingPoint.location.x}:y${endingPoint.location.y}`] && visited[`x${endingPoint.location.x}:y${endingPoint.location.y}`].cell === endingPoint)) {
      return
    }
        
    Object.keys(visited).forEach(visitedCell => {
        if (!visited[visitedCell].checked) {
          const store: number[] = [ ]

          GSM.CellNeighborsController.getHorizontalNeighborsCell(visited[visitedCell].cell).forEach((cell: Cell, index: number) => {
            if (!cell) {
              return
            }

            let creatureOnSquare  
            if(cell.assets && cell.assets[this.asset.zIndex] && cell.assets[this.asset.zIndex][RenderingLayers.AssetLayer]) {
              creatureOnSquare = !!cell.assets[this.asset.zIndex][RenderingLayers.AssetLayer]
            }

            if ((!cell.obstructions[this.asset.zIndex] && !creatureOnSquare) && !store.some(i => index === i)) {
              if (!visited[`x${cell.location.x}:y${cell.location.y}`]) {
                visited[`x${cell.location.x}:y${cell.location.y}`] = {
                  cell,
                  steps: this.alternateDiagonal(visited[visitedCell], index),
                  prevCel: visited[visitedCell],
                }
              } else {
                if (visited[`x${cell.location.x}:y${cell.location.y}`].steps.moves > visited[visitedCell] + 1) {
                   visited[`x${cell.location.x}:y${cell.location.y}`].steps.moves = visited[visitedCell] + 1
                }
              }
            }

            if (index === 0 && cell.obstructions[this.asset.zIndex]) {
              // skip 7 4
              store.push(7)
              store.push(4)
            }
  
            if (index === 1 && cell.obstructions[this.asset.zIndex]) {
              // skip 4 5
              store.push(4)
              store.push(5)
            }
  
            if (index === 2 && cell.obstructions[this.asset.zIndex]) {
              // skip 5 6
              store.push(5)
              store.push(6)
            }
  
            if (index === 3 && cell.obstructions[this.asset.zIndex]) {
              // skip 6 7
              store.push(6)
              store.push(7)
            }
          })
      }
      this.searchIndex++
      visited[visitedCell].checked = true
    })
    this.visitedNow(endingPoint, visited)
  }

  public verifyClosetLocation(start: Cell, end: Cell): Cell {
    if(this.isBadLocation(end)) { 
      const possibleAlternatives = GSM.CellNeighborsController.getHorizontalNeighborsCell(end).filter(a => !this.isBadLocation(a))
      if(possibleAlternatives) {
        let newEndCell
        let shortest = 1000000
        possibleAlternatives.forEach(a => {
          const path = this.start(start, a)
          if(path.length < shortest) {
            shortest = path.length
            newEndCell = path[0]
          }
        }) 
        return newEndCell             
      } else {
        return undefined
      }
    }
    return end
  }

  public isBadLocation(end: Cell): boolean {
    return end.obstructions[this.asset.zIndex] || !!GSM.AssetController.getAssetByCellAtZ(end, this.asset.zIndex)
  }

  private alternateDiagonal(visited: Visited, index: number): any {
    let newSteps

    if(index > 3) {
      newSteps = {
        distance: visited.steps.distance + (visited.steps.odd ? 1 : 2),
        odd: !visited.steps.odd,
        moves: visited.steps.moves + 1
      }
      return newSteps
    }

    return {
      distance: visited.steps.distance + 1,
      odd: visited.steps.odd,
      moves: visited.steps.moves + 1
    }
  }
}