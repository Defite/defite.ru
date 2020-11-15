const path = require("path");
const sharp = require("sharp");
const deasync = require("deasync");
const jsonfile = require("jsonfile");

const imagesDir = "uploads";

// Asset shortcode for saving hashed assets
const saveAsset = require("./asset"),
  { hashContent } = saveAsset;

// Sizes for responsive image in intervals of 160 i.e. 160, 320, ..., 1920
// Made it `let`, because some images don't need bigger sizes
let SIZES = Array.from(new Array(12), (_, index) => (index + 1) * 160);

// File to save responsive image cache
const CACHE_FILE = path.join(process.cwd(), ".images.cache");

// Quality of outputted images
const QUALITY = 75;

// Function to deasync sharp functions
// This is required for synchronous markdown-it plugin
function deasyncSharp(image, sharpFunction) {
  let result;

  // Call function with callback
  image[sharpFunction].bind(image)((error, data) => {
    if (error) throw error;
    result = data;
  });

  // Loop while the result is undefined
  deasync.loopWhile(() => result === undefined);
  return result;
}

// Get image path from src
function getImagePath(src) {
  const index = src.indexOf(imagesDir);
  const position = index >= 0 ? index + imagesDir.length : 0;
  const imageFilename = src.substring(position);
  return path.join(process.cwd(), imagesDir, imageFilename);
}

// Load cache from file or create new cache
function loadCache() {
  try {
    return jsonfile.readFileSync(CACHE_FILE);
  } catch {
    return {};
  }
}

// Save image as the given size and format
function saveImageFormat(image, width, format) {
  // Resize image and format with given quality
  const formatted = image.clone().resize(width)[format]({
    quality: QUALITY,
  });

  // Save buffer of formatted image
  const buffer = deasyncSharp(formatted, "toBuffer");
  return saveAsset(buffer, format);
}

// Get the average color from an image
function getAverageColor(image) {
  // Resize to one pixel and get raw buffer
  const buffer = deasyncSharp(image.clone().resize(1).raw(), "toBuffer");
  // Convert values to percentages
  const values = [...buffer].map(
    (value) => `${((value * 100) / 255).toFixed(0)}%`
  );
  // Output rgb or rgba color
  return `${values.length < 4 ? "rgb" : "rgba"}(${values.join(",")})`;
}

module.exports = function ({
  src,
  alt,
  // sizes = "(min-width: 1280px) 1152px",
  loading = "lazy",
  width: pictureWidth,
  height: pictureHeight,
  static,
  className = "",
}) {
  if (alt === undefined)
    throw new Error("Images should always have an alt tag");

  const imagePath = getImagePath(src);

  // Original image in sharp
  const original = sharp(imagePath);

  // Hash the original image
  const imageHash = hashContent(deasyncSharp(original, "toBuffer"));

  // Load cache of resized images
  const cache = loadCache();
  const cachePicture = cache.hasOwnProperty(imageHash) && cache[imageHash];

  // Get metadata from original image
  const { format, height, width } = deasyncSharp(original, "metadata");

  // Average color used for background while image loads
  const color = getAverageColor(original);

  // It's tricky. If image has `static` attribute,
  // we need generate two versions - 1x and 2x (may be 3x too)
  if (static && pictureWidth) {
    SIZES = [pictureWidth, pictureWidth * 2];
  }

  /**
   * Generate responsive images
   * @param {string} type - same format or webp
   */
  const generateImages = (type) => {
    const imageFormat = type === "webp" ? "webp" : format;
    return SIZES.reduce((images, width) => {
      images[width] =
        cachePicture && cachePicture[type].hasOwnProperty(width)
          ? cachePicture[type][width]
          : saveImageFormat(original, width, imageFormat);
      return images;
    }, {});
  };

  /**
   * Construct image srcset
   */
  const imageSrcset = (type) => {
    const images = generateImages(type);

    return SIZES.map((size) => {
      return `${images[size]} ${size}w`;
    });
  };

  // Use largest same format image as fallback
  const fallback = generateImages("same")[SIZES[SIZES.length - 1]];

  // Aspect ratio for padding-bottom
  const ratio = Math.round((height * 100000) / width) / 1000;

  // Responsive picture with srcset and native lazy loading
  const picture = `
    <picture style="background-color:${color};padding-bottom:${ratio}%">
      <source srcset="${imageSrcset("webp").join(",")}" type="image/webp">
      <source srcset="${imageSrcset("same").join(",")}" type="image/${format}">
      <img class="${className}" src="${fallback}" alt="${alt}" loading="${loading}" width="${pictureWidth}" height="${pictureHeight}">
    </picture>
  `;

  // Add picture to cache
  cache[imageHash] = {
    same: generateImages("same"),
    webp: generateImages("webp"),
  };

  // Save cache file
  jsonfile.writeFileSync(CACHE_FILE, cache, { spaces: 2 });

  return picture;
};
