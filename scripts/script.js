const sketchContainer = document.querySelector('.sketch-container')

//size of each side of the sketch
const size = 16;

//create a size*size array of pixels 
for (let i =0; i < (size * size); i++) {
    const pixel = document.createElement('div')
    sketchContainer.appendChild(pixel)
    pixel.classList.add('pixel')
    //make the size of each pixel enough to fit the container div size
    pixel.style.cssText = `
    flex-basis: ${100/size}%;
    height: ${100/size}%;
    width: ${100/size}%;`
    
}

const pixels = document.querySelectorAll('.pixels')