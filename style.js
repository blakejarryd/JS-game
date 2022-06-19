//You can update the html stylesheet reference. Going to use this for themes!
    // let x = document.querySelector('link')
    // x.href = 'style2.css'
    // console.log(x)

expandSettingsMenu = () => {
    let settingsMenu = document.querySelector('.settings-menu')
    settingsMenu.classList.toggle('settings-show')
    console.log(settingsMenu)
}

const settingsIcon = document.querySelector('.settings')

settingsIcon.addEventListener('click', expandSettingsMenu)
