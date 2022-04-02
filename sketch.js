const canvasContainer = document.getElementById('canvas-container');

var pic;
var canvasWidth;
var canvasHeight;

// ***************************** CHANGE YOUR OPTIONS HERE ****************************

// var density = "█▓▒░:.  "; //Shader ASCII
var density = "Ñ@#W$9876543210?!abc;:+=-,._ "; //Shader ASCII

var lettersRes = 5;         // Increase the letters size
var letterResAvgMode = 2;   // Chooses the mode to cutoff some pixels: (only works lettersRes > 1) 
                              //    1 => ignores neighbour pixels;
                              //    2 => average neighbour pixels;
var opacity = true;        // Make letters have opacity or not
var brightnesss = 1;         // 1 => default
var whiteCutoff = 0;        // 0 => default (higher, less white areas) (must be > 0)

var imgPath = '88-884570_photo-wallpaper-white-look-face-wolf-portrait-white.jpg';

// ***********************************************************************************

function preload(){
  pic = loadImage(imgPath);
}

function setup(){
  // Get the canvas heigh and width to contain the image
  var canvas = createCanvas(50, 50);
  canvas.parent('canvas-container');
  CreateTheImage();
}

function CreateTheImage(){
  GetCanvasHeightNWidth();
  resizeCanvas(canvasWidth, canvasHeight, true);
  
  if (whiteCutoff > 0)
    for (let a = 0; a < whiteCutoff; a++)
      density += ' ';


  pic.loadPixels();

  let w = width / pic.width;
  let h = height / pic.height;

  for (let i = 0; i < pic.height - lettersRes + 1; i += lettersRes) {
    for (let j = 0; j < pic.width - lettersRes + 1; j += lettersRes) {
      if (letterResAvgMode == 1 || lettersRes == 1) {
        // Make the average of the single pixel:
        var values = Array(3);
        const pixelIndex = (j + i * pic.width) * 4;
        values[0] = pic.pixels[pixelIndex + 0];
        values[1] = pic.pixels[pixelIndex + 1];
        values[2] = pic.pixels[pixelIndex + 2];

      } else if (letterResAvgMode == 2) {
        //Make the average of all neighbour pixels here:
        var values = Array(3 * lettersRes * lettersRes);
        let count = 0;
        for (let m = 0; m < lettersRes; m++) {
          for (let n = 0; n < lettersRes; n++) {
            const pixelIndex = ((j + n) + (i + m) * pic.width) * 4;
            values[count + 0] = pic.pixels[pixelIndex + 0];
            values[count + 1] = pic.pixels[pixelIndex + 1];
            values[count + 2] = pic.pixels[pixelIndex + 2];
            count += 3;
          }
        }
      }

      const avg = GetArrayAverage(values);
      noStroke();

        
      if (opacity){
        let color = 'rgba(255,255,255,'+map(constrain(avg * brightnesss, 0, 255), 0, 255, 0, 1)+')';
        fill(color);
      }
      else 
        fill(255 * brightnesss);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      textSize(w * lettersRes);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), j * h + h * .5, i * w + w * .5);
    }
  }

}

function GetCanvasHeightNWidth() {
  // Will set the canvas to be contained in the div
  // Won't let the div crop any part of it
  let windowAR = canvasContainer.clientWidth / canvasContainer.clientHeight;
  let picAR = pic.width / pic.height;

  if (windowAR > picAR) {
    canvasHeight = canvasContainer.clientHeight;
    canvasWidth = floor(pic.width * canvasContainer.clientHeight / pic.height);
  } else {
    canvasWidth = canvasContainer.clientWidth;
    canvasHeight = floor(pic.height * canvasContainer.clientWidth / pic.width);
  }
}

function GetArrayAverage(array) {
  let sum = 0;
  for (let k = 0; k < array.length; k++) {
    sum += array[k];
  }
  return sum / array.length;
}