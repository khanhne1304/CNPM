'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// ✅ Nạp CommonJS config.cjs trong môi trường ESM
//   (đảm bảo file này tồn tại: server/config/config.cjs)
const fullConfig = require('../../../config/config.cjs');
const config = fullConfig[env] || fullConfig;

const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // ⚠️ Phải có dialect: 'mysql' trong config.cjs
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc tất cả model .js (trừ chính index.js) và import bằng file:// URL
const files = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith('.js'));

await Promise.all(
  files.map(async (file) => {
    const abs = path.join(__dirname, file);
    const url = pathToFileURL(abs).href; // ✅ fix 'd:' scheme trên Windows
    const mod = await import(url);
    const model = mod.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }),
);

// Gọi associate nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
