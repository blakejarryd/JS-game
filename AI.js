const computerTurn = () => {
    if (difficulty = 'Hard') {
        computerHard()
    } else {
        ComputerEasy()
    }
    checkForWin() 
    checkForDraw()
    if (result === true) {
         endGame()
    }   
}

const ComputerEasy = () => {
    let squares = document.querySelectorAll('.square')
    let availableSpots = []
    for (square of squares) {
        if (square.textContent === '' ) {
            availableSpots.push(square)
        }
    }
    let randomChoice = Math.floor(Math.random() * availableSpots.length) 
    let choice = availableSpots[randomChoice] 
    addO(choice)
}

const boardStatus = () => {
        //get keys of win conditions object
        let winConditionKeys = Object.keys(gameData[gameMode].winConditions)
        let boardState = {}
        for (key of winConditionKeys) {
            let x = boardState[key] = {}
            let winIndex = gameData[gameMode].winConditions[key]
            let current = winIndex.map((index) => {
                return board[index]})
            boardState[key]['winCondition'] = winIndex
            boardState[key]['currentState'] = current
            boardState[key]['lineCountX'] = countX(current)
            boardState[key]['lineCountO'] = countO(current)
            }
            return boardState
            }

const computerHard = () => {
    //if player length greater than threshold
    //Then Block
    //Else go for win
    let choiceDataSet = ''
    let choice = ''
    let availableDataSet = availableSquares()
    let boardState = boardStatus()
    blockThreshold = Math.floor(gridSize * 0.75)
    let longX = longestX(boardState)
    let long0 = longestO(boardState)
    if (turn <= 2) {
        if (gameMode != '3 x 3') {
            console.log('here')
            choice = randomSquare()
        }
        else if (availableDataSet.includes('5')) {
            console.log('here2')
            choiceDataSet = '5'
            choice = returnSquare(choiceDataSet)
        } 
        else {
            console.log('here3')
            choiceDataSet = '1'
            choice = returnSquare(choiceDataSet)
        }
    }
    //bug fix where doesnt want to pick a square for drawn state
    else if (availableDataSet.length <= 2 && long0[1] < 2 && longX[1] < 2) {
        console.log('here4')
        choiceDataSet = availableDataSet[0]
        choice = returnSquare(choiceDataSet)
    }
    else if (longX[1] >= blockThreshold && long0[1] < longX[1]) {
        console.log('block')
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
        console.log('attack')
        let attackIndex = boardState[long0[0]]['winCondition']
        console.log(boardState)
        console.log(attackIndex)
        for (i of attackIndex) {
            for (s of availableDataSet) {
                if (i + 1 == s) {
                    choiceDataSet = s
                }
            }
        }
        choice = returnSquare(choiceDataSet)
    }
    console.log(choiceDataSet)
    console.log(choice)
    addO(choice)
}



const countX = (array) => {
    let count = 0
    if (array.includes('O')) {
        count = 0
        return count
    }
    array.forEach((val) => {
        if (val === 'X') {
            count++
        }
    })
    return count
}


const countO = (array) => {
    let count = 0
    if (array.includes('X')) {
        count = 0
        return count
    }
    array.forEach((val) => {
        if (val === 'O') {
            count++
        }
    })
    return count
}

const longestX = (boardState) => {
    let key = ''
    let most = -1
    for (line in boardState) {
        if (boardState[line]['lineCountX'] > most) {
            most = boardState[line]['lineCountX']
            key = line
        }
    }
    return [key,most]
}

const longestO = (boardState) => {
    let key = ''
    let most = -1
    for (line in boardState) {
        if (boardState[line]['lineCountO'] > most) {
            most = boardState[line]['lineCountO']
            key = line
        }
    }
    return [key,most]
}

const randomSquare = () => {
    let squares = document.querySelectorAll('.square')
    let availableSpots = []
    for (square of squares) {
        if (square.textContent === '' ) {
            availableSpots.push(square)
        }
    }
    let randomChoice = Math.floor(Math.random() * availableSpots.length) 
    let choice = availableSpots[randomChoice] 
    return choice
}

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

const returnSquare = (dataindex) => {
    let squares = document.querySelectorAll('.square')
    for (square of squares)
    if (square.dataset.index == dataindex) {
        console.log(square.dataset.index)
        return square
    }
}

