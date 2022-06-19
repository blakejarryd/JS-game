computerTurn = () => {
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
    checkForWin() 
    checkForDraw()
    if (result === true) {
         endGame()
    }   
}

// takeTurn = (event) => {
//     let square = event.target
//     //if game is over return
//     if (result === true) {
//         return
//     }
//     //if square already used return
//     if (square.innerText != "") {
//         return
//     }
//     // if (turn % 2 === 0) {
//     //    
//     // } else {
//     //     addO(square)
//     // }
//     addX(square)
//     checkForWin() 
//     checkForDraw()
//     if (result === true) {
//         endGame()
//     }   
// }