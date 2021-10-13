// This Script will calculate the amount of ``blackness`` in images before printing, to save ink. (By Benlamine Abdelmourhit {B.A})
function averageColor(imageElement) { 
            // Create the canvas element 
            var canvas = document.createElement('canvas'), 
                // Get the 2D context of the canvas 
                context = canvas.getContext && canvas.getContext('2d'), 
                imgData, width, height, length, 
                // Define variables for storing the individual red, blue and green colors 
                RGB = { r: 0, g: 0, b: 0 }, 
                // Define variable for the total number of colors 
                count = 0; 
            // Set the height and width equal to that of the canvas and the image 
            height = canvas.height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.height; 
            width = canvas.width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;
            // Check if the canvas support the filter property. {B.A}
            if ("filter" in CanvasRenderingContext2D.prototype) {
            // Make the canvas in grayscale to calculate the average toward black. {B.A}
            context.filter = 'grayscale(1)';
            } else {
                console.log('Filter property in the canvas, not supported !');
                // Reassign the properties of the Object RGB, for later processing. {B.A}
                return RGB = { r: 'uncalculated', g: 'uncalculated', b: 'uncalculated' };
            }
            // Draw the image to the canvas
            context.drawImage(imageElement, 0, 0);
             try {
            // Get the data of the image 
            imgData = context.getImageData( 0, 0, width, height); 
             } catch(e) {
            // catch errors - usually due to cross domain security issues
                 console.log(e);
                 // When the cross-origin error happens. {B.A}
                 console.log('cross-origin ERROR !');
                 return RGB = { r: 'uncalculated', g: 'uncalculated', b: 'uncalculated' };
            }
            // Get the length of image data object 
            length = imgData.data.length; 
            for (var i = 0; i < length; i += 4) { 
                // Sum all values of red colour 
                RGB.r += imgData.data[i]; 
                // Sum all values of green colour 
                RGB.g += imgData.data[i + 1]; 
                // Sum all values of blue colour 
                RGB.b += imgData.data[i + 2]; 
                // Increment the total number of values of RGB colours 
                count++; 
            } 
            // Find the average of red 
            RGB.r = Math.floor(RGB.r / count); 
            // Find the average of green 
            RGB.g = Math.floor(RGB.g / count); 
            // Find the average of blue 
            RGB.b = Math.floor(RGB.b / count); 
            return RGB; 
        }
var images =  document.images, imagesCount = images.length;
// Create a function for use in Event Listener. {B.A}
function prepareImageForPrinting() {
// Check if there is at least one image in the document that will be printed. {B.A}
if (imagesCount == 0) {
    console.log('There is no image in the Document !');
    window.print(); return false;
} else {
// Check if the filter CSS3 property is supported. {B.A}
if ("-webkit-filter" in document.body.style || "filter" in document.body.style) {
var askBefore = imagesCount > 1 ? confirm('Do you want to print the images in colors ?') : confirm('Do you want to print the image in colors ?');
for (var j = 0; j < imagesCount; j++) {
if (!askBefore) {
    var RGBaverage = averageColor(images[j]), n = parseInt(j + 1);
    // Inspect the image in question. {B.A}
    console.log(images[j]);
     console.log('The average RGB in grayscale for the image number ' + n + ' is : ');
     console.log(RGBaverage);
// We need to agree about the acceptable RGB average value of dark images in grayscale. {B.A}
if (RGBaverage.r <= 100 && RGBaverage.g <= 100 && RGBaverage.b <= 100) {
console.log('The image number ' + n + ' is too black for printing !');
images[j].style.webkitFilter = "grayscale(100%) invert(100%)";
images[j].style.filter = "grayscale(100%) invert(100%)";
console.log('Filter applied to the image number ' + n + ', to make it less black !');
    } else if (RGBaverage.r == 'uncalculated' && RGBaverage.g == 'uncalculated' && RGBaverage.b == 'uncalculated') {
        console.log('There was an error and the image number ' + n + ' will be printed in grayscale anyway !');
        images[j].style.webkitFilter = "grayscale(100%)";
        images[j].style.filter = "grayscale(100%)";
    } else {
        console.log('The image number ' + n + ' is OK for printing !');
        images[j].style.webkitFilter = "grayscale(100%)";
        images[j].style.filter = "grayscale(100%)";
    }
} else {
    images[j].style.webkitFilter = "none";
    images[j].style.filter = "none";
    console.log('Filter removed !');
}
}
} else {
    console.log('Filter not supported !');
}
window.print(); return false;
 }
}