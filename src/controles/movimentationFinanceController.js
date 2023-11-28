const movimentationFinance = require('../modules/movimentationFinanceModule')

const registerDebit = async (req, res) => {
  try {
    const registredDebit = await movimentationFinance.registerDebit(req.body);
    return res.status(200).json(registredDebit);
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    return res.status(500).json({ error: 'Erro ao criar registro' });
  }
};

const registerCredit = async (req, res) => {
  try {
    const registredCredit = await movimentationFinance.registerCredit(req.body);
    return res.status(200).json(registredCredit);
  } catch (error) {
    console.error('Erro ao editar projeto:', error);
    return res.status(500).json({ error: 'Erro ao criar registro' });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const allDebits = await movimentationFinance.getAllTransactions(req.query);
    return res.status(200).json(allDebits)
  } catch (error) {
    console.error('Erro ao realizar ação:', error)
    return res.status(500).json({ error: 'Erro ao consultar registro' })
  }
}

module.exports = {
  registerDebit,
  registerCredit,
  getAllTransactions
}