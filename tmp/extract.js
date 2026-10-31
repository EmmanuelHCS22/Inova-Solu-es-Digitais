const fs = require('fs');
const code = fs.readFileSync('/tmp/replit_bundle.js', 'utf8');

// Find image assets
const imgRegex = /["']([^"']+\.(png|jpg|jpeg|svg|webp))["']/gi;
let m;
const imgs = new Set();
while ((m = imgRegex.exec(code)) !== null) {
  imgs.add(m[1]);
}
console.log('Images in bundle:', Array.from(imgs));

// Find phone and instagram
const phones = new Set(code.match(/55[0-9]{10,12}/g) || []);
console.log('Phones:', Array.from(phones));

// Find logo svg or path
const svgs = code.match(/<svg[^>]*>.*?<\/svg>/gs) || [];
console.log('Inline SVGs count:', svgs.length);
if (svgs.length > 0) {
  console.log('First SVG sample:', svgs[0].substring(0, 200));
}

// Find text mentioning Uberlandia or Instagram
const texts = code.match(/Uberl[âa]ndia[^"']*/gi) || [];
console.log('Uberlandia mentions:', Array.from(new Set(texts)));

const igLinks = code.match(/https?:\/\/[^\s"']+instagram[^\s"']*/gi) || [];
console.log('Instagram links:', Array.from(new Set(igLinks)));
