import mongoose from 'mongoose';
import fs from 'fs';
mongoose.connect('mongodb+srv://root:1234@cluster0-ycbto.mongodb.net/myBankApi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log("Conectado")
).catch((err) => {
  console.log("Error" + err);
});

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

const bancoSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  agencia: {
    type: Number,
    require: true
  },
  conta: {
    type: String,
    require: true
  },
  balance: {
    type: Number,
    require: true,
    min: 0
  }
});

mongoose.model('banco', bancoSchema, 'banco');

const banco = mongoose.model('banco');

/*new student({
  name: "Paulo Assis",
  subject:"Matematica",
  type:"Trabalho Pratico",
  value:22
}).save().then(()=>
console.log("Documento inserido")
).catch((err)=>{
  console.log("Erro"+err);
});
*/

fs.readFile('accounts.json', 'utf8', (_, data) => {
  let json = JSON.parse(data);
   json.forEach(dados => {
    new banco(dados).save().then(() =>
      console.log("Documento inserido")
    ).catch((err) => {
      console.log("Erro" + err);
    });
  });
});
