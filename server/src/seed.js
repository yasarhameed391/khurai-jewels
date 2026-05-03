require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  { name: 'Gold Necklace', price: 29999, description: 'Elegant 18k gold necklace', image: '', category: 'Necklaces', stock: 15 },
  { name: 'Diamond Ring', price: 89999, description: 'Stunning diamond engagement ring', image: '', category: 'Rings', stock: 8 },
  { name: 'Pearl Earrings', price: 14999, description: 'Classic freshwater pearl earrings', image: '', category: 'Earrings', stock: 25 },
  { name: 'Silver Bracelet', price: 7999, description: 'Handcrafted sterling silver bracelet', image: '', category: 'Bracelets', stock: 30 },
  { name: 'Ruby Pendant', price: 45999, description: 'Beautiful ruby pendant in gold', image: '', category: 'Necklaces', stock: 12 },
  { name: 'Emerald Studs', price: 34999, description: 'Genuine emerald stud earrings', image: '', category: 'Earrings', stock: 18 },
  { name: 'Gold Bangle', price: 19999, description: 'Classic gold bangle', image: '', category: 'Bracelets', stock: 20 },
  { name: 'Sapphire Ring', price: 59999, description: 'Blue sapphire cocktail ring', image: '', category: 'Rings', stock: 10 }
];

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36);
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    const productsWithSlug = products.map(p => ({
      ...p,
      slug: generateSlug(p.name)
    }));
    
    const inserted = await Product.insertMany(productsWithSlug);
    console.log(`${inserted.length} products seeded successfully`);

    const existingAdmin = await User.findOne({ email: 'thasnihameed.0305@gmail.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'thasnihameed.0305@gmail.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created: thasnihameed.0305@gmail.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    await mongoose.disconnect();
    console.log('Seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();