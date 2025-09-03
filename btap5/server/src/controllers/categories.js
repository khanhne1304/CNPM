import db from '../db/models/index.js';
export async function listCategories(req, res, next) {
  try {
    const items = await db.Category.findAll({ order: [['name','ASC']] });
    res.json(items);
  } catch (e) { next(e); }
}
