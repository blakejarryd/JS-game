//You can update the html stylesheet reference. Going to use this for themes!
    // let x = document.querySelector('link')
    // x.href = 'style2.css'
    // console.log(x)

let theme = 'nativeNight'

const themes = {
    nativeNight: {
        background: 'black',
        header: 'lightblue',
        headerText: 'black',
        homeIcon: 'img/Home-icon.png',
        settingsIcon: 'img/Settings-icon.png',
        mainText: 'white',
        restartIcon: 'img/Restart-icon-white.png',
    },
    brightWhite: {
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
    console.log(settingsMenu)
}
    
setTheme = (theme) => {
    body.style.background = themes[theme].background
    header.style.background = themes[theme].header
    boardOverlay.style.outlineColor = themes[theme].background
    let squares = document.querySelectorAll('.square')
    for (let square of squares) {
        square.style.color = themes[theme].mainText
        square.style.borderColor = themes[theme].header
    }
}
    

const settingsIcon = document.querySelector('.settings')

settingsIcon.addEventListener('click', expandSettingsMenu)

setTheme(theme)
