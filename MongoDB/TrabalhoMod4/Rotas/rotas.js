import express from 'express';
import { bancoModel } from '../model/model.js';

const route = express.Router();

// EndpointDepositar
route.put('/deposito', async (req, res) => {
  let body = req.body;
  try {
    const { conta, agencia, valor } = body;
    const valorDeposito = valor + 1;
    const depositar = await bancoModel.findOneAndUpdate(
      {
        agencia: agencia,
        conta: conta,
      },
      {
        $inc: { balance: valorDeposito }
      },
      { new: true }

    );
    if (!depositar) {
      res.status(400).send("Conta ou agencia não encontrados");
    }
    res.send(depositar);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint Sacar 

route.put('/saque', async (req, res) => {
  let body = req.body;
  try {
    const { conta, agencia, valor } = body;
    const valorSaque = valor + 1;
    const verificaSaldo = await bancoModel.findOne(
      {
        agencia: agencia,
        conta: conta.toString(),
      },
      {});

    if (!verificaSaldo) {
      res.status(400).send("Conta ou agencia não encontrados");
    }

    if (verificaSaldo.balance > valorSaque) {
      const sacar = await bancoModel.findOneAndUpdate(
        {
          agencia: agencia,
          conta: conta,
        },
        { $inc: { balance: -valorSaque } },
        { new: true }
      );
      res.send(sacar);
    }
    res.status(400).end("Conta sem valor disponivel para o saque");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint Consultar Saldo

route.get('/consultarSaldo/:conta/:agencia', async (req, res) => {
  const { conta, agencia } = req.params;
  try {
    const consultarSaldo = await bancoModel.findOne(
      {
        agencia: agencia,
        conta: conta.toString(),
      },
      { balance: 1 });

    if (!consultarSaldo) {
      res.status(400).send("Conta ou agencia não encontrados");
    }
    const saldo = consultarSaldo.balance;
    res.send(`Seu saldo é: R$ ${saldo}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Excluir Conta

route.delete('/excluirConta/:conta/:agencia', async (req, res) => {
  const { agencia, conta } = req.params;
  try {
    const deletarConta = await bancoModel.findOneAndDelete(
      {
        agencia: agencia,
        conta: conta.toString(),
      }
    );
    if (!deletarConta) {
      res.status(400).send("Agencia e conta não encontrados");
    }
    const contasPorAgencia = await bancoModel.find(
      {
        agencia: agencia
      }
    );
    res.send(`Existem ${contasPorAgencia.length} contas ativas para essa agencia`)
  } catch (error) {
    res.status(500).send(error);
  }
});

//Transferencia entre contas

route.put('/transferir', async (req, res) => {
  const { contaOri, contaDes, valor } = req.body;
  try {
    const contaOrigem = contaOri.toString();
    const contaDestino = contaDes.toString();
    const taxaIgual = valor;
    const taxaDiferente = valor + 8;
    console.log(taxaDiferente);
    const procurarContaOrigem = await bancoModel.find(
      { conta: contaOrigem },
      { agencia: 1 });
    const procurarContaDestino = await bancoModel.find(
      { conta: contaDestino },
      { agencia: 1 });

    if (!procurarContaOrigem) {
      res.status(400).send("Conta de origem não encontrada");
    }
    if (!procurarContaDestino) {
      res.status(400).send("Conta de destino não encontrada");
    }

    if (procurarContaDestino.agencia === procurarContaOrigem.agencia) {
      const transferir = await bancoModel.findOneAndUpdate(
        { conta: contaDestino },
        { $inc: { balance: valor } }
      );

      const debitar = await bancoModel.findOneAndUpdate(
        { conta: contaOrigem },
        { $inc: { balance: -taxaIgual } },
        { new: true }
      );
      res.send(debitar);
    }

    if (!(procurarContaDestino.agencia === procurarContaOrigem.agencia)) {
      const transferir = await bancoModel.findOneAndUpdate(
        { conta: contaDestino },
        { $inc: { balance: valor } }
      );

      const debitar = await bancoModel.findOneAndUpdate(
        { conta: contaOrigem },
        { $inc: { balance: - taxaDiferente } },
        { new: true }
      );
      res.send(debitar);
    }

  } catch (error) {
    res.status(500).send(error)
  }
})

export default route;
