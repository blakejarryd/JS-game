//==================================================
//TIC TAC TOE - GAME ENGINE
//==================================================
//*maybe put some words here  


//==================================================
//Global variables
//==================================================
//Declare required html elements
const body = document.querySelector('body')
const header = document.querySelector('header')
const boardOverlay = document.querySelector('.board-overlay')
const gameBoard = document.querySelector('.board')
const squares = document.querySelectorAll(".square")
const playerTally = document.querySelector(".player-tally-count")
const computerTally = document.querySelector(".computer-tally-count")
const resultText = document.querySelector(".result")

//Keeps track of game turn, incremented each time a square is played
let turn = 0
//Grid size
let gridSize = 3
//Used to track the status of the board
let board = Array(gridSize * gridSize)
//used to record the winner
let winner = ''
//Game has a result
let result = false
//Result tallies
let playerWins = 0
let computerWins = 0
let ties = 0

//Index of winning array combos
const winConditions = {
    row1:       [0,1,2],
    row2:       [3,4,5],
    row3:       [6,7,8],
    column1:    [0,3,6],
    column2:    [1,4,7],
    column3:    [2,5,8],
    diagonal1:  [0,4,8],
    diagonal2:  [2,4,6],
}



//==================================================
//Functions
//==================================================

//Add squares to board based on grid size
const initaliseBoard = () => {
    let squareSize = '200px'
    if (gridSize === 4) {
        squareSize = '190px'
    }
    if (gridSize === 5) {
        squareSize = '175px'
    }
    if (gridSize === 6) {
        squareSize = '150px'
    }
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize})`
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, ${squareSize})`
    for (let i = 1; i <= (gridSize * gridSize); i++) {
        let square = document.createElement('div')
        square.classList.add("square")
        square.dataset.index = i
        gameBoard.appendChild(square)
    }
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
    if (result === true) {
        return
    }
    if (turn === 9) {
        winner = 'draw'
        ++ties
        result = true
    }
}

const checkForWin = () => {
    //get keys of win conditions object
    let winConditionKeys = Object.keys(winConditions)
    //loop through win conditions to access possible win arrays (winCon)
    for (key of winConditionKeys) {
        let winIndex = []
        winIndex = winConditions[key]
        //map winCon arrays to current board states (winLine)
        let winLine = winIndex.map((index) => {
            return board[index] 
        })
        //just some useful debugging logs to see state of each winLine on every turn
            console.log(key + ' status ' + winLine)
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
    h3.style.color = themes[theme].mainText
    if (winner === 'draw') {
        h3.textContent = 'This one is all tied up. Try again?'
    } else if (winner === 'X') {
        h3.textContent = 'Nice work! You won. Can you do it again?'
    } else {
        h3.textContent = 'Bad luck! The computer wins this round. Go again?'
    }
    body.appendChild(h3)
}

const restartGameButton = () => {
    let restartButton = document.createElement('img')
    restartButton.src = themes[theme].restartIcon
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
    let squares = document.querySelectorAll('.square')
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
takeTurnX = (event) => {
    let square = event.target
    //if game is over return
    if (result === true) {
        return
    }
    //if square already used return
    if (square.innerText != "") {
        return
    }
    // if (turn % 2 === 0) {
    //    
    // } else {
    //     addO(square)
    // }
    addX(square)
    checkForWin() 
    checkForDraw()
    if (result === true) {
        endGame()
    }
    if (result === false) {
    computerTurn()
    }   
}



//==================================================
//Run Game
//==================================================

//Creates the board
initaliseBoard()
//Initialises takeTurn  
gameBoard.addEventListener('click', takeTurnX)




















