import {RestfulAdapter} from "../connections/adapter"

export function canMove(active_game, direction) {
  switch (direction){
    case "up":
      switch (active_game.position){
        case 1:
        case 2:
        case 3:
        case 6:
        case 7:
        case 12:
          return false;
        default:
          executeMove(active_game, "up")
          return true;
      }
      break;
    case "down":
      switch (active_game.position){
        case 24:
        case 23:
        case 22:
        case 19:
        case 13:
        case 18:
          return false;
        default:
          executeMove(active_game, "down")
          return true;
      }
      break;
    case "left":
      switch (active_game.position){
        case 1:
        case 3:
        case 7:
        case 13:
        case 19:
        case 23:
          return false;
        default:
          executeMove(active_game, "left")
          return true;
      }
      break;
    case "right":
      switch (active_game.position){
        case 2:
        case 6:
        case 12:
        case 18:
        case 22:
        case 24:
          return false;
        default:
          executeMove(active_game, "right")
          return true;
      }
      break;
  }
}

function moveUp(position){
  switch(position){
    case 24:
    case 23:
      return (position - 3)
    case 22:
    case 21:
    case 20:
    case 19:
      return (position - 5)
    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
      return (position - 6)
    case 11:
    case 10:
    case 9:
    case 8:
      return (position - 5)
    case 5:
    case 4:
      return (position - 3)
  }
}

function moveDown(position){
  switch(position){
    case 1:
    case 2:
      return (position + 3)
    case 3:
    case 4:
    case 5:
    case 6:
      return (position + 5)
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      return (position + 6)
    case 14:
    case 15:
    case 16:
    case 17:
      return (position + 5)
    case 20:
    case 21:
      return (position + 3)
  }
}

function moveRight(position){
  return position + 1
}

function moveLeft(position){
  return position - 1
}

function executeMove(active_game, direction){
  let newPosition;
  switch(direction){
    case "up":
      newPosition = moveUp(active_game.position)
      break;
    case "down":
      newPosition = moveDown(active_game.position)
      break;
    case "left":
      newPosition = moveLeft(active_game.position)
      break;
    case "right":
      newPosition = moveRight(active_game.position)
      break;
  }
  RestfulAdapter.editFetchToChannel("active_games", active_game.id, {position: newPosition})
}
