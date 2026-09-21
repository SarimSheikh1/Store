export const PARTNERS = [
  {
    id: 'pt1',
    name: 'Umer',
    role: 'Purchasing & Suppliers',
    fullTitle: 'Chief Procurement Officer',
    responsibilities: [
      'Supplier management',
      'Purchasing',
      'Price negotiation',
      'Stock procurement'
    ],
    avatar: '👨🏽‍💼',
    image: '/images/partners/umer.jpg',
    bio: 'Umer brings over 12 years of experience in supply chain and procurement. He has built strong relationships with suppliers across Pakistan, ensuring quality products at competitive prices.',
    experience: '12+ years',
    expertise: ['Supply Chain Management', 'Vendor Relations', 'Cost Optimization'],
    quote: 'Quality products start with trusted partnerships.',
    achievements: [
      'Established partnerships with 100+ suppliers',
      'Reduced procurement costs by 20%',
      'Maintained 99% product quality standards'
    ]
  },
  {
    id: 'pt2',
    name: 'Rayan',
    role: 'Online Business & Marketing',
    fullTitle: 'Digital Marketing Manager',
    responsibilities: [
      'WhatsApp Business',
      'Social Media Management',
      'Digital marketing',
      'Promotions'
    ],
    avatar: '👨🏽‍💻',
    image: '/images/partners/rayan.jpg',
    bio: 'Rayan is our digital marketing expert who has grown our online presence from zero to thousands of satisfied customers. He manages all our digital touchpoints and customer communications.',
    experience: '8+ years',
    expertise: ['Digital Marketing', 'Social Media', 'Customer Engagement'],
    quote: 'Great products deserve great stories.',
    achievements: [
      'Grew social media following by 500%',
      'Increased online sales by 300%',
      'Built WhatsApp customer base of 5000+'
    ]
  },
  {
    id: 'pt3',
    name: 'Yousaf',
    role: 'Store & Inventory',
    fullTitle: 'Operations Manager',
    responsibilities: [
      'Shop operations',
      'Inventory management',
      'Product organization',
      'Customer service'
    ],
    avatar: '👨🏽‍🏫',
    image: '/images/partners/yousaf.jpg',
    bio: 'Yousaf ensures our physical store runs smoothly and efficiently. His attention to detail and organizational skills keep our inventory fresh and our customers happy.',
    experience: '10+ years',
    expertise: ['Inventory Management', 'Store Operations', 'Quality Control'],
    quote: 'Organization and quality go hand in hand.',
    achievements: [
      'Implemented efficient inventory system',
      'Reduced product waste by 30%',
      'Maintained store rating of 4.8/5'
    ]
  },
  {
    id: 'pt4',
    name: 'Sarim',
    role: 'Website & Online Orders',
    fullTitle: 'E-commerce Manager', 
    responsibilities: [
      'Website management',
      'Product updates',
      'Order confirmation',
      'Online order management'
    ],
    avatar: '🧑🏽‍💻',
    image: '/images/partners/sarim.jpg',
    bio: 'Sarim handles all technical aspects of our online platform. He ensures our website provides the best user experience and all orders are processed efficiently.',
    experience: '6+ years',
    expertise: ['Web Development', 'Order Management', 'Customer Support'],
    quote: 'Technology should make life simpler, not complicated.',
    achievements: [
      'Developed user-friendly website interface',
      'Achieved 99.5% order processing accuracy',
      'Reduced order processing time by 50%'
    ]
  }
];

// Company information
export const COMPANY_INFO = {
  name: 'Four Partners Mart',
  tagline: 'Your Trusted Grocery Partner',
  mission: 'To provide fresh, quality groceries delivered conveniently to Pakistani families, supporting local suppliers and building stronger communities.',
  vision: 'To become Pakistan\'s most trusted grocery delivery service, known for quality, reliability, and exceptional customer care.',
  
  values: [
    {
      name: 'Quality First',
      description: 'We never compromise on the quality of products we deliver to your family.',
      icon: '⭐'
    },
    {
      name: 'Customer Focus', 
      description: 'Every decision we make puts our customers\' needs and satisfaction first.',
      icon: '❤️'
    },
    {
      name: 'Reliability',
      description: 'You can count on us for consistent service and on-time deliveries.',
      icon: '🎯'
    },
    {
      name: 'Community Support',
      description: 'We support local suppliers and contribute to our community\'s growth.',
      icon: '🤝'
    }
  ],
  
  founded: '2019',
  headquarters: 'Lahore, Pakistan',
  employees: '50+',
  customersServed: '10,000+',
  
  deliveryAreas: [
    'DHA Lahore',
    'Gulberg', 
    'Model Town',
    'Johar Town',
    'Allama Iqbal Town',
    'Garden Town',
    'Cantt',
    'Liberty Market Area'
  ],
  
  certifications: [
    'ISO 9001:2015 Quality Management',
    'HACCP Food Safety',
    'Halal Certified Products'
  ]
};

// Helper functions
export const getPartnerById = (id) => {
  return PARTNERS.find(partner => partner.id === id);
};

export const getPartnerByName = (name) => {
  return PARTNERS.find(partner => 
    partner.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getPartnersByRole = (role) => {
  return PARTNERS.filter(partner => 
    partner.role.toLowerCase().includes(role.toLowerCase())
  );
};
