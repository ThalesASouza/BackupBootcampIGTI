import express from 'express';
import fs from 'fs';
import mysql from 'mysql';
const route = express.Router();


route.post('/', (req, res) => {
  let account = req.body;
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId, ...account };
        json.nextId++;
        json.accounts.push(account);
        fs.writeFile('accounts.json', JSON.stringify(json), err => {
          if (err) {
            res.status(400).send({ error: err.message });
          } else {
            res.end();
          }
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });
})
route.get('/', (_, res) => {
  /*fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('erros');
    } else {
      let json = JSON.parse(data);
      delete json.nextId;
      res.send(json);
    }
  })*/
  execSQLQuery('SELECT * FROM cliente', res);
});

route.get('/:id', (req, res) => {
  fs.readFile('accounts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('erros');
    } else {
      let json = JSON.parse(data);
      const account = json.accounts.filter(account => {
        return account.id === parseInt(req.params.id)
      });
      res.send(account);
    }
  })
});

route.delete('/:id', (req, res) => {
  fs.readFile('accounts.json', 'utf8', (err, data) => {

    try {
      if (err) throw err;

      let json = JSON.parse(data);
      let accounts = json.accounts.filter(account => account.id !== parseInt(req.params.id, 10));
      json.accounts = accounts;

      fs.writeFile('accounts.json', JSON.stringify(json), err => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });

    } catch (err) {
      res.status(400).send('error:' + err.message);

    }


  });


})


function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'pedidothales'
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
  });
}
export default route;