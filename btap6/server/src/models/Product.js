import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: {
    base: Number,
    sale: Number,
  },
  category: String,
  brand: String,
  views: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  promotion: {
    type: String,
    enum: ['none', 'sale', 'new', 'hot', 'featured'],
    default: 'none'
  },
  tags: [String],
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
