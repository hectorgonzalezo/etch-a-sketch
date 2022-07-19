const sketchContainer = document.querySelector('.sketch-container')
const grayscaleButton = document.querySelector("#grayscale-button")
const rainbowButton = document.querySelector('#rainbow-button')
const sizeSlider = document.querySelector('#size-slider')
const sizeDisplay = document.querySelector('#size-display')

//size of each side of the sketch
const initialSize = 16;
let pixels
let size
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
function addPixelGrayscaleChange(pixels = pixels) {
    pixels.forEach((pixel, i) => pixel.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = 'white';

    }))
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
        }
    }))
}

function removeListeners(pixels=pixels, func) {
    pixels.forEach(pixel => pixel.removeEventListener('mouseover', func))
}

function removePixels() {
    pixels.forEach(pixel => sketchContainer.removeChild(pixel));
};

generatePixels()



function restartGrid() {
    removePixels();
    generatePixels(sizeSlider.value);
    sizeDisplay.innerText = sizeSlider.value;
}

//change size of grid using slider
sizeSlider.addEventListener('input', (e) => restartGrid())


grayscaleButton.addEventListener('click', () => {
    removePixels()
    generatePixels(size)
    addPixelGrayscaleChange(pixels)
    grayscaleButton.style.backgroundColor = 'rgb(233, 130, 130)';
    rainbowButton.style.backgroundColor = 'rgb(207, 214, 127)';
})
rainbowButton.addEventListener('click', () => {
    removePixels()
    generatePixels(size);
    addPixelColorChange(pixels)
    rainbowButton.style.backgroundColor = 'rgb(233, 130, 130)';
    grayscaleButton.style.backgroundColor = 'rgb(207, 214, 127)';
})
