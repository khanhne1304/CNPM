import { Op } from 'sequelize';
import db from '../db/models/index.js';

// GET /api/products?categorySlug=...&page=1&limit=12&sort=createdAt:desc
// or  /api/products?categorySlug=...&limit=12&cursor=123
export async function listProducts(req, res, next) {
  try {
    const { categorySlug, search, page, limit = 12, sort = 'createdAt:desc', cursor } = req.query;
    if (!categorySlug) return res.status(400).json({ message: 'categorySlug required' });

    const category = await db.Category.findOne({ where: { slug: categorySlug } });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const [sortField, sortDirRaw] = String(sort).split(':');
    const sortDir = (sortDirRaw || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const where = { categoryId: category.id };
    if (search) where.name = { [Op.like]: `%${search}%` };

    if (cursor) {
      const items = await db.Product.findAll({
        where: { ...where, id: { [Op.lt]: Number(cursor) || 0x7fffffff } },
        order: [['id', 'DESC']],
        limit: Number(limit),
      });
      const nextCursor = items.length ? items[items.length - 1].id : null;
      return res.json({ items, nextCursor, mode: 'cursor' });
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const offset = (pageNum - 1) * Number(limit);
    const { rows, count } = await db.Product.findAndCountAll({
      where,
      order: [[sortField || 'createdAt', sortDir]],
      limit: Number(limit),
      offset,
    });
    res.json({
      items: rows,
      total: count,
      page: pageNum,
      pageSize: Number(limit),
      totalPages: Math.ceil(count / Number(limit)),
      mode: 'offset',
    });
  } catch (e) { next(e); }
}
