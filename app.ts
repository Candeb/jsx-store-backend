import express from 'express';
import { getConfig } from './src/config/config';
import { createPrismaClient } from './src/config/prismaClient';
import { authRouter } from './src/auth/authRouter';
import { productRouter } from './src/product/productRouter';
import { brandsRouter } from './src/brands/brandsRouter';
import { orderRouter } from './src/order/orderRouter';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3002;

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/brand', brandsRouter);

const server = app.listen(port, () => {
  createPrismaClient();
  getConfig();
  console.log(`Server running on port ${port}!`);
  console.log(`CORS-enabled web server listening on port ${port}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
