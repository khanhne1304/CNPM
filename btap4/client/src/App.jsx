import { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { fetchCategories } from './api.js';
import CategoryInfiniteList from './components/CategoryInfiniteList.jsx';
import CategoryPagedList from './components/CategoryPagedList.jsx';

export default function App() {
  const [cats, setCats] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchCategories().then(setCats).catch(e => setErr(String(e.message)));
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <h1>Danh mục</h1>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {cats.map(c => (
          <Link key={c.id} to={`/category/${c.slug}`} style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: 8 }}>
            {c.name}
          </Link>
        ))}
      </div>

      <Routes>
        <Route path="/" element={<div>Chọn danh mục phía trên để xem sản phẩm.</div>} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

function CategoryPage() {
  const { slug } = useParams();
  // Mặc định: Lazy Loading
  return <CategoryInfiniteList categorySlug={slug} />;
  // Đổi sang phân trang:
  // return <CategoryPagedList categorySlug={slug} />;
}
