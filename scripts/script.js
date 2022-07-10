const sketchContainer = document.querySelector('.sketch-container')

//size of each side of the sketch
const initialSize = 16;

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

    }
}

generatePixels()

const pixels = document.querySelectorAll('.pixel')

//change color when hovering over pixels
pixels.forEach(pixel => pixel.addEventListener('mouseover', (event) => {
    console.log(event.target.style.backgroundColor='white')
}))