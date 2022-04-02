// const density = "█▓▒░:.  ";
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
//Shader ASCII

var pic;
var canvasWidth;
var canvasHeight;

const lettersRes = 5;
const opacity = false;
const brightness = 1; // 1=>default

function preload(){
  pic = loadImage("pics/88-884570_photo-wallpaper-white-look-face-wolf-portrait-white.jpg")
}

function setup(){
  GetCanvasHeightNWidth();
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  //image(pic, 0, 0, width, height);

  let w = width / pic.width;
  let h = height / pic.height;
  pic.loadPixels();

  for(let i = 0; i < pic.height - lettersRes + 1; i+=lettersRes){
    for(let j = 0; j < pic.width - lettersRes + 1; j+=lettersRes){

      // let pixelIndex = (j + i * pic.width) * 4;

      // let values = Array(3);
      // values[0] = pic.pixels[pixelIndex + 0];
      // values[1] = pic.pixels[pixelIndex + 1];
      // values[2] = pic.pixels[pixelIndex + 2];


      let values = Array(3*lettersRes*lettersRes);
      let count = 0;
      for(let m = 0; m < lettersRes; m++){
        for(let n = 0; n < lettersRes; n++){
          const pixelIndex = ((j+n) + (i+m) * pic.width) * 4;
          values[count+0] = pic.pixels[pixelIndex + 0];
          values[count+1] = pic.pixels[pixelIndex + 1];
          values[count+2] = pic.pixels[pixelIndex + 2];
          count+=3;
        }
      }
      console.log(values);



      const avg = GetArrayMedia(values);
      noStroke();

      if(opacity) fill(avg * brightness);
      else fill(255 * brightness);

      const len = density.length;
      const charIndex = floor(map(avg,0,255,len,0));

      textSize(w * lettersRes);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), j * h + h * 0.5, i * w + w * 0.5);
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

function GetArrayMedia(array){
  let sum = 0;
  for(let k = 0; k < array.length; k++){
    sum += array[k];
  }
  return sum/array.length;
}