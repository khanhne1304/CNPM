import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';

const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', categoriesRouter);
app.use('/api', productsRouter);

app.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT);
});
