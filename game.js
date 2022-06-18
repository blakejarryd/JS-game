//==================================================
//TIC TAC TOE - GAME ENGINE
//==================================================
//*maybe put some words here  


//==================================================
//Global variables
//==================================================

//Declare gameboard and square elements
const body = document.querySelector('body')
const gameBoard = document.querySelector('.board')
const squares = document.querySelectorAll(".square")
const playerTally = document.querySelector(".player-tally-count")
const computerTally = document.querySelector(".computer-tally-count")

//Keeps track of game turn, incremented each time a square is played
let turn = 0
//Used to track the status of the board
let board = []
//used to record the winner
let winner = ''
//Game has a result
let result = false
//Result tallies
let playerWins = 0
let computerWins = 0
let ties = 0

//Index of winning array combos, and line classes needed 
const winConditions = {
    row1: {array: [0,1,2]},
    row2: {array: [3,4,5]},
    row3: {array: [6,7,8]},
    column1: {array: [0,3,6]},
    column2: {array: [1,4,7]},
    column3: {array: [2,5,8]},
    diagonal1: {array: [0,4,8]},
    diagonal2: {array: [2,4,6]},
}

//==================================================
//Functions
//==================================================

//Board array to track state of play of the board i.e. what pieces are where
const initaliseBoard = () => {
    board = Array(squares.length)
    for (let i = 0; i < board.length; i++) {
        board[i] = ''
    }
}

//Returns the selected square
const squareSelect = (event) => {
   return event.target
}

//Function to add an 'X'
const addX = (square) => {
    square.textContent = 'X'
    let index = square.dataset.index - 1
    board[index] = 'X'
    turn++
}

//Function to add an 'O'
const addO = (square) => {
    square.textContent = 'O'
    let index = square.dataset.index - 1
    board[index] = 'O'
    turn++
}

//Checks if the game is a draw
const checkForDraw= () => {
    if (turn === 9) {
        winner = 'draw'
        ++ties
        result = true
    }
}

const checkForWin = () => {
    //get keys of win conditions object
    let winKeys = Object.keys(winConditions)
    //loop through win conditions to access possible win arrays (winCon)
    for (key of winKeys) {
        let winCon = []
        winCon = winConditions[key]['array']
        //map winCon arrays to current board states (winLine)
        let winLine = winCon.map((index) => {
            return board[index] 
        })
        //just some useful debugging logs to see state of each winLine on every turn
            //console.log(key + ' status ' + winLine)
        //check if any win condition has been met - winLine array all same (excluding empty strings)
        if (winLine.some((a) => a === '')) {
        } else {
            if (winLine.every((a) => a === 'X')) {
                winner = 'X'
                playerWins++
                playerTally.textContent = playerWins
                result = true
            } else if (winLine.every((a) => a === 'O')) {
                winner = 'O'
                computerWins++
                computerTally.textContent = computerWins
                result = true
            }
        }
    }
}

const declareResult = () => {
    let h3 = document.createElement('h3')
    if (winner === 'draw') {
        h3.textContent = 'This one is all tied up. Try again?'
    } else if (winner === 'X') {
        h3.textContent = 'Nice work! You won. Can you do it again?'
    } else {
        h3.textContent = 'Bad luck! The computer wins this round. Go again?'
    }
    body.appendChild(h3)
}

// const declareDraw = () => {

// }

const restartGameButton = () => {
    let restartButton = document.createElement('img')
    restartButton.src = "img/Restart-icon-white.png"
    restartButton.classList.add("restart")
    body.appendChild(restartButton)
    restartButton.addEventListener('click',restartGame)
}

const endGame = () => {
    declareResult()
    restartGameButton()
    console.log(`winner is ${winner}`)
}

const restartGame = () => {
    //clear squares
    squares.forEach((s) => {
        s.textContent = ''
    })
    //remove declareResult text
    let resultText = document.querySelector('h3')
    resultText.remove()
    //remove restart icon
    let restartButton = document.querySelector('.restart')
    restartButton.remove()
    //reset turn count
    turn = 0
    //reset winner
    winner = ''
    //reset board array
    board = []
    //update result boolean to false
    result = false
    //check result tallies - debbuging only
    console.log("player wins: " + playerWins)
    console.log("computer wins: " + computerWins)
    console.log("ties: " + ties)
    console.log("the turn is: " + turn)
}

//Logic that runs each time an 'X' or 'O' is attempted to be placed
takeTurn = (event) => {
    let square = event.target
    //if game is over return
    if (result === true) {
        return
    }
    //if square already used return
    if (square.innerText != "") {
        return
    }
    if (turn % 2 === 0) {
        addX(square)
    } else {
        addO(square)
    }
    checkForWin()
    checkForDraw()
    if (result === true) {
        endGame()
    }   
}

//==================================================
//Run Game
//==================================================

//Creates the board
initaliseBoard()
//Initialises takeTurn  
gameBoard.addEventListener('click', takeTurn)




















