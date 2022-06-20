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
const settingsMenu = document.querySelector(".settings-menu")

//Keeps track of game turn, incremented each time a square is played
let turn = 0
let gridSize = 3
let gameMode = '3 x 3'
//Used to track the status of the board
let board = Array(gridSize * gridSize)
let winner = ''
let winMethod = ''
//Game has a result
let result = false
//Result tallies
let playerWins = 0
let computerWins = 0
let ties = 0
//theme
let theme = 'Orange Pop'
setTheme(theme)



//Required game data
const gameData = {
    '3 x 3': {
        gridSize: 3,
        squareSize: '200px',
        fontSize: '150px',
        maxTurns: 9,
        winConditions: {
            row1:       [0,1,2],
            row2:       [3,4,5],
            row3:       [6,7,8],
            column1:    [0,3,6],
            column2:    [1,4,7],
            column3:    [2,5,8],
            diagonal1:  [0,4,8],
            diagonal2:  [2,4,6],
        }      
    },
    '4 x 4': {
        gridSize: 4,
        squareSize: '175px',
        fontSize: '130px',
        maxTurns: 16,
        winConditions: {
            row1:       [0,1,2,3],
            row2:       [4,5,6,7],
            row3:       [8,9,10,11],
            row4:       [12,13,14,15],
            column1:    [0,4,8,12],
            column2:    [1,5,9,13],
            column3:    [2,6,10,14],
            column4:    [3,7,11,15],
            diagonal1:  [0,5,10,15],
            diagonal2:  [3,6,9,12],
        }      
    },
    '5 x 5': {
        gridSize: 5,
        squareSize: '150px',
        fontSize: '110px',
        maxTurns: 25,
        winConditions: {
            row1:       [0,1,2,3,4],
            row2:       [5,6,7,8,9],
            row3:       [10,11,12,13,14],
            row4:       [15,16,17,18,19],
            row5:       [20,21,22,23,24],
            column1:    [0,5,10,15,20],
            column2:    [1,6,11,16,21],
            column3:    [2,7,12,17,22],
            column4:    [3,8,13,18,23],
            column5:    [4,9,14,19,24],
            diagonal1:  [0,6,12,18,24],
            diagonal2:  [4,8,12,16,20],
        }      
    },
    '6 x 6': {
        gridSize: 6,
        squareSize: '125px',
        fontSize: '100px',
        maxTurns: 36,
        winConditions: {
            row1:       [0,1,2,3,4,5],
            row2:       [6,7,8,9,10,11],
            row3:       [12,13,14,15,16,17],
            row4:       [18,19,20,21,22,23],
            row5:       [24,25,26,27,28,29],
            row6:       [30,31,32,33,34,35],
            column1:    [0,6,12,18,24,30],
            column2:    [1,7,13,19,25,31],
            column3:    [2,8,14,20,26,32],
            column4:    [3,9,15,21,27,33],
            column5:    [4,10,16,22,28,34],
            column6:    [5,11,17,23,29,35],
            diagonal1:  [0,7,14,21,28,35],
            diagonal2:  [5,10,15,20,25,30],
        }      
    },
    '7 x 7': {
        gridSize: 7,
        squareSize: '100px',
        fontSize: '80px',
        maxTurns: 49,
        winConditions: {
            row1:       [0,1,2,3,4,5,6],
            row2:       [7,8,9,10,11,12,13],
            row3:       [14,15,16,17,18,19,20],
            row4:       [21,22,23,25,25,26,27],
            row5:       [28,29,30,31,32,33,34],
            row6:       [35,36,37,38,39,40,41],
            row7:       [42,43,44,45,46,47,48],
            column1:    [0,7,14,21,28,35,42],
            column2:    [1,8,15,22,29,36,43],
            column3:    [2,9,16,23,30,37,44],
            column4:    [3,10,17,24,31,38,45],
            column5:    [4,11,18,25,32,39,46],
            column6:    [5,12,19,26,33,40,47],
            column7:    [6,13,20,27,34,41,48],
            diagonal1:  [0,8,16,24,32,40,48],
            diagonal2:  [6,12,18,24,30,36,42],
        }      
    },
    '8 x 8': {
        gridSize: 8,
        squareSize: '85px',
        fontSize: '70px',
        maxTurns: 64,
        winConditions: {
            row1:       [0,1,2,3,4,5,6,7],
            row2:       [8,9,10,11,12,13,14,15],
            row3:       [16,17,18,19,20,21,22,23],
            row4:       [24,25,26,27,28,29,30,31],
            row5:       [32,33,34,35,36,37,38,39],
            row6:       [40,41,42,43,44,45,46,47],
            row7:       [48,49,50,51,52,53,54,55],
            row8:       [56,57,58,59,60,61,62,63],
            column1:    [0,8,16,24,32,40,48,56],
            column2:    [1,9,17,25,33,41,49,57],
            column3:    [2,10,18,26,34,42,50,58],
            column4:    [3,11,19,27,35,43,51,59],
            column5:    [4,12,20,28,36,44,52,60],
            column6:    [5,13,21,29,37,45,53,61],
            column7:    [6,14,22,30,38,46,54,62],
            column8:    [7,15,23,31,35,47,55,63],
            diagonal1:  [0,9,18,27,36,45,54,63],
            diagonal2:  [7,14,21,28,35,42,49,56],
        }      
    },
} 

//==================================================
//Functions
//==================================================

//Add squares to board based on grid size
const initaliseBoard = () => {
    squareSize = gameData[gameMode].squareSize
    gameBoard.style.fontSize = gameData[gameMode].fontSize
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize})`
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, ${squareSize})`
    for (let i = 1; i <= (gridSize * gridSize); i++) {
        let square = document.createElement('div')
        square.classList.add("square")
        square.style.borderColor = themes[theme].lines
        square.style.color = themes[theme].mainText
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
    if (turn === gameData[gameMode].maxTurns) {
        winner = 'draw'
        ++ties
        result = true
    }
}

const checkForWin = () => {
    //get keys of win conditions object
    let winConditionKeys = Object.keys(gameData[gameMode].winConditions)
    //loop through win conditions to access possible win arrays (winCon)
    for (key of winConditionKeys) {
        let winIndex = []
        winIndex = gameData[gameMode].winConditions[key]
        //map winCon arrays to current board states (winLine)
        let winLine = winIndex.map((index) => {
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
                winMethod = key
            } else if (winLine.every((a) => a === 'O')) {
                winner = 'O'
                computerWins++
                computerTally.textContent = computerWins
                result = true
                winMethod = key
            }
        }
    }
}

const highlightWin = () => {
        let squares = document.querySelectorAll('.square')
        let winIndex = gameData[gameMode].winConditions[winMethod]
        console.log(winIndex)
        // console.log(squares)
        // console.log(typeof squares)
        let winSquares = []
        winSquares = winIndex.map((index) => {
            return squares[index]
        })
        //add win class to winning squares
        for (square of winSquares) {
            square.classList.add('win')
        }
        //set all non-winnning squares to square border color
        for (square of squares) {
            if(!square.classList.contains('win')) {
                square.style.color = themes[theme].lines
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
    highlightWin()
    declareResult()
    restartGameButton()
    console.log(`winner is ${winner}`)
}

const restartGame = () => {
    //remove squares
    let squares = document.querySelectorAll('.square')
    for (square of squares) {
        square.remove()
    }
    //remove declareResult text
    let resultText = document.querySelector('h3')
    if (resultText) {
        resultText.remove()
    } 
    //remove restart icon
    let restartButton = document.querySelector('.restart')
    if (restartButton) {
    restartButton.remove()
    }
    //reset turn count
    turn = 0
    //reset winner
    winner = ''
    //reset board array
    board = []
    //update result boolean to false
    result = false
    //create board
    initaliseBoard()
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
        console.log('the win method is ' + winMethod)
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




















