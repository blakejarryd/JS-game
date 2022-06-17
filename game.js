//==================================================
//TIC TAC TOE - GAME ENGINE
//==================================================
//*maybe put some words here  


//==================================================
//Global variables
//==================================================

//Declare gamebaord and square elements
const body = document.querySelector('body')
const gameBoard = document.querySelector('.board')
const squares = document.querySelectorAll(".square")

//Keeps track of game turn, incremented each time a square is played
let turn = 0
//Used to track the status of the board
let board = []
//used to record the winner
let winner = ''
//used to store the row/column/diagonal in which the game was won
let winMethod = ''
//Game has a result
let result = false
//Result tallies
let playerWins = 0
let computerWins = 0
let ties = 0

//Index of winning array combos, and line classes needed 
const winConditions = {
    row1: {array: [0,1,2], lineClass: ".row1-line"},
    row2: {array: [3,4,5], lineClass: ".row2-line"},
    row3: {array: [6,7,8], lineClass: ".row3-line"},
    column1: {array: [0,3,6], lineClass: ".column1-line"},
    column2: {array: [1,4,7], lineClass: ".column2-line"},
    column3: {array: [2,5,8], lineClass: ".column3-line"},
    diagonal1: {array: [0,4,8], lineClass: ".diagonal1-line"},
    diagonal2: {array: [2,4,6], lineClass: ".diagonal2-line"},
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
            // console.log(key + ' status ' + winLine)
        //check if any win condition has been met - winLine array all same (excluding empty strings)
        if (winLine.some((a) => a === '')) {
            //do nothing, victory condition not met
        } else {
            if (winLine.every((a) => a === 'X')) {
                winner = 'X'
                winMethod = winConditions[key]['lineClass']
                result = true
            } else if (winLine.every((a) => a === 'O')) {
                winner = 'O'
                winMethod = winConditions[key]['lineClass']
                result = true
            }
        }
    }
}

const highlightWin = () => {
    let line = document.querySelector(winMethod)
    line.style.display = "inline"
}

const declareWinner = () => {
    if (winner === 'draw') {
        return
    }
    let h3 = document.createElement('h3')
    if (winner === 'X') {
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
    highlightWin()
    declareWinner()
    restartGameButton()
    console.log(`winner is ${winner}`)
    console.log(winMethod)
}

const restartGame = (event) => {
console.log(event)
}

//Where the magic happens. Logic that runs each time an 'X' or 'O' is placed
takeTurn = (event) => {
    let square = squareSelect(event)
    if (result === true) {
        return
    }
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
body.addEventListener('click', takeTurn)
restartGame()



















