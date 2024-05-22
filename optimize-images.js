const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/images';
const outputDir = './src/images/output';

fs.readdirSync(inputDir).forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace(/\.(jpe?g|png)$/, '.webp');
    const outputPath = path.join(outputDir, outputName);

    sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log(info);
            }
        });
});