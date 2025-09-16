import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchPage.css";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    promotion: "",
    minRating: "",
    minViews: "",
    inStock: "",
    tags: "",
    sortBy: ""
  });

  const [showFilters, setShowFilters] = useState(false);

  async function fetchProducts(params = {}) {
    const res = await axios.get("http://localhost:5000/api/products/search", {
      params,
    });
    setProducts(res.data.products || res.data);
    setTotal(res.data.total || 0);
    setPage(res.data.page || 1);
    setTotalPages(res.data.totalPages || 1);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleSearch() {
    const searchParams = { keyword, ...filters };
    // Remove empty values
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] === "" || searchParams[key] === undefined) {
        delete searchParams[key];
      }
    });
    fetchProducts(searchParams);
  }

  function handleFilterChange(filterName, value) {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }

  function clearFilters() {
    setFilters({
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      promotion: "",
      minRating: "",
      minViews: "",
      inStock: "",
      tags: "",
      sortBy: ""
    });
    setKeyword("");
  }

  return (
    <div className="container">
      <h1 className="title">Tìm kiếm sản phẩm</h1>

      <div className="search-container">
        <div className="search-bar">
        <input
          type="text"
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
        </button>
      </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Danh mục:</label>
              <select 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="Clothing">Quần áo</option>
                <option value="Shoes">Giày dép</option>
                <option value="Accessories">Phụ kiện</option>
                <option value="Electronics">Điện tử</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Thương hiệu:</label>
              <select 
                value={filters.brand} 
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="Local Brand">Local Brand</option>
                <option value="SneakerX">SneakerX</option>
                <option value="DenimPro">DenimPro</option>
                <option value="StreetWear">StreetWear</option>
                <option value="LuxuryBag">LuxuryBag</option>
                <option value="TechWatch">TechWatch</option>
                <option value="SunGlass">SunGlass</option>
                <option value="OfficeWear">OfficeWear</option>
                <option value="HighHeel">HighHeel</option>
                <option value="MenWallet">MenWallet</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Khuyến mãi:</label>
              <select 
                value={filters.promotion} 
                onChange={(e) => handleFilterChange('promotion', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="sale">Đang giảm giá</option>
                <option value="new">Sản phẩm mới</option>
                <option value="hot">Sản phẩm hot</option>
                <option value="featured">Sản phẩm nổi bật</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Khoảng giá (VNĐ):</label>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Từ (VD: 100000)"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Đến (VD: 1000000)"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Đánh giá tối thiểu:</label>
              <select 
                value={filters.minRating} 
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="3">3 sao trở lên</option>
                <option value="4">4 sao trở lên</option>
                <option value="4.5">4.5 sao trở lên</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Lượt xem tối thiểu:</label>
              <input
                type="number"
                placeholder="VD: 50"
                value={filters.minViews}
                onChange={(e) => handleFilterChange('minViews', e.target.value)}
                min="0"
              />
            </div>

            <div className="filter-group">
              <label>Tình trạng:</label>
              <select 
                value={filters.inStock} 
                onChange={(e) => handleFilterChange('inStock', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="true">Còn hàng</option>
                <option value="false">Hết hàng</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sắp xếp theo:</label>
              <select 
                value={filters.sortBy} 
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="">Mặc định</option>
                <option value="views">Lượt xem cao nhất</option>
                <option value="price_asc">Giá thấp đến cao</option>
                <option value="price_desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={handleSearch} className="apply-filters">
              Áp dụng bộ lọc
            </button>
            <button onClick={clearFilters} className="clear-filters">
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}

      <div className="results-info">
        <p>Tìm thấy {total} sản phẩm</p>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="product-badges">
                {p.promotion !== 'none' && (
                  <span className={`badge badge-${p.promotion}`}>
                    {p.promotion === 'sale' ? 'Sale' : 
                     p.promotion === 'new' ? 'Mới' :
                     p.promotion === 'hot' ? 'Hot' : 'Nổi bật'}
                  </span>
                )}
                {!p.inStock && <span className="badge badge-out">Hết hàng</span>}
              </div>

              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="description">{p.description}</p>
                <div className="price-section">
                  <p className="price">{p.price.base.toLocaleString()} đ</p>
                  {p.price.sale && (
                    <p className="sale">
                      Sale: {p.price.sale.toLocaleString()} đ
                    </p>
                  )}
                </div>
                <div className="product-meta">
                  <div className="rating">
                    ⭐ {p.rating}/5
                  </div>
                  <span className="views">{p.views} lượt xem</span>
                </div>
                <div className="product-tags">
                  {p.tags && p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={page === 1}
            onClick={() => {
              const newPage = page - 1;
              setPage(newPage);
              fetchProducts({ 
                keyword, 
                ...filters, 
                offset: (newPage - 1) * 20 
              });
            }}
          >
            Trước
          </button>
          <span>Trang {page} / {totalPages}</span>
          <button 
            disabled={page === totalPages}
            onClick={() => {
              const newPage = page + 1;
              setPage(newPage);
              fetchProducts({ 
                keyword, 
                ...filters, 
                offset: (newPage - 1) * 20 
              });
            }}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
