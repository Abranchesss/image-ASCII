// const density = "█▓▒░:.  ";
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
//Shader ASCII

var pic;
var canvasWidth;
var canvasHeight;

function preload(){
  pic = loadImage("pics/even-lower-res.png")
}

function setup(){
  GetCanvasHeightNWidth();
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  //image(pic, 0, 0, width, height);

  let w = width / pic.width;
  let h = height / pic.height;
  pic.loadPixels();
  for(let i = 0; i < pic.height; i++){
    for(let j = 0; j < pic.width; j++){
      const pixelIndex = (i + j * pic.width) * 4;
      const r = pic.pixels[pixelIndex + 0];
      const g = pic.pixels[pixelIndex + 1];
      const b = pic.pixels[pixelIndex + 2];

      const avg = (r+g+b)/3;


      noStroke();
      // fill(avg);
      fill(255);

      const len = density.length;
      const charIndex = floor(map(avg,0,255,len,0));

      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}

function GetCanvasHeightNWidth(){
  let windowAR = window.innerWidth/window.innerHeight;
  let picAR = pic.width/pic.height;

  console.log(windowAR);
  console.log(picAR);

  if(windowAR > picAR){
    canvasHeight = window.innerHeight;
    canvasWidth = pic.width * window.innerHeight/pic.height;
  }
}