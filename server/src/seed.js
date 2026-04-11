require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Gold Necklace', price: 299.99, description: 'Elegant 18k gold necklace', image: '', category: 'Necklaces', stock: 15 },
  { name: 'Diamond Ring', price: 899.99, description: 'Stunning diamond engagement ring', image: '', category: 'Rings', stock: 8 },
  { name: 'Pearl Earrings', price: 149.99, description: 'Classic freshwater pearl earrings', image: '', category: 'Earrings', stock: 25 },
  { name: 'Silver Bracelet', price: 79.99, description: 'Handcrafted sterling silver bracelet', image: '', category: 'Bracelets', stock: 30 },
  { name: 'Ruby Pendant', price: 459.99, description: 'Beautiful ruby pendant in gold', image: '', category: 'Pendants', stock: 12 },
  { name: 'Emerald Studs', price: 349.99, description: 'Genuine emerald stud earrings', image: '', category: 'Earrings', stock: 18 },
  { name: 'Gold Bangle', price: 199.99, description: 'Classic gold bangle', image: '', category: 'Bracelets', stock: 20 },
  { name: 'Sapphire Ring', price: 599.99, description: 'Blue sapphire cocktail ring', image: '', category: 'Rings', stock: 10 }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products seeded successfully`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
