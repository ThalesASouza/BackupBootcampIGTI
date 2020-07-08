import express from 'express';
import fs from 'fs';
import routers from './Rotas/roters.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use('/accounts', routers);

app.listen(port,() => {
  try {
    fs.readFile('accounts.json', 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          "nextId": 1,
          "accounts": []
        };
        fs.writeFile('accounts.json', JSON.stringify(initialJson), err => {
          if (err) {
            console.log(err);
          }
        });
      }
    });

  } catch (err) {
    console.log(err);
  }
  console.log('API started');
});


