// Pre code
// 1. set hover board when start game to first player (X)
// 2. when click on cell add class to selected cell via current turn
// 3. swap turn after click cell
// 4. check win condition every click on cell
// 5. when find same class every cell by wincondition show end game message
// 5.1 WINCONDITION[] is store win combination position Ex: If find X class in position 0,1,2 on cells player X is winner
// 6. if can't find win pattern show end game message draw
// 7. set restart button for reset board

// include elements
const board = document.getElementById('board')
const cells = document.querySelectorAll('#cell')
const endGamegMessage = document.getElementById('endGamegMessage')
const messageText = document.getElementById('messageText')
const restartBtn = document.getElementById('restartBtn')

let circleTurn
const PLAYER_X = 'x'
const PLAYER_CIRCLE = 'circle'

const WINCONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function startGame() {
    circleTurn = false
    cells.forEach(cell => {
        cell.classList.remove(PLAYER_CIRCLE)
        cell.classList.remove(PLAYER_X)
        cell.addEventListener("click", handleClick, { once: true })
    })
    endGamegMessage.classList.remove('show')
    hoverBoard()
}
restartBtn.addEventListener('click', startGame)
function handleClick(e) {
    let selectedCell = e.target
    let currentTurn = circleTurn ? PLAYER_CIRCLE : PLAYER_X
    selectedCell.classList.add(currentTurn)
    if (checWin(currentTurn)) {
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    }
    swapTurn()
    hoverBoard()
}
function hoverBoard() {
    board.classList.remove(PLAYER_X)
    board.classList.remove(PLAYER_CIRCLE)
    if (circleTurn) {
        board.classList.add(PLAYER_CIRCLE)
    } else {
        board.classList.add(PLAYER_X)
    }
}
function swapTurn() {
    circleTurn = !circleTurn
}
function checWin(currentTurn) {
    return WINCONDITION.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentTurn)
        })
    })
}
function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(PLAYER_CIRCLE) || cell.classList.contains(PLAYER_X)
    })
}
function endGame(draw){
    endGamegMessage.classList.add('show')
    if(draw){
        messageText.innerText = `DRAW`
    } else {
        messageText.innerText = `${circleTurn ? "Circle's" : "X's"} Win!!!!`
    }
}
startGame()