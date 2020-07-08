import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://root:1234@cluster0-ycbto.mongodb.net/myBankApi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log("Conectado")
).catch((err) => {
  console.log("Error" + err);
});

const bankSchema = mongoose.Schema({

  agencia: {
    type: Number,
    require: true
  },
  conta: {
    type: String,
    require: true
  },
  nome: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    min: 0
  }
});
const bancoModel = mongoose.model('banco', bankSchema, 'banco');

export {bancoModel};