const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

//Paths are relative to the location where the command is run.
imagemin(['build/_images/*.{jpg,png}'], 'build/uploads', {
    plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: '55-75' })
    ]
}).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});