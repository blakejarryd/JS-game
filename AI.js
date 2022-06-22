//==================================================
//AI Functions
//==================================================
//Check for the Player which win condition line is most complete
const longestPlayer = (boardState) => {
    let key = ''
    let most = -1
    for (line in boardState) {
        if (boardState[line]['lineCountPlayer'] > most) {
            most = boardState[line]['lineCountPlayer']
            key = line
        }
    }
    return [key,most]
}

//Check for the Computer which win condition line is most complete
const longestComputer = (boardState) => {
    let key = ''
    let most = -1
    for (line in boardState) {
        if (boardState[line]['lineCountComputer'] > most) {
            most = boardState[line]['lineCountComputer']
            key = line
        }
    }
    return [key,most]
}

//Easy computer picks random square
const ComputerEasy = () => {
    choice = randomSquare()
    return choice
}


//Hard computer
/*============================================================================
1. Picks random square 
- Except for 3x3 mode where it takes middle if free, else takes top left
2. If player has a met > 75% of a win condition
- Block player
3. Else
- Increases its own current longest winning condition
============================================================================*/
const computerHard = () => {
    let choiceDataSet = ''
    let choice = ''
    let availableDataSet = availableSquares()
    let boardState = boardStatus()
    blockThreshold = Math.floor(gridSize * 0.75)
    let longX = longestPlayer(boardState)
    let long0 = longestComputer(boardState)
    if (turn <= 2) {
        if (gameMode != '3 x 3') {
            choice = randomSquare()
        }
        else if (availableDataSet.includes('5')) {
            choiceDataSet = '5'
            choice = returnSquare(choiceDataSet)
        } 
        else {
            choiceDataSet = '1'
            choice = returnSquare(choiceDataSet)
        }
    }
    //bug fix where doesnt want to pick a square for drawn state
    else if (availableDataSet.length <= 2 && long0[1] < 2 && longX[1] < 2) {
        choiceDataSet = availableDataSet[0]
        choice = returnSquare(choiceDataSet)
    }
    else if (longX[1] >= blockThreshold && long0[1] < longX[1]) {
        let blockIndex = boardState[longX[0]]['winCondition']
        for (i of blockIndex) {
            for (s of availableDataSet) {
                if (i + 1 == s) {
                    choiceDataSet = s
                }
            }
        }
        choice = returnSquare(choiceDataSet)
        } else {
        let attackIndex = boardState[long0[0]]['winCondition']
        for (i of attackIndex) {
            for (s of availableDataSet) {
                if (i + 1 == s) {
                    choiceDataSet = s
                }
            }
        }
        choice = returnSquare(choiceDataSet)
    }
    return choice
}

//Computer turn wrapper 
const computerTurn = () => {
    if (difficulty === 'Hard') {
        choice = computerHard()
    } else {
        choice = ComputerEasy()
    }
    addToken(choice, currentToken)
    checkForWin() 
    checkForDraw()
    if (result === true) {
         endGame()
    }   
}

//returns an array of the data index values of available squares
const availableSquares = () => {
    let squares = document.querySelectorAll('.square')
    let availableDataSet = []
    for (square of squares) {
        if (square.textContent === '' ) {
            availableDataSet.push(square.dataset.index)
        }
    }
    return availableDataSet
}

//returns a square element based on a provied square data index value
const returnSquare = (dataindex) => {
    let squares = document.querySelectorAll('.square')
    for (square of squares)
    if (square.dataset.index == dataindex) {
        return square
    }
}

//Selects a random square based of available squares
const randomSquare = () => {
    let availableSpots = availableSquares()
    let randomChoice = Math.floor(Math.random() * availableSpots.length) 
    let choiceDataIndex = availableSpots[randomChoice]
    let choice = returnSquare(choiceDataIndex)
    return choice
}
