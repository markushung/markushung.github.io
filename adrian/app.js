const tileDisplay = document.querySelector('.tile-container')
const keyboardRow1 = document.querySelector('.row1-container')
const keyboardRow2 = document.querySelector('.row2-container')
const keyboardRow3 = document.querySelector('.row3-container')
const messageDisplay = document.querySelector('.message-container')


const wordle = 'HAPPY'
/*const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
              'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
              'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']*/

const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
const keys = [row1, row2, row3]

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
]
let currentRow = 0
let currentTile = 0
let isGameOver = false


guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' +guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})


row1.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow1.append(buttonElement)
})

row2.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow2.append(buttonElement)
})

row3.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow3.append(buttonElement)
})


const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '⌫') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
    console.log('guessRows', guessRows)
}

const addLetter =  (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile >0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if(currentTile > 4) {
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile()
        if (wordle == guess) {
            showMessage('Happy Birthday Adrian!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 400 * index)
    })
}