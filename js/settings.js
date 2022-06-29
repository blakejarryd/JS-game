//==================================================
//Settings Variables
//==================================================
let twoPlayer = false
let difficulty = 'Hard'
let theme = 'Orange Pop'
let gameMode = '3 x 3'
let gridSize = 3
let displayWidth = 0
let display = 'desktopDisplay'

//==================================================
//Required Settings Elements
//==================================================
const body = document.querySelector('body')
const header = document.querySelector('header')
const settingsIcon = document.querySelector('.settings-icon')
const settingsMenu = document.querySelector('.settings-menu')
const twoPlayerSwitch = document.querySelector('input')
const boardOverlay = document.querySelector('.board-overlay')
const gameBoard = document.querySelector('.board')

//==================================================
//Settings Data Structures
//==================================================
const themes = {
    'Winter Blue': {
        background: '#011640',
        header: '#6093BF',
        headerText: '#BFCDD9',
        mainText: '#BFCDD9',
        settingsBar: '#356084',
        lines: '#008F9F',
        themeHover: 'darkgrey',
        hashIcon: 'img/Hash-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Orange Pop': {
        background: '#1B1F3A',
        header: '#008F9F',
        headerText: '#F2F2F2',
        mainText: '#F2B950',
        settingsBar: '#00646f',
        lines: '#F97E11',
        hashIcon: 'img/Hash-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Mountain Mist': {
        background: '#8FC1B5',
        header: '#146551',
        headerText: 'white',
        mainText: '#d0d0d0',
        settingsBar: '#589A8D',
        lines: '#265C4B',
        hashIcon: 'img/Hash-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Soothing Lilac': {
        background: '#F7F7FC',
        header: '#E4F1FE',
        headerText: 'black',
        mainText: '#D5CFE6',
        settingsBar: '#CFD4E6',
        lines: '#784890',
        hashIcon: 'img/Hash.png',
        settingsIcon: 'img/Settings-icon.png',
        restartIcon: 'img/Restart-icon.png',
    },
    'Stone & Chalk': {
        background: '#BFBFBF',
        header: '#262626',
        headerText: 'white',
        mainText: '#FBF7F5',
        settingsBar: '#595959',
        lines: '#737373',
        hashIcon: 'img/Hash-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
}

//==================================================
//Settings Functions
//==================================================
//exands the setting menu when the gear icon is clicked
expandSettingsMenu = () => {
    settingsMenu.classList.toggle('settings-show')
}

//applies the selected theme to all the elements based on the theme object
applyTheme = (theme) => {
    //update backgroundColors of elements
    body.style.background = themes[theme].background
    header.style.background = themes[theme].header
    boardOverlay.style.outlineColor = themes[theme].background
    settingsMenu.style.background = themes[theme].settingsBar
    //update text colors
    header.style.color = themes[theme].headerText
    settingsMenu.style.color = themes[theme].headerText
    //update setting button colors
    let buttons = document.querySelectorAll('button')
    for (button of buttons) {
    button.style.color = themes[theme].headerText
    }
    //uppdate all the squares
    let squares = document.querySelectorAll('.square')
    for (let square of squares) {
        square.style.color = themes[theme].mainText
        square.style.borderColor = themes[theme].lines
    }
    //update icons
    let settingsIcon = document.querySelector(".settings-icon-img")
    settingsIcon.src = themes[theme].settingsIcon
    let hashIcon = document.querySelector(".hash-icon-img")
    hashIcon.src = themes[theme].hashIcon
    //update multiplayer switch accent
    let multiplayerSwitch = document.querySelector('input')
    let multiplayerSwitchLabel = document.querySelector('label')
    if (multiplayerSwitch.checked) {
        multiplayerSwitchLabel.style.background = themes[theme].lines
    } else (
        multiplayerSwitchLabel.style.background = 'grey'
    )
    //add selected class to li element
    let themeElements = document.querySelectorAll('.theme')
    for (element of themeElements) {
        if (element.textContent === theme) {
            element.classList.add('selected')
        } else {
            element.classList.remove('selected')
        }
    } 
    let listItems = document.querySelectorAll('li')
    for (item of listItems) {
        if (item.classList.contains('selected')) {
            item.style.backgroundColor = themes[theme].lines
        } else {
            item.style.backgroundColor = themes[theme].settingsBar
        }
    }
}

//updates the theme variable when a them is clicked 
setTheme = (event) => {
    classArr = event.target.classList
    containsTheme = classArr.contains('theme')
    if (!containsTheme) {
        return
    } else {
        theme = event.target.textContent
        applyTheme(theme)
    }
}

//update the board size when new game mode is selected, resets the current game
setBoardSize = (event) => {
    classArr = event.target.classList
    containsGridSize = classArr.contains('gridSize')
    if (!containsGridSize) {
        return
    } else {
        let size = event.target.textContent
        gameMode = size
        gridSize = size.charAt(0)
    }
    let gridSizeElements = document.querySelectorAll('.gridSize')
    for (element of gridSizeElements) {
        if (element.textContent === gameMode) {
            element.classList.add('selected')
            //update dropdown selected background colour
            element.style.backgroundColor = themes[theme].lines
        } else {
            element.classList.remove('selected')
            element.style.backgroundColor = themes[theme].settingsBar
        }
    }   
    restartGame()
}

//update difficulty (can be done mid game i.e. doesnt call restartGame())
changeDifficulty = (event) => {
    classArr = event.target.classList
    containsDifficulty = classArr.contains('difficulty')
    if (!containsDifficulty) {
        return
    } else {
        difficulty = event.target.textContent
    }
    let difficultyElements = document.querySelectorAll('.difficulty')
    for (element of difficultyElements) {
        if (element.textContent === difficulty) {
            element.classList.add('selected')
            //update dropdown selected background colour
            element.style.backgroundColor = themes[theme].lines
        } else {
            element.classList.remove('selected')
            element.style.backgroundColor = themes[theme].settingsBar
        }
    }
}

//hides the AI difficulty option when 2 player mode is enabled
hideDifficultyPanel = (event) => {
    classArr = event.target.classList
    containsDifficulty = classArr.contains('difficulty')
    if (!containsDifficulty) {
        return
    }
}

//Updates to 2 player mode. Resets current game and clears stats
twoPlayerMode = (event) => {
    let multiplayerSwitchLabel = document.querySelector('label')
    if (event.target.checked) {
        twoPlayer = true
        multiplayerSwitchLabel.style.background = themes[theme].lines
    } else {
        twoPlayer = false
        multiplayerSwitchLabel.style.background = 'grey'
    }
    let difficultyPanel = document.querySelector('.AI')
    difficultyPanel.classList.toggle('hide')
    updatePlayerNames()
    resetStats()
    restartGame()
}

//Sets Computer name to Player 2
updatePlayerNames = () => {
    if (twoPlayer) {
        computerName.textContent = 'Player 2'
    } else {
        computerName.textContent = 'Computer'
    }
}

//Sets display mode. If the game is opened on a mobile device grid is set to smaller squares
//Note only works on page refresh, new game mode etc. Not on screen resize
updateDisplayMode = () => {
    let displayWidth = window.innerWidth
    if (displayWidth < 600) {
        display = 'mobileDisplay'
    } 
}

//Clears win tallies
resetStats = () => {
    playerWins = 0
    computerWins = 0
    ties = 0
    playerTally.textContent = playerWins
    computerTally.textContent = computerWins
}

function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    widthOutput.textContent = window.innerWidth;
  }

//==================================================
//Add Settings Event Listeners
//==================================================
settingsIcon.addEventListener('click', expandSettingsMenu)
body.addEventListener('click', setTheme)
body.addEventListener('click', setBoardSize)
body.addEventListener('click', changeDifficulty)
body.addEventListener('click', hideDifficultyPanel)
twoPlayerSwitch.addEventListener('click', twoPlayerMode)

//==================================================
//Initialise default theme
//==================================================
updateDisplayMode()
applyTheme(theme)