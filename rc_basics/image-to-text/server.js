const express = require('express');
const app = express();
const { Image } = require('image-js');
const Tesseract = require('tesseract.js');


// app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.json);
app.set('view-engine', 'ejs');



async function processImage() {
  try {
    let image = await Image.load('');
    let greyImage = image.grey();
    await greyImage.save('greyscale-image.png');

    Tesseract.recognize(
      'greyscale-image.png',
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('Extracted Text:', text);
    }).catch(error => {
      console.error('Error during OCR:', error);
    });
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();


app.get('/', (req, res) => {
  res.render('index.ejs', { quotes: {} });
});


app.listen(
  8000,
  () => console.log('Server is Listening on port 8000...')
);
