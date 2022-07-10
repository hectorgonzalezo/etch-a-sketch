const sketchContainer = document.querySelector('.sketch-container')
const restartButton = document.querySelector('#restart-button')

//size of each side of the sketch
const initialSize = 16;
let pixels

//create a size*size array of pixels 
function generatePixels(size = initialSize) {
    for (let i = 0; i < (size * size); i++) {
        const pixel = document.createElement('div')
        sketchContainer.appendChild(pixel)
        pixel.classList.add('pixel')
        //make the size of each pixel enough to fit the container div size
        pixel.style.cssText = `
    flex-basis: ${100 / size}%;
    height: ${100 / size}%;
    width: ${100 / size}%;`

    };

    pixels = document.querySelectorAll('.pixel');
    addPixelColorChange(pixels)
};

//change color when hovering over pixels
function addPixelColorChange(pixels = pixels) {
    pixels.forEach(pixel => pixel.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = 'white'
    }))
}

function removePixels() {
    pixels.forEach(pixel => sketchContainer.removeChild(pixel));
};

generatePixels()




function restartGrid() {
    let size = prompt(
        "Please indicate the number of squares per side you want:\r" +
        "(The maximum number is 64)");
    size = parseInt(size);
    if (Number.isNaN(size)) return;//exit loop if cancel button is pressed on prompt
    //If input is wrong, ask again
    while (!Number.isInteger(size) || size > 64 || size < 1) {
        size = prompt("Wrong! Write a number between 1 and 64.");
        size = parseInt(size);
        if (Number.isNaN(size)) break;//exit loop if cancel button is pressed on prompt
        console.log(size)
    };
    if (Number.isNaN(size)) return;//exit loop if cancel button is pressed on prompt

    removePixels()
    generatePixels(size)
}


restartButton.addEventListener('click', () => restartGrid())
