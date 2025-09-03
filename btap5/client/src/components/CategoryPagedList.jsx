import { useEffect, useMemo, useState } from 'react';
import { fetchProductsPage } from '../api.js';

export default function CategoryPagedList({ categorySlug }) {
  const [data, setData] = useState({ items: [], page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => { setPage(1); }, [categorySlug]);

  useEffect(() => {
    setLoading(true); setErr('');
    fetchProductsPage({ categorySlug, page, limit })
      .then(setData)
      .catch(e => setErr(String(e.message)))
      .finally(() => setLoading(false));
  }, [categorySlug, page]);

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= (data.totalPages || 1); i++) arr.push(i);
    return arr;
  }, [data.totalPages]);

  return (
    <div>
      <h2>Phân trang (offset/limit)</h2>
      {loading && <div>Đang tải…</div>}
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {(data.items || []).map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 8 }}>
            <img src={p.image} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10 }} />
            <div style={{ marginTop: 6, fontWeight: 600 }}>{p.name}</div>
            <div style={{ marginTop: 4 }}>{Number(p.price).toLocaleString('vi-VN')} ₫</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Trước</button>
        {pages.map(p => (
          <button key={p} onClick={() => setPage(p)} style={{ fontWeight: p===page ? 700 : 400 }}>{p}</button>
        ))}
        <button disabled={page>=(data.totalPages||1)} onClick={() => setPage(p => Math.min((data.totalPages||1), p+1))}>Sau</button>
      </div>
    </div>
  );
}
