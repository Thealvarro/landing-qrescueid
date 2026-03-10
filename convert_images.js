const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = './img';
const files = fs.readdirSync(imgDir);

async function convertImages() {
    console.log('Starting image conversion...');
    
    for (const file of files) {
        const filePath = path.join(imgDir, file);
        const ext = path.extname(file).toLowerCase();
        
        // Skip non-image files and already optimized webp files (to avoid re-converting unless necessary)
        // Actually, we want to re-optimize everything IF the user says they are slow.
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const fileName = path.basename(file, ext);
            // Check if it's already one of our converted files to avoid infinite loops if re-running
            if (fileName.endsWith('_optimized')) continue;

            const outputPath = path.join(imgDir, `${fileName}_optimized.webp`);
            
            try {
                const info = await sharp(filePath)
                    .webp({ quality: 75, effort: 6 }) // Quality 75 is usually a sweet spot for WebP
                    .toFile(outputPath);
                
                const statsOriginal = fs.statSync(filePath);
                const reduction = ((statsOriginal.size - info.size) / statsOriginal.size * 100).toFixed(2);
                
                console.log(`Converted ${file}: ${statsOriginal.size} -> ${info.size} (${reduction}% reduction)`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    console.log('Conversion finished.');
}

convertImages();
