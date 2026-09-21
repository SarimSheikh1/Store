export const PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Basic Package',
    slug: 'basic-package',
    target: 'For 1–2 people',
    description: 'Essential grocery items to cover basic monthly needs for a small household.',
    price: 8500,
    salePrice: 7999,
    duration: '1 month',
    servingSize: '1-2 people',
    savings: 501,
    featured: true,
    popular: false,
    badge: 'Budget Friendly',
    badgeColor: '#10b981',
    items: [
      { name: 'Wheat Flour', qty: '10 kg' },
      { name: 'Cooking Oil', qty: '3 L' },
      { name: 'Sugar', qty: '3 kg' },
      { name: 'Basmati Rice', qty: '2 kg' },
      { name: 'Mixed Pulses', qty: '2 kg' },
      { name: 'Tea', qty: '400 g' },
      { name: 'Salt', qty: '1 kg' },
      { name: 'Spices Mix', qty: '2 packs' },
      { name: 'Soap', qty: '3 bars' },
      { name: 'Dishwash Bar', qty: '2 bars' }
    ],
    image: '/images/local-grocery-products.png',
    benefits: [
      'Perfect for small households',
      'Covers all basic necessities',
      'Great value for money',
      'Quality assured products',
      'Free home delivery'
    ]
  },
  {
    id: 'pkg-family',
    name: 'Family Package',
    slug: 'family-package',
    target: 'For a family of 4–5 people',
    description: 'Comprehensive monthly ration covering all dietary and basic household needs.',
    price: 15500,
    salePrice: 14499,
    duration: '1 month',
    servingSize: '4-5 people',
    savings: 1001,
    featured: true,
    popular: true,
    badge: 'Most Popular',
    badgeColor: '#f59e0b',
    items: [
      { name: 'Wheat Flour', qty: '20 kg' },
      { name: 'Cooking Oil', qty: '5 L' },
      { name: 'Sugar', qty: '5 kg' },
      { name: 'Basmati Rice', qty: '5 kg' },
      { name: 'Mixed Pulses', qty: '4 kg' },
      { name: 'Tea', qty: '900 g' },
      { name: 'Salt', qty: '2 kg' },
      { name: 'Spices Mix', qty: '4 packs' },
      { name: 'Milk Carton', qty: '12 L' },
      { name: 'Soap', qty: '6 bars' },
      { name: 'Dishwash Liquid', qty: '1 L' },
      { name: 'Washing Powder', qty: '2 kg' }
    ],
    image: '/images/packages/family-package.png',
    benefits: [
      'Complete family nutrition',
      'Includes cleaning essentials',
      'Maximum savings per item',
      'Carefully balanced quantities',
      'Priority delivery service'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    slug: 'premium-package',
    target: 'Large family or ultimate convenience',
    description: 'Includes groceries, cleaning products, personal-care products, drinks and snacks.',
    price: 25000,
    salePrice: 22999,
    duration: '1 month',
    servingSize: '6+ people',
    savings: 2001,
    featured: true,
    popular: false,
    badge: 'Premium',
    badgeColor: '#8b5cf6',
    items: [
      { name: 'Wheat Flour', qty: '20 kg' },
      { name: 'Desi Ghee', qty: '2 kg' },
      { name: 'Cooking Oil', qty: '5 L' },
      { name: 'Premium Rice', qty: '10 kg' },
      { name: 'Mixed Pulses', qty: '5 kg' },
      { name: 'Premium Tea', qty: '1 kg' },
      { name: 'Milk Carton', qty: '12 L' },
      { name: 'Juices & Soft Drinks', qty: 'Assorted' },
      { name: 'Biscuits & Snacks', qty: 'Assorted' },
      { name: 'Premium Spices', qty: 'Assorted' },
      { name: 'Personal Care Bundle', qty: 'Shampoo, Soaps, Toothpaste' },
      { name: 'Cleaning Bundle', qty: 'Detergent, Floor Cleaner, Dishwash' }
    ],
    image: '/images/local-grocery-products.png',
    benefits: [
      'Premium quality products',
      'Complete household solution',
      'Includes snacks & beverages',
      'Personal care essentials',
      'VIP delivery & packaging'
    ]
  }
];

// Build-your-own package configuration
export const BUILD_YOUR_OWN_CONFIG = {
  name: 'Build Your Own Package',
  description: 'Create a custom ration package tailored to your family\'s needs. Choose products and quantities, and we\'ll calculate the best price for you.',
  minItems: 5,
  maxItems: 20,
  minOrderValue: 3000,
  discountTiers: [
    { minValue: 3000, maxValue: 5999, discount: 5, label: '5% off orders ₨3,000+' },
    { minValue: 6000, maxValue: 9999, discount: 8, label: '8% off orders ₨6,000+' },
    { minValue: 10000, maxValue: 14999, discount: 12, label: '12% off orders ₨10,000+' },
    { minValue: 15000, maxValue: 999999, discount: 15, label: '15% off orders ₨15,000+' }
  ],
  categories: [
    {
      id: 'rice-flour',
      name: 'Rice & Flour',
      required: true,
      minItems: 1,
      recommendation: 'Essential base for every Pakistani household'
    },
    {
      id: 'pulses', 
      name: 'Pulses',
      required: true,
      minItems: 2,
      recommendation: 'Protein-rich daals for balanced nutrition'
    },
    {
      id: 'oil-ghee',
      name: 'Oil & Ghee', 
      required: true,
      minItems: 1,
      recommendation: 'Cooking essentials you use daily'
    },
    {
      id: 'tea-beverages',
      name: 'Tea & Beverages',
      required: false,
      minItems: 0,
      recommendation: 'For your daily chai and coffee needs'
    },
    {
      id: 'grocery',
      name: 'Grocery Essentials',
      required: false,
      minItems: 0,
      recommendation: 'Spices, sugar, salt, and daily essentials'
    }
  ]
};

// Helper functions
export const getPackageById = (id) => {
  return PACKAGES.find(pkg => pkg.id === id);
};

export const getPackageBySlug = (slug) => {
  return PACKAGES.find(pkg => pkg.slug === slug);
};

export const getFeaturedPackages = () => {
  return PACKAGES.filter(pkg => pkg.featured);
};

export const getPopularPackage = () => {
  return PACKAGES.find(pkg => pkg.popular);
};

export const calculatePackageTotal = (items) => {
  // This would integrate with products data to calculate real totals
  return items.reduce((total, item) => {
    // Placeholder calculation - would use real product prices
    return total + (item.quantity * 100); // Simplified calculation
  }, 0);
};

export const getDiscountForValue = (value) => {
  const tier = BUILD_YOUR_OWN_CONFIG.discountTiers
    .reverse()
    .find(tier => value >= tier.minValue);
  
  return tier ? tier.discount : 0;
};
