const sketchContainer = document.querySelector('.sketch-container')
const restartButton = document.querySelector('#restart-button')

//size of each side of the sketch
const initialSize = 16;
let pixels
let pixelsBrightness //used to incrementally change the color to black


//returns a random rgb color, with opacity to fade it to black
function randomRGB() {
    let valueR = Math.floor(Math.random() * 127);
    let valueG = Math.floor(Math.random() * 127);
    let valueB = Math.floor(Math.random() * 127);
    return `rgba(${valueR}, ${valueG}, ${valueB})`
}

//create a size*size array of pixels 
function generatePixels(size = initialSize) {
    pixelsBrightness = []
    for (let i = 0; i < (size * size); i++) {
        const pixel = document.createElement('div')
        sketchContainer.appendChild(pixel)
        pixel.classList.add('pixel')
        //make the size of each pixel enough to fit the container div size
        pixel.style.cssText = `
    flex-basis: ${100 / size}%;
    height: ${100 / size}%;
    width: ${100 / size}%;`;

        pixelsBrightness.push(0);//restart brightness array to 100. 
    };

    pixels = document.querySelectorAll('.pixel');
    addPixelColorChange(pixels)
};

//change color when hovering over pixels
function addPixelColorChange(pixels = pixels) {
    pixels.forEach((pixel, i) => pixel.addEventListener('mouseover', (event) => {
        if (pixelsBrightness[i] == 0) { //if button is color for the first time
            event.target.style.backgroundColor = randomRGB();
            event.target.style.filter = `brightness(100%)`;
            pixelsBrightness[i] = 100;
        } else {
            //remove 10% brightness
            pixelsBrightness[i] -= 10;
            event.target.style.filter = `brightness(${pixelsBrightness[i]}%)`
            console.log(event.target.style.filter)
        }
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
