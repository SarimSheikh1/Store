const fs = require('fs');
const files = [
  'app/about/page.jsx', 
  'app/ration-packages/page.jsx', 
  'components/home/CategoriesSection.jsx', 
  'components/home/FeaturedProducts.jsx', 
  'components/home/HeroSection.jsx', 
  'components/home/RationPackagesPreview.jsx', 
  'components/layout/Footer.jsx', 
  'components/ui/CategoryCard.jsx', 
  'components/ui/PackageCard.jsx', 
  'components/ui/PartnerCard.jsx',
  'app/page.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.startsWith("'use client';")) {
    fs.writeFileSync(f, "'use client';\n\n" + content);
  }
});
console.log('Done');
