const fs = require('fs');

const newContent = fs.readFileSync('new_section.tsx', 'utf8');

let content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');
let start = -1;
let end = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const AITradingSection = () => {')) {
    start = i;
  }
  if (start !== -1 && lines[i].includes('const PlatformShowcase = () => {')) {
    end = i - 1;
    break;
  }
}

if (start !== -1 && end !== -1) {
  while(lines[end].trim() === '') end--;
  const newLines = [...lines.slice(0, start), newContent, ...lines.slice(end + 1)];
  fs.writeFileSync('app/page.tsx', newLines.join('\n'));
  console.log('Replaced successfully');
} else {
  console.log('Could not find bounds: start=' + start + ' end=' + end);
}
