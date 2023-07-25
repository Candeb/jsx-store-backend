import express from 'express';
import { getConfig } from './src/config/config';
import { createPrismaClient } from './src/config/prismaClient';
import { authRouter } from './src/auth/authRouter';

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use('/auth', authRouter);

const server = app.listen(port, () => {
  createPrismaClient();
  getConfig();
  console.log(`Example app listening on port ${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

let template = `
<!DOCTYPE html>
<html>
  <head>
    <title>Funcionando</title>
  </head>
  <body>
    <p>
      funcionando!
    </p>
  </body>
</html>

`;
console.log(template);
