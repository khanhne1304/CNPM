import { searchProducts } from "../services/product.service.js";

export async function search(req, res) {
  try {
    // Xử lý và validate các tham số lọc
    const filters = {
      keyword: req.query.keyword,
      category: req.query.category,
      brand: req.query.brand,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      promotion: req.query.promotion,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
      minViews: req.query.minViews ? parseInt(req.query.minViews) : undefined,
      inStock: req.query.inStock !== undefined ? req.query.inStock === 'true' : undefined,
      tags: req.query.tags ? req.query.tags.split(',') : undefined,
      sortBy: req.query.sortBy,
      limit: req.query.limit ? parseInt(req.query.limit) : 20,
      offset: req.query.offset ? parseInt(req.query.offset) : 0,
    };

    const result = await searchProducts(filters);
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Lỗi tìm kiếm", error: e.message });
  }
}
