export const CATEGORIES = [
  {
    id: 'c1',
    name: 'Grocery',
    slug: 'grocery',
    icon: '🛒',
    description: 'Everyday grocery essentials, spices, and cooking ingredients.',
    image: '/images/categories/grocery.jpg',
    featured: true,
    productCount: 25,
    colors: {
      primary: '#22c55e',
      secondary: '#dcfce7'
    }
  },
  {
    id: 'c2',
    name: 'Rice & Flour',
    slug: 'rice-flour',
    icon: '🌾',
    description: 'Premium basmati rice and fine wheat flour.',
    image: '/images/categories/rice-flour.jpg',
    featured: true,
    productCount: 8,
    colors: {
      primary: '#d97706',
      secondary: '#fef3c7'
    }
  },
  {
    id: 'c3',
    name: 'Pulses',
    slug: 'pulses',
    icon: '🫘',
    description: 'Healthy and protein-rich lentils and pulses.',
    image: '/images/categories/pulses.jpg',
    featured: true,
    productCount: 12,
    colors: {
      primary: '#dc2626',
      secondary: '#fee2e2'
    }
  },
  {
    id: 'c4',
    name: 'Cooking Oil & Ghee',
    slug: 'oil-ghee',
    icon: '🫙',
    description: 'High-quality cooking oil, sunflower oil, and desi ghee.',
    image: '/images/categories/oil-ghee.jpg',
    featured: true,
    productCount: 6,
    colors: {
      primary: '#f59e0b',
      secondary: '#fef3c7'
    }
  },
  {
    id: 'c5',
    name: 'Tea & Beverages',
    slug: 'tea-beverages',
    icon: '☕',
    description: 'Classic tea, coffee, and everyday beverages.',
    image: '/images/categories/tea-beverages.jpg',
    featured: true,
    productCount: 10,
    colors: {
      primary: '#7c3aed',
      secondary: '#ede9fe'
    }
  },
  {
    id: 'c6',
    name: 'Biscuits & Snacks',
    slug: 'biscuits-snacks',
    icon: '🍪',
    description: 'Cookies, chips, and tea-time snacks.',
    image: '/images/categories/biscuits-snacks.jpg',
    featured: true,
    productCount: 15,
    colors: {
      primary: '#ea580c',
      secondary: '#fed7aa'
    }
  },
  {
    id: 'c7',
    name: 'Drinks',
    slug: 'drinks',
    icon: '🥤',
    description: 'Soft drinks, juices, and mineral water.',
    image: '/images/categories/drinks.jpg',
    featured: false,
    productCount: 12,
    colors: {
      primary: '#06b6d4',
      secondary: '#cffafe'
    }
  },
  {
    id: 'c8',
    name: 'Bakery',
    slug: 'bakery',
    icon: '🍞',
    description: 'Fresh bread, buns, and bakery items.',
    image: '/images/categories/bakery.jpg',
    featured: false,
    productCount: 8,
    colors: {
      primary: '#f97316',
      secondary: '#fed7aa'
    }
  },
  {
    id: 'c9',
    name: 'Cleaning',
    slug: 'cleaning',
    icon: '🧼',
    description: 'Detergents, dishwash, and home cleaning supplies.',
    image: '/images/categories/cleaning.jpg',
    featured: false,
    productCount: 10,
    colors: {
      primary: '#6366f1',
      secondary: '#e0e7ff'
    }
  },
  {
    id: 'c10',
    name: 'Personal Care',
    slug: 'personal-care',
    icon: '🧴',
    description: 'Soaps, shampoos, and personal hygiene products.',
    image: '/images/categories/personal-care.jpg',
    featured: false,
    productCount: 8,
    colors: {
      primary: '#ec4899',
      secondary: '#fce7f3'
    }
  },
  {
    id: 'c11',
    name: 'Baby Care',
    slug: 'baby-care',
    icon: '👶',
    description: 'Diapers, baby shampoo, and gentle care products.',
    image: '/images/categories/baby-care.jpg',
    featured: false,
    productCount: 6,
    colors: {
      primary: '#10b981',
      secondary: '#d1fae5'
    }
  },
  {
    id: 'c12',
    name: 'Household',
    slug: 'household',
    icon: '🏠',
    description: 'Tissues, foils, garbage bags, and daily home items.',
    image: '/images/categories/household.jpg',
    featured: false,
    productCount: 9,
    colors: {
      primary: '#64748b',
      secondary: '#f1f5f9'
    }
  }
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getFeaturedCategories() {
  return CATEGORIES.filter(c => c.featured);
}

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}
