//==================================================
//Global variables
//==================================================



let theme = 'Theme 1'

const themes = {
    'Theme 1': {
        background: '#011640',
        header: '#6093BF',
        headerText: '#BFCDD9',
        mainText: '#BFCDD9',
        settingsBar: '#6093BF',
        lines: '#008F9F',
        themeHover: 'darkgrey',
        homeIcon: 'img/Home-icon-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Theme 2': {
        background: '#1B1F3A',
        header: '#008F9F',
        headerText: '#F2F2F2',
        mainText: '#F2B950',
        settingsBar: '#008F9F',
        lines: '#F97E11',
        homeIcon: 'img/Home-icon-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Theme 3': {
        background: '#F2F2F2',
        header: '#F2D9D0',
        headerText: 'black',
        mainText: '#F2C5BB',
        settingsBar: '#F2D9D0',
        lines: '#F2B9AC',
        homeIcon: 'img/Home-icon.png',
        settingsIcon: 'img/Settings-icon.png',
        restartIcon: 'img/Restart-icon.png',
    },
    'Theme 4': {
        background: '#F2F2F2',
        header: '#585859',
        headerText: '#A9DED4',
        mainText: '#A6A6A6',
        settingsBar: '#585859',
        lines: '#9CD8CE',
        homeIcon: 'img/Home-icon-white.png',
        settingsIcon: 'img/Settings-icon-white.png',
        restartIcon: 'img/Restart-icon.png',
    },
}

expandSettingsMenu = () => {
    let settingsMenu = document.querySelector('.settings-menu')
    settingsMenu.classList.toggle('settings-show')
}
    
setTheme = (event) => {
    classArr = event.target.classList
    containsTheme = classArr.contains('theme')
    if (!containsTheme) {
        return
    } else {
        theme = event.target.textContent
        //update backgroundColors of elements
        body.style.background = themes[theme].background
        header.style.background = themes[theme].header
        boardOverlay.style.outlineColor = themes[theme].background
        settingsMenu.style.background = themes[theme].settingsBar
        //update text colors
        header.style.color = themes[theme].headerText
        settingsMenu.style.color = themes[theme].headerText
        //update setting button colors
        let buttons = document.querySelector('button')
        buttons.style.color = themes[theme].headerText
        //uppdate all the squares
        let squares = document.querySelectorAll('.square')
        for (let square of squares) {
            square.style.color = themes[theme].mainText
            square.style.borderColor = themes[theme].lines
        }
        //update icons
        const settingsIcon = document.querySelector(".settings-icon-img")
        settingsIcon.src = themes[theme].settingsIcon
        const homeIcon = document.querySelector(".home-icon-img")
        homeIcon.src = themes[theme].homeIcon
    }   
}

    
expandDropdown = (event) => {
    const isDropdownButton = event.target.matches('[data-dropdown-button]')
    if (!isDropdownButton) {
        return
    }
    let dropdown = event.target.parentNode
    let dropdownList = dropdown.querySelector('.dropdown-menu')
    dropdownList.classList.toggle('dropwdown-show')    
}

setBoardSize = (event) => {
    classArr = event.target.classList
    containsGridSize = classArr.contains('gridSize')
    if (!containsGridSize) {
        return
    } else {
        let size = event.target.textContent
        gridSize = size.charAt(0)
    }
    restartGame()
}



const settingsIcon = document.querySelector('.settings-icon')

settingsIcon.addEventListener('click', expandSettingsMenu)
body.addEventListener('click', expandDropdown)
body.addEventListener('click', setTheme)
body.addEventListener('click', setBoardSize)
// setTheme(theme)
//use plus/minus for expand? highlight should be on the dropdown menu items.