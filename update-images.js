const fs = require('fs');

function updateComponent(file, oldStr, newStr) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(oldStr, newStr);
  fs.writeFileSync(file, code);
}

// 1. Update ProductCard
updateComponent(
  'components/ui/ProductCard.jsx',
  '<div className="product-image">{product.image}</div>',
  '<div className="product-image" style={{width:"100%", height:"100%"}}>{product.image.startsWith("http") || product.image.startsWith("/") ? <img src={product.image} alt={product.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <span style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%"}}>{product.image}</span>}</div>'
);

// 2. Update Cart Page
updateComponent(
  'app/cart/page.jsx',
  '<div className="item-image">{item.image}</div>',
  '<div className="item-image" style={{overflow:"hidden"}}>{item.image.startsWith("http") || item.image.startsWith("/") ? <img src={item.image} alt={item.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : item.image}</div>'
);

// 3. Update Product Detail Page
updateComponent(
  'app/products/[id]/page.jsx',
  '<div className="icon">{product.image}</div>',
  '<div className="icon" style={{width:"100%", height:"100%", overflow:"hidden", borderRadius:"var(--radius-lg)"}}>{product.image.startsWith("http") || product.image.startsWith("/") ? <img src={product.image} alt={product.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%"}}>{product.image}</div>}</div>'
);

// 4. Update PackageCard
updateComponent(
  'components/ui/PackageCard.jsx',
  '<div className="pkg-icon">{pkg.image}</div>',
  '<div className="pkg-icon" style={{width:"100px", height:"100px", margin:"0 auto 1rem", overflow:"hidden", borderRadius:"50%"}}>{pkg.image.startsWith("http") || pkg.image.startsWith("/") ? <img src={pkg.image} alt={pkg.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%"}}>{pkg.image}</div>}</div>'
);

// 5. Update PartnerCard
updateComponent(
  'components/ui/PartnerCard.jsx',
  '<div className="avatar">{partner.avatar}</div>',
  '<div className="avatar" style={{overflow:"hidden"}}>{partner.avatar.startsWith("http") ? <img src={partner.avatar} alt={partner.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : partner.avatar}</div>'
);

// 6. Update CategoryCard
updateComponent(
  'components/ui/CategoryCard.jsx',
  '<div className="category-icon">{category.icon}</div>',
  '<div className="category-icon" style={{overflow:"hidden"}}>{category.icon.startsWith("http") || category.icon.startsWith("/") ? <img src={category.icon} alt={category.name} style={{width:"100%", height:"100%", objectFit:"cover"}} /> : category.icon}</div>'
);

// 7. Update HeroSection
let hero = fs.readFileSync('components/home/HeroSection.jsx', 'utf8');
hero = hero.replace(/url\('\\/images\\/hero-bg-placeholder\.jpg'\)/g, "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')");
fs.writeFileSync('components/home/HeroSection.jsx', hero);

// 8. Update Partners Data
let partnersCode = fs.readFileSync('data/partners.js', 'utf8');
partnersCode = partnersCode.replace(/avatar: '👨🏽‍💼'/g, "avatar: 'https://ui-avatars.com/api/?name=Umer&background=16a34a&color=fff&size=150'");
partnersCode = partnersCode.replace(/avatar: '👨🏽‍💻'/g, "avatar: 'https://ui-avatars.com/api/?name=Rayan&background=16a34a&color=fff&size=150'");
partnersCode = partnersCode.replace(/avatar: '👨🏽‍🏫'/g, "avatar: 'https://ui-avatars.com/api/?name=Yousaf&background=16a34a&color=fff&size=150'");
partnersCode = partnersCode.replace(/avatar: '🧑🏽‍💻'/g, "avatar: 'https://ui-avatars.com/api/?name=Sarim&background=16a34a&color=fff&size=150'");
fs.writeFileSync('data/partners.js', partnersCode);

// 9. Update Products Data
const categoryImages = {
  'rice-flour': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
  'pulses': 'https://images.unsplash.com/photo-1515543904379-3d757efa72e1?auto=format&fit=crop&w=400&q=80',
  'oil-ghee': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
  'tea-beverages': 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c09a?auto=format&fit=crop&w=400&q=80',
  'biscuits-snacks': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=400&q=80',
  'cleaning': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
  'personal-care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80',
  'drinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
  'baby-care': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
  'household': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
  'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
};

let productsCode = fs.readFileSync('data/products.js', 'utf8');
// Use a regex to replace the image based on category
// Find the category of the product, then replace its image
const updatedProductsCode = productsCode.split('id:').map((chunk, index) => {
  if (index === 0) return chunk; // beginning of file
  
  const categoryMatch = chunk.match(/category:\s*'([^']+)'/);
  if (categoryMatch) {
    const cat = categoryMatch[1];
    if (categoryImages[cat]) {
      // replace image field in this chunk
      return chunk.replace(/image:\s*'[^']+'/, `image: '${categoryImages[cat]}'`);
    }
  }
  return chunk;
}).join('id:');

fs.writeFileSync('data/products.js', updatedProductsCode);

console.log('Update Complete');
