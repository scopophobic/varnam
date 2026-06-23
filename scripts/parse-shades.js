/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const sourcePath = '/Users/scopo/.gemini/antigravity-cli/brain/41f5e377-418a-4bea-bb1a-9160afb7b2d0/.system_generated/steps/336/content.md';
const destPath = path.join(__dirname, '../public/data/asianpaints-shades.json');

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  // The JSON content starts on line 5, after the '---' marker
  const jsonStartIdx = content.indexOf('{"success"');
  if (jsonStartIdx === -1) {
    console.error('Could not find start of JSON in source file.');
    process.exit(1);
  }
  
  const rawJsonStr = content.substring(jsonStartIdx);
  const data = JSON.parse(rawJsonStr);
  
  if (!data.success || !Array.isArray(data.shade)) {
    console.error('Invalid JSON structure:', data);
    process.exit(1);
  }
  
  console.log(`Successfully parsed ${data.shade.length} raw shades.`);
  
  // Clean up and format the shades
  const cleanedShades = data.shade.map((s, idx) => {
    // Capitalize first letter of name
    const capitalize = (str) => str ? str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';
    
    return {
      id: `apc_${s.entityCode}`,
      code: s.entityCode,
      name: capitalize(s.entityName),
      family: s.shadeFamily ? s.shadeFamily.toLowerCase() : 'other',
      hex: s.shadeHexCode || '#FFFFFF',
      popularity: parseInt(s.popularity) || (idx + 1)
    };
  });
  
  // Ensure the directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.writeFileSync(destPath, JSON.stringify(cleanedShades, null, 2), 'utf8');
  console.log(`Successfully wrote ${cleanedShades.length} cleaned shades to ${destPath}`);
} catch (err) {
  console.error('Error parsing shades:', err);
  process.exit(1);
}
