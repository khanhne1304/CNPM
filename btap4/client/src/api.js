const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function api(path, opts) {
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export const fetchCategories = () => api('/categories');
export const fetchProductsPage = ({ categorySlug, page = 1, limit = 12 }) => {
  const qs = new URLSearchParams({ categorySlug, page, limit, sort: 'createdAt:desc' });
  return api(`/products?${qs.toString()}`);
};
export const fetchProductsCursor = ({ categorySlug, limit = 12, cursor }) => {
  const qs = new URLSearchParams({ categorySlug, limit });
  if (cursor !== undefined) qs.set('cursor', cursor);
  return api(`/products?${qs.toString()}`);
};
