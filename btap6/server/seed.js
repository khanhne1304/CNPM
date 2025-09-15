import mongoose from "mongoose";
import Product from "./src/models/Product.js";
import { syncProductsToElastic } from "./src/services/product.service.js";

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mern-products");
  console.log("✅ MongoDB connected (seeding)");

  await Product.deleteMany({});
  console.log("🗑 Đã xóa dữ liệu cũ");

  const sampleProducts = [
    {
      name: "Áo Thun Basic",
      description: "Áo thun cotton 100% mềm mại, thoáng mát",
      price: { base: 150000, sale: 120000 },
      category: "Clothing",
      brand: "Local Brand",
      views: 50,
      rating: 4.2,
      promotion: "sale",
      tags: ["cotton", "basic", "casual"],
      inStock: true,
    },
    {
      name: "Giày Sneaker",
      description: "Giày sneaker phong cách trẻ, êm ái",
      price: { base: 700000 },
      category: "Shoes",
      brand: "SneakerX",
      views: 80,
      rating: 4.5,
      promotion: "new",
      tags: ["sneaker", "sport", "trendy"],
      inStock: true,
    },
    {
      name: "Quần Jeans Slimfit",
      description: "Quần jeans ôm vừa vặn, chất liệu cao cấp",
      price: { base: 350000 },
      category: "Clothing",
      brand: "DenimPro",
      views: 30,
      rating: 3.8,
      promotion: "none",
      tags: ["jeans", "slim", "denim"],
      inStock: true,
    },
    {
      name: "Áo Khoác Hoodie",
      description: "Áo khoác hoodie ấm áp, thiết kế đẹp",
      price: { base: 450000, sale: 380000 },
      category: "Clothing",
      brand: "StreetWear",
      views: 120,
      rating: 4.7,
      promotion: "hot",
      tags: ["hoodie", "warm", "street"],
      inStock: true,
    },
    {
      name: "Túi Xách Da",
      description: "Túi xách da thật, sang trọng",
      price: { base: 1200000 },
      category: "Accessories",
      brand: "LuxuryBag",
      views: 25,
      rating: 4.9,
      promotion: "featured",
      tags: ["leather", "luxury", "handbag"],
      inStock: true,
    },
    {
      name: "Đồng Hồ Thông Minh",
      description: "Đồng hồ thông minh đa chức năng",
      price: { base: 2500000, sale: 2000000 },
      category: "Electronics",
      brand: "TechWatch",
      views: 200,
      rating: 4.3,
      promotion: "sale",
      tags: ["smartwatch", "tech", "fitness"],
      inStock: true,
    },
    {
      name: "Kính Mát",
      description: "Kính mát chống tia UV, phong cách",
      price: { base: 300000 },
      category: "Accessories",
      brand: "SunGlass",
      views: 75,
      rating: 4.1,
      promotion: "none",
      tags: ["sunglasses", "uv", "style"],
      inStock: false,
    },
    {
      name: "Áo Sơ Mi Công Sở",
      description: "Áo sơ mi công sở lịch lãm, chất liệu tốt",
      price: { base: 280000 },
      category: "Clothing",
      brand: "OfficeWear",
      views: 90,
      rating: 4.4,
      promotion: "new",
      tags: ["shirt", "office", "formal"],
      inStock: true,
    },
    {
      name: "Giày Cao Gót",
      description: "Giày cao gót nữ sang trọng",
      price: { base: 800000, sale: 650000 },
      category: "Shoes",
      brand: "HighHeel",
      views: 60,
      rating: 4.0,
      promotion: "sale",
      tags: ["heels", "elegant", "women"],
      inStock: true,
    },
    {
      name: "Ví Da Nam",
      description: "Ví da nam cao cấp, nhiều ngăn",
      price: { base: 400000 },
      category: "Accessories",
      brand: "MenWallet",
      views: 40,
      rating: 4.6,
      promotion: "none",
      tags: ["wallet", "leather", "men"],
      inStock: true,
    },
  ];

  await Product.insertMany(sampleProducts);
  console.log("✅ Đã thêm dữ liệu mẫu");

  await syncProductsToElastic();
  console.log("🔄 Đã đồng bộ Elasticsearch");

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Lỗi seed:", err);
  process.exit(1);
});
