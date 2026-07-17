const fs = require('fs');
const path = require('path');

const filePath = 'src/pages/project-ux/application-bibliotheque-de-bordeaux.astro';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add max-sm:text-center to all <div class="subsection-summary ...">
content = content.replace(
  /<div class="subsection-summary (max-w-\[1400px\] mx-auto px-6 md:px-16 [^"]*)"/g,
  '<div class="subsection-summary $1 max-sm:text-center"'
);

// 2. Add max-sm:text-center to all <h3> inside subsection-summary
content = content.replace(
  /(<h3 class="font-\['Lora',serif\] text-\[2rem\] md:text-\[2\.5rem\] font-bold text-\[#297473\][^"]*")/g,
  '$1 max-sm:w-full'
);

// 3. Add max-sm:text-center to all subsection-content divs + items-center
content = content.replace(
  /<div class="subsection-content (max-w-\[1400px\] mx-auto px-6 md:px-16)"/g,
  '<div class="subsection-content $1 max-sm:text-center"'
);

// 4. Add max-sm:items-center to section headers for flex alignment
content = content.replace(
  /(<section class="w-full[^"]*subsection"[^>]*>)\s*\n\s*<div class="subsection-summary/g,
  '<section class="w-full py-16 md:py-24 subsection max-sm:text-center" id=PLACEHOLDER>\n    <div class="subsection-summary'
);

// Actually, let me do simpler targeted fixes instead of the complex regex above

// Re-read fresh
content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Add max-sm:text-center to all section headers (subsection-summary divs)
content = content.replace(
  /class="subsection-summary max-w-/g,
  'class="subsection-summary max-sm:text-center max-w-'
);

// Fix 2: Add max-sm:items-center to all h3 titles  
content = content.replace(
  /<h3 class="font-\['Lora',serif\] text-\[2rem\] md:text-\[2\.5rem\] font-bold text-\[#297473\] max-sm:text-\[1\.5rem\]">/g,
  '<h3 class="font-[\'Lora\',serif] text-[2rem] md:text-[2.5rem] font-bold text-[#297473] max-sm:text-[1.5rem] max-sm:w-full">'
);

// Fix 3: Add max-sm:text-center to subsection-content containers  
content = content.replace(
  /class="subsection-content max-w-/g,
  'class="subsection-content max-sm:text-center max-w-'
);

// Fix 4: Center all flex-wrap containers on mobile
content = content.replace(
  /class="flex flex-wrap gap-/g,
  'class="flex flex-wrap gap- max-sm:justify-center'
);
// Undo the double replacement
content = content.replace(
  /class="flex flex-wrap gap- max-sm:justify-center max-sm:justify-center/g,
  'class="flex flex-wrap gap- max-sm:justify-center'
);

// Fix 5: Center grid cards on mobile  
content = content.replace(
  /class="grid grid-cols-2 md:grid-cols-/g,
  'class="grid grid-cols-2 md:grid-cols- max-sm:text-center'
);
content = content.replace(
  /class="grid grid-cols-2 md:grid-cols- max-sm:text-center max-sm:text-center/g,
  'class="grid grid-cols-2 md:grid-cols- max-sm:text-center'
);

// Fix 6: Center hero section on mobile
content = content.replace(
  /class="min-w-0 flex flex-col gap-6"/g,
  'class="min-w-0 flex flex-col gap-6 max-sm:text-center max-sm:items-center"'
);

// Fix 7: Center the section dividers
content = content.replace(
  /class="max-w-\[1200px\] mx-auto px-6">/g,
  'class="max-w-[1200px] mx-auto px-6 max-sm:text-center">'
);

// Fix 8: Center the project header metadata row
content = content.replace(
  /<div class="flex flex-wrap gap-12 gap-y-6">/g,
  '<div class="flex flex-wrap gap-12 gap-y-6 max-sm:justify-center max-sm:text-center">'
);

// Fix 9: Center flex flex-row containers used for feature cards
content = content.replace(
  /class="flex flex-row gap-10 items-start flex-wrap"/g,
  'class="flex flex-row gap-10 items-start flex-wrap max-sm:justify-center"'
);

// Fix 10: Center the filters flex containers
content = content.replace(
  /class="flex flex-row gap-10 items-start flex-wrap max-sm:justify-center"/g,
  'class="flex flex-row gap-10 items-start flex-wrap max-sm:justify-center max-sm:text-center"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done - centered all elements on mobile for Bibliothèque page');