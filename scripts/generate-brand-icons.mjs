// Regenerates the app-dir icons from the brand mark:
//   src/app/favicon.ico    (PNG-in-ICO, 16/32/48/256)
//   src/app/icon.png       (256x256)
//   src/app/apple-icon.png (180x180)
// Uses sharp, which ships with Next. Run: node scripts/generate-brand-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SOURCE = "public/brand/launchpad-hq-512.png";
const ICO_SIZES = [16, 32, 48, 256];

const source = readFileSync(SOURCE);
const png = (size) =>
  sharp(source).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer();

/** ICONDIR + one ICONDIRENTRY per image, each image stored as PNG. */
function buildIco(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e); // 0 means 256
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2); // palette colors
    header.writeUInt8(0, e + 3); // reserved
    header.writeUInt16LE(1, e + 4); // color planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((img) => img.data)]);
}

const images = [];
for (const size of ICO_SIZES) images.push({ size, data: await png(size) });
writeFileSync("src/app/favicon.ico", buildIco(images));
writeFileSync("src/app/icon.png", await png(256));
writeFileSync("src/app/apple-icon.png", await png(180));
console.log("Wrote src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png");
