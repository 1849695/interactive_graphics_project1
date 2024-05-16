// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.


function composite(bgImg, fgImg, fgOpac, fgPos) {
    // Dimensions of bgImg
    const bgWidth = bgImg.width;
    const bgHeight = bgImg.height;

    // Dimensions of fgImg
    const fgWidth = fgImg.width;
    const fgHeight = fgImg.height;

    // Compute the limits of the area where the image overlap occurs to make the iterations on the pixels 
    const startX = Math.max(0, fgPos.x);
    const startY = Math.max(0, fgPos.y);
    const endX = Math.min(bgWidth, fgPos.x + fgWidth);
    const endY = Math.min(bgHeight, fgPos.y + fgHeight);

    // Iterations on the pixels 
    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            // compute the pixel indices in the image data array
            const bgIndex = (y * bgWidth + x) * 4; // 4 --> RBGA
            const fgX = x - fgPos.x;
            const fgY = y - fgPos.y;
            const fgIndex = (fgY * fgWidth + fgX) * 4;

            // Calculate the composite color
            const fgAlpha = fgImg.data[fgIndex + 3] / 255 * fgOpac;
            const bgAlpha = 1 - fgAlpha;
            const compositeColor = {
                r: Math.round(fgImg.data[fgIndex] * fgAlpha + bgImg.data[bgIndex] * bgAlpha),
                g: Math.round(fgImg.data[fgIndex + 1] * fgAlpha + bgImg.data[bgIndex + 1] * bgAlpha),
                b: Math.round(fgImg.data[fgIndex + 2] * fgAlpha + bgImg.data[bgIndex + 2] * bgAlpha),
                a: bgImg.data[bgIndex + 3] // Preserves the opacity of the bgImg
            };

            // Change the bgImg to composite color
            bgImg.data[bgIndex] = compositeColor.r;
            bgImg.data[bgIndex + 1] = compositeColor.g;
            bgImg.data[bgIndex + 2] = compositeColor.b;
            bgImg.data[bgIndex + 3] = compositeColor.a;
        }
    }
}


