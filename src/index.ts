import express from 'express';
import { router } from './cep/routes/cep-routes';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

const cepRouter = router

app.use(cepRouter)