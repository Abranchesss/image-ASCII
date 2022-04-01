const aasdasdad = '         .:░▒▓█';
const density = 'Ñ@#W$9876543210?!abc;:+=-,._';
//Shader ASCII

let pic;

function preload(){
  pic = loadImage("pics/even-lower-res.png")
}

function setup(){
  createCanvas(1800, 1800);
}

function draw(){
  background(0);
  //image(pic, 0, 0, width, height);

  let w = width / pic.width;
  let h = height / pic.height;
  pic.loadPixels();
  for(let i = 0; i < pic.width; i++){
    for(let j = 0; j < pic.width; j++){
      const pixelIndex = (i + j * pic.width) * 4;
      const r = pic.pixels[pixelIndex + 0];
      const g = pic.pixels[pixelIndex + 1];
      const b = pic.pixels[pixelIndex + 2];

      const avg = (r+g+b)/3;


      noStroke();
      // fill(avg); // Here you can add opacity as well
      fill(255);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      // square(i*w, j*h, w);
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * .5, j * h + h * .5);
    }
  }
}