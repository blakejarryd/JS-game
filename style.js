//==================================================
//Global variables
//==================================================


let theme = 'Native Night'

const themes = {
    'Native Night': {
        background: 'black',
        header: 'lightblue',
        headerText: 'black',
        homeIcon: 'img/Home-icon.png',
        settingsIcon: 'img/Settings-icon.png',
        mainText: 'white',
        restartIcon: 'img/Restart-icon-white.png',
    },
    'Bright White': {
        background: 'white',
        header: 'green',
        headerText: 'black',
        homeIcon: 'img/Home-icon.png',
        settingsIcon: 'img/Settings-icon.png',
        mainText: 'black',
        restartIcon: 'img/Restart-icon.png',
    }
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
        let theme = event.target.textContent
        body.style.background = themes[theme].background
        header.style.background = themes[theme].header
        boardOverlay.style.outlineColor = themes[theme].background
        let squares = document.querySelectorAll('.square')
        for (let square of squares) {
            square.style.color = themes[theme].mainText
            square.style.borderColor = themes[theme].header
        }
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

const settingsIcon = document.querySelector('.settings-icon')

settingsIcon.addEventListener('click', expandSettingsMenu)
body.addEventListener('click', expandDropdown)
body.addEventListener('click', setTheme)

// setTheme(theme)
