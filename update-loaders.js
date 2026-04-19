const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/components.json', 'utf8'));

data.forEach(comp => {
  if (comp.id.startsWith('loader-')) {
    // Replace spin-X with spin
    comp.css = comp.css.replace(/animation: spin-\d+ 1s linear infinite;/, 'animation: spin 1s linear infinite;');
    comp.css = comp.css.replace(/@keyframes spin-\d+/, '@keyframes spin');
  }
});

fs.writeFileSync('data/components.json', JSON.stringify(data, null, 2));
console.log('Loaders updated.');
