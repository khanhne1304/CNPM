import { Client } from "@elastic/elasticsearch";
import Product from "../models/Product.js";

const client = new Client({ node: "http://localhost:9200" });

export async function syncProductsToElastic() {
  const products = await Product.find();
  for (const p of products) {
    await client.index({
      index: "products",
      id: p._id.toString(),
      document: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        brand: p.brand,
        views: p.views,
        rating: p.rating,
        promotion: p.promotion,
        tags: p.tags,
        inStock: p.inStock,
        createdAt: p.createdAt,
      },
    });
  }
  await client.indices.refresh({ index: "products" });
}

export async function searchProducts(filters) {
  const must = [];
  const should = [];

  // Tìm kiếm theo từ khóa
  if (filters.keyword) {
    must.push({
      multi_match: {
        query: filters.keyword,
        fields: ["name", "description", "brand", "category", "tags"],
        fuzziness: "AUTO",
        minimum_should_match: "90%"
      },
    });
  }

  // Lọc theo danh mục
  if (filters.category) {
    must.push({ match: { category: filters.category } });
  }

  // Lọc theo thương hiệu
  if (filters.brand) {
    must.push({ match: { brand: filters.brand } });
  }

  // Lọc theo khoảng giá
  if (filters.minPrice || filters.maxPrice) {
    must.push({
      range: {
        "price.base": {
          gte: filters.minPrice ?? 0,
          lte: filters.maxPrice ?? 999999999,
        },
      },
    });
  }

  // Lọc theo khuyến mãi
  if (filters.promotion) {
    if (filters.promotion === 'sale') {
      must.push({
        script: {
          script: "doc['price.sale'].size()!=0 && doc['price.sale'].value < doc['price.base'].value",
        },
      });
    } else {
      must.push({ match: { promotion: filters.promotion } });
    }
  }

  // Lọc theo đánh giá
  if (filters.minRating) {
    must.push({
      range: {
        rating: {
          gte: filters.minRating,
        },
      },
    });
  }

  // Lọc theo lượt xem
  if (filters.minViews) {
    must.push({
      range: {
        views: {
          gte: filters.minViews,
        },
      },
    });
  }

  // Lọc theo tình trạng còn hàng
  if (filters.inStock !== undefined) {
    must.push({ term: { inStock: filters.inStock } });
  }

  // Lọc theo tags
  if (filters.tags && filters.tags.length > 0) {
    must.push({
      terms: {
        tags: filters.tags
      }
    });
  }

  // Sắp xếp
  let sort = [];
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "views":
        sort = [{ views: "desc" }];
        break;
      case "price_asc":
        sort = [{ "price.base": "asc" }];
        break;
      case "price_desc":
        sort = [{ "price.base": "desc" }];
        break;
      case "rating":
        sort = [{ rating: "desc" }];
        break;
      case "newest":
        sort = [{ createdAt: "desc" }];
        break;
      case "oldest":
        sort = [{ createdAt: "asc" }];
        break;
      default:
        sort = [];
    }
  }

  const result = await client.search({
    index: "products",
    query: { bool: { must, should } },
    sort,
    size: filters.limit || 20,
    from: filters.offset || 0,
  });

  return {
    products: result.hits.hits.map((hit) => ({ id: hit._id, ...hit._source })),
    total: result.hits.total.value,
    page: Math.floor((filters.offset || 0) / (filters.limit || 20)) + 1,
    totalPages: Math.ceil(result.hits.total.value / (filters.limit || 20))
  };
}
