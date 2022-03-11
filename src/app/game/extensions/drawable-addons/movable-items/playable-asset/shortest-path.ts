import { GSM } from "../../../../game-state-manager.service";
import { Cell } from "../../../../models/map";
import { PlayableAsset } from "./playable-asset.model";

export interface Visited {
  cell?: Cell
  steps?: {
    distance?: number,
    odd?: boolean,
    moves?: number
  }
  checked?: boolean;
}

export class ShortestPath {
  public static creaturesOnGrid: any[] = []
  private static maxSearches = 2000000
  private static searchIndex = 0

  public static find(start: Cell, end: Cell, creaturesOnGrid: Array<PlayableAsset> ): Cell[] {
    this.creaturesOnGrid = creaturesOnGrid
    end = this.verifyClosetLocation(start, end)
    return this.start(start, end)
  }

  private static start(start: Cell, end: Cell): Cell[] {
    if(!end) { return [] }
    this.searchIndex = 0
    const visited: any = { };
    visited[`x${start.x}:y${start.y}`] = { cell: start, steps: { moves: 0, distance: 0, odd: true } };

    this.visitedNow(end, visited);
    const shortestPath = [];
    shortestPath.push(end);
    return this.getShortestPath(visited[`x${end.x}:y${end.y}`], shortestPath);
  }

  private static getShortestPath(cell: any, shortest: Cell[]) {
    if (cell.prevCel) {
     shortest.push(cell.prevCel.cell);
     cell.prevCel.cell.path = true;
     this.getShortestPath(cell.prevCel, shortest);
    }

    return shortest;
  }

  private static visitedNow(endingPoint: Cell, visited: any) {
    if(!endingPoint) { return }
    if(this.maxSearches < this.searchIndex) { return }
    
    if ((visited[`x${endingPoint.x}:y${endingPoint.y}`] && visited[`x${endingPoint.x}:y${endingPoint.y}`].cell === endingPoint)) {
      return;
    }
    
    
    Object.keys(visited).forEach(visitedCell => {
        if (!visited[visitedCell].checked) {
          const store: number[] = [ ];

          GSM.GridController.getAllNeighbors(visited[visitedCell].cell, 0).forEach((cell: Cell, index: number) => {
            if (!cell) {
              return;
            }

            const creatureOnSquare = this.creaturesOnGrid.find(a => a.cell.id === cell.id)

            if ((!cell.obstacle && !creatureOnSquare) && !store.some(i => index === i)) {
              if (!visited[`x${cell.x}:y${cell.y}`]) {
                visited[`x${cell.x}:y${cell.y}`] = {
                  cell,
                  steps: this.alternateDiagonal(visited[visitedCell], index),
                  prevCel: visited[visitedCell],
                };
              } else {
                if (visited[`x${cell.x}:y${cell.y}`].steps.moves > visited[visitedCell] + 1) {
                   visited[`x${cell.x}:y${cell.y}`].steps.moves = visited[visitedCell] + 1;
                }
              }
            }

            if (index === 0 && cell.obstacle) {
              // skip 7 4
              store.push(7);
              store.push(4);
            }
  
            if (index === 1 && cell.obstacle) {
              // skip 4 5
              store.push(4);
              store.push(5);
            }
  
            if (index === 2 && cell.obstacle) {
              // skip 5 6
              store.push(5);
              store.push(6);
            }
  
            if (index === 3 && cell.obstacle) {
              // skip 6 7
              store.push(6);
              store.push(7);
            }
          });
      }
      this.searchIndex++
      visited[visitedCell].checked = true;
    });
    this.visitedNow(endingPoint, visited);
  }

  public static verifyClosetLocation(start: Cell, end: Cell): Cell {
    if(this.isBadLocation(end)) { 
      const possibleAlternatives = GSM.GridController.getAllNeighbors(end, 0).filter(a => !this.isBadLocation(a))
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

  public static isBadLocation(end: Cell): boolean {
    return end.obstacle || this.creaturesOnGrid.find(a => a.cell.id === end.id) 
  }

  private static alternateDiagonal(visited: Visited, index: number): any {
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