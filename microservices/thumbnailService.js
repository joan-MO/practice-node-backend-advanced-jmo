'use strict';

const cote = require('cote');
var Jimp = require('jimp');

const responder = new cote.Responder({ name: 'service thumbnail'});

responder.on('thumbnail', (req, done) => {
  const {file} = req;

  const resultado = Jimp.read(file.path)
  .then(image => {
    return image
      .resize(100, 100) // resize
      .quality(100) // set JPEG quality
      .write(file.path); // save
  })
  .catch(err => {
    console.error(err);
  });
  
  done(resultado);
});
