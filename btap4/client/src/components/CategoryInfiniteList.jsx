import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchProductsCursor } from '../api.js';

export default function CategoryInfiniteList({ categorySlug }) {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(undefined); // undefined: first; null: no more
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // chặn gọi API trùng khi IO bắn liên tiếp
  const isFetchingRef = useRef(false);
  const sentinelRef = useRef(null);

  const PAGE_SIZE = 1000; // tăng nếu muốn hiện nhiều hơn/lần

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current) return;
    if (nextCursor === null) return; // hết dữ liệu

    isFetchingRef.current = true;
    setLoading(true);
    setErr('');

    try {
      const data = await fetchProductsCursor({
        categorySlug,
        limit: PAGE_SIZE,
        cursor: nextCursor, // undefined lần đầu -> API sẽ tự bỏ qua
      });

      setItems((prev) => [...prev, ...(data.items || [])]);
      setNextCursor(data.nextCursor ?? null);
      // Log để kiểm tra
      console.log('[IO] loaded batch, total items =', (items.length + (data.items?.length || 0)));
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [categorySlug, nextCursor, items.length]);

  // Reset khi đổi danh mục
  useEffect(() => {
    setItems([]);
    setNextCursor(undefined);
    setErr('');
  }, [categorySlug]);

  // Lần đầu tự tải
  useEffect(() => {
    // khi nextCursor = undefined => lần đầu
    if (nextCursor === undefined && !isFetchingRef.current) {
      loadMore();
    }
  }, [nextCursor, loadMore]);

  // IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries || [];
        if (entry?.isIntersecting) {
          console.log('[IO] sentinel intersecting');
          loadMore();
        }
      },
      {
        // kéo gần đáy ~1000px đã tải tiếp -> cảm giác "lướt tới đâu tải tới đó"
        root: null, // viewport
        rootMargin: '1000px 0px', // trên-dưới 1000px
        threshold: 0,
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  // Dự phòng: nếu vì lý do layout mà IO không bắn, cho nút "Tải thêm"
  const manualLoadMore = () => {
    loadMore();
  };

  const hasMore = nextCursor !== null;

  return (
    <div style={{ paddingBottom: 24 }}>
      <h2 style={{ margin: '8px 0' }}>Lazy loading (infinite scroll)</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          alignItems: 'start',
        }}
      >
        {items.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 8 }}>
            <img
              src={p.image}
              alt={p.name}
              style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10 }}
              loading="lazy"
            />
            <div style={{ marginTop: 6, fontWeight: 600 }}>{p.name}</div>
            <div style={{ marginTop: 4 }}>{Number(p.price).toLocaleString('vi-VN')} ₫</div>
          </div>
        ))}
      </div>

      {/* trạng thái */}
      {err && <div style={{ color: 'red', marginTop: 12 }}>{err}</div>}
      {loading && <div style={{ marginTop: 12 }}>Đang tải…</div>}
      {!loading && hasMore && (
        <button
          onClick={manualLoadMore}
          style={{
            marginTop: 12,
            padding: '8px 14px',
            border: '1px solid #ddd',
            borderRadius: 8,
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Tải thêm
        </button>
      )}
      {!hasMore && <div style={{ marginTop: 12, color: '#666' }}>Đã hết sản phẩm</div>}

      {/* sentinel cho IO – đặt CUỐI CÙNG để luôn nằm dưới */}
      <div ref={sentinelRef} style={{ height: 2 }} />
    </div>
  );
}
