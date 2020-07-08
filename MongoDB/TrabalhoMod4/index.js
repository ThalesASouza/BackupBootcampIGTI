import express from 'express';
import route from './Rotas/rotas.js';

const app = express();
app.use(express.json());
app.use('/myBankApi', route);

const port = 3000;

app.listen(port, () => {
  try {
    console.log("Api started");
  } catch (err) {
    console.log("Error" + err);
  }
})