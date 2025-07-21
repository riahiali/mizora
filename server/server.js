const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-here';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../assets/images/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// In-memory storage (replace with real database)
let users = [
  {
    id: '1',
    email: 'admin@mizora.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    fullName: 'Admin User',
    isAdmin: true,
    createdAt: new Date()
  },
  {
    id: '2',
    email: 'admin@template.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    fullName: 'Template Admin',
    isAdmin: true,
    createdAt: new Date()
  },
  {
    id: '3',
    email: 'user@mizora.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    fullName: 'John Doe',
    isAdmin: false,
    createdAt: new Date()
  }
];

let products = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium quality cotton t-shirt with comfortable fit. Perfect for everyday wear.',
    price: 25,
    originalPrice: 35,
    category: 'Clothing',
    subcategory: 'T-Shirts',
    images: ['/assets/images/uploads/fashion_product_1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    inStock: true,
    stockQuantity: 50,
    rating: 4.5,
    reviewCount: 12,
    isNew: true,
    isSale: false,
    tags: ['cotton', 'casual', 'comfortable'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 120,
    originalPrice: 150,
    category: 'Electronics',
    subcategory: 'Audio',
    images: ['/assets/images/uploads/electronics_product_1.jpg'],
    sizes: ['One Size'],
    colors: ['Black', 'White'],
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 45,
    isNew: false,
    isSale: true,
    discount: 20,
    tags: ['wireless', 'bluetooth', 'audio'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Decorative Table Lamp',
    description: 'Modern decorative table lamp with adjustable brightness. Perfect for home or office.',
    price: 65,
    originalPrice: 80,
    category: 'Home & Decor',
    subcategory: 'Lighting',
    images: ['/assets/images/uploads/home_decor_product_1.jpeg'],
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Black'],
    inStock: true,
    stockQuantity: 15,
    rating: 4.3,
    reviewCount: 28,
    isNew: false,
    isSale: false,
    tags: ['lamp', 'decor', 'lighting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and coin compartment.',
    price: 45,
    originalPrice: 60,
    category: 'Accessories',
    subcategory: 'Wallets',
    images: ['/assets/images/placeholder.jpg'],
    sizes: ['One Size'],
    colors: ['Brown', 'Black'],
    inStock: true,
    stockQuantity: 30,
    rating: 4.6,
    reviewCount: 67,
    isNew: false,
    isSale: true,
    discount: 25,
    tags: ['leather', 'wallet', 'accessories'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Ceramic Coffee Mug',
    description: 'High-quality ceramic coffee mug with ergonomic handle. Dishwasher safe.',
    price: 15,
    originalPrice: 20,
    category: 'Home & Kitchen',
    subcategory: 'Drinkware',
    images: ['/assets/images/placeholder.jpg'],
    sizes: ['350ml', '500ml'],
    colors: ['White', 'Blue', 'Red'],
    inStock: true,
    stockQuantity: 100,
    rating: 4.2,
    reviewCount: 89,
    isNew: true,
    isSale: false,
    tags: ['ceramic', 'mug', 'kitchen'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let categories = [
  {
    id: '1',
    name: "Clothing",
    slug: 'clothing',
    description: 'Quality clothing for men and women',
    image: '/assets/images/placeholder.jpg',
    productCount: 15
  },
  {
    id: '2',
    name: "Electronics",
    slug: 'electronics',
    description: 'Latest electronics and gadgets',
    image: '/assets/images/placeholder.jpg',
    productCount: 8
  },
  {
    id: '3',
    name: 'Home & Decor',
    slug: 'home-decor',
    description: 'Beautiful home decoration items',
    image: '/assets/images/placeholder.jpg',
    productCount: 12
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Fashion accessories and more',
    image: '/assets/images/placeholder.jpg',
    productCount: 20
  },
  {
    id: '5',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Kitchen essentials and home items',
    image: '/assets/images/placeholder.jpg',
    productCount: 18
  }
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      fullName,
      isAdmin: false,
      createdAt: new Date()
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, sortBy, isNew, isSale } = req.query;
  
  let filteredProducts = [...products];

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (isNew === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isNew);
  }

  if (isSale === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isSale);
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
  }

  res.json(filteredProducts);
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }

  const searchResults = products.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
  );

  res.json(searchResults);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.post('/api/products', verifyToken, verifyAdmin, (req, res) => {
  const newProduct = {
    id: (products.length + 1).toString(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', verifyToken, verifyAdmin, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    updatedAt: new Date()
  };

  res.json(products[productIndex]);
});

app.delete('/api/products/:id', verifyToken, verifyAdmin, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Category Routes
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/categories', verifyToken, verifyAdmin, (req, res) => {
  const newCategory = {
    id: (categories.length + 1).toString(),
    ...req.body,
    productCount: 0
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// User Management Routes (Admin)
app.get('/api/users', verifyToken, verifyAdmin, (req, res) => {
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.json(usersWithoutPasswords);
});

app.delete('/api/users/:id', verifyToken, verifyAdmin, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Prevent deleting yourself
  if (users[userIndex].id === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Settings storage
let appSettings = {
  whatsappNumber: '+216123456789',
  storeName: 'MIZORA',
  storeEmail: 'contact@mizora.com',
  storeAddress: 'Tunis, Tunisia',
  currency: 'TND',
  taxRate: 0.19,
  shippingFee: 7,
  freeShippingThreshold: 100
};

// Settings Routes
app.get('/api/settings', (req, res) => {
  res.json(appSettings);
});

app.put('/api/settings', verifyToken, verifyAdmin, (req, res) => {
  try {
    appSettings = { ...appSettings, ...req.body };
    res.json(appSettings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Image Upload Route
app.post('/api/upload', verifyToken, verifyAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the URL path that can be used in the frontend
    const imageUrl = `/assets/images/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});