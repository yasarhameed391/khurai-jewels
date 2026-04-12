const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  stock: Number,
  slug: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const productsToAdd = [
  {
    name: 'Gold Ring',
    price: 25000,
    category: 'Rings',
    description: 'Beautiful gold ring',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    slug: 'gold-ring'
  },
  {
    name: 'Diamond Necklace',
    price: 45000,
    category: 'Necklaces',
    description: 'Elegant diamond necklace',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    stock: 5,
    slug: 'diamond-necklace'
  },
  {
    name: 'Pearl Earrings',
    price: 8500,
    category: 'Earrings',
    description: 'Classic pearl earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    slug: 'pearl-earrings'
  },
  {
    name: 'Gold Bracelet',
    price: 15000,
    category: 'Bracelets',
    description: 'Stylish gold bracelet',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    slug: 'gold-bracelet'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const created = await Product.insertMany(productsToAdd);
    console.log(`Added ${created.length} products`);

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();