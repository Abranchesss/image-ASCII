

// getting the "uploaded" file
var imgTempPath = '';
document.getElementById('img-path').onchange = function (evt) {
    console.log(URL.createObjectURL(document.getElementById("img-path").files[0]));
    imgTempPath = URL.createObjectURL(document.getElementById("img-path").files[0]);
}




function GenerateTheImage(){
    resetDefault();

    density = document.getElementById('ascii-shader').value;
    lettersRes = parseInt(document.getElementById('letters-size').value);
    brightnesss = parseFloat(document.getElementById('brightness').value);
    whiteCutoff = parseInt(document.getElementById('white-cutoff').value);    

    // getting which radio button is checked
    let radio1 = document.getElementById('radio1');
    if(radio1.checked)
        letterResAvgMode = 1;
    else
        letterResAvgMode = 2;

    // getting if opacity is checked
    let opacityCheck = document.getElementById('opacity');
    if(opacityCheck.checked)
        opacity = true;
    else
        opacity = false;

    // Checks the "uploaded file"
    if(imgTempPath != null && imgTempPath != '')
        imgPath = imgTempPath;
    
    pic = loadImage(imgPath, () => CreateTheImage());
}


function resetDefault(){
    density = "Ñ@#W$9876543210?!abc;:+=-,._ "; 
    lettersRes = 5;
    letterResAvgMode = 2;   
    opacity = true;       
    brightnesss = 1; 
    whiteCutoff = 0;
    imgPath = '88-884570_photo-wallpaper-white-look-face-wolf-portrait-white.jpg';
}