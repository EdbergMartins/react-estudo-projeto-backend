const connection = require('./conections')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()


const registerDebit = async (date) => {
  const { id, idProject, value, description, type } = date;
  try {
    const id = uuidv4();
    const createdDateUtc = new Date(Date.now());
    const createdProject = await connection.execute('INSERT INTO Transactions (id, idProject, type, value, description) VALUES (?, ?, ?, ?, ?)', [id, idProject, 'debit', value, description]);
    const [projectCreated] = await connection.execute('SELECT * FROM Transactions ORDER BY data_transaction DESC LIMIT 1; ')
    const data = new Date(projectCreated[0].data_transaction)
    const dia = data.getDate();
    const mes = data.getMonth()
    const ano = data.getFullYear();
    projectCreated[0].data_transaction = `${dia}/${mes}/${ano}`
    return projectCreated
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};

const registerCredit = async (date) => {
  const { id, idProject, value, description, type } = date;
  try {
    const id = uuidv4();
    const createdDateUtc = new Date(Date.now());
    const createdProject = await connection.execute('INSERT INTO Transactions (id, idProject, type, value, description) VALUES (?, ?, ?, ?, ?)', [id, idProject, 'credit', value, description]);
    const [projectCreated] = await connection.execute('SELECT * FROM Transactions ORDER BY data_transaction DESC LIMIT 1; ')
    const data = new Date(projectCreated[0].data_transaction)
    const dia = data.getDate();
    const mes = data.getMonth()
    const ano = data.getFullYear();
    projectCreated[0].data_transaction = `${dia}/${mes}/${ano}`
    console.log(projectCreated)
    return projectCreated
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};


const getAllTransactions = async (date) => {
  let totalCredits = {}
  let totalDebits = {}
  try {
    let totalCredits = 0
    let totalDebits = 0
    const [debits] = await connection.execute('SELECT * FROM Transactions WHERE idProject=? AND type="debit" ORDER BY data_transaction DESC', [date.id]);
    debits.forEach(element => {
      const data = new Date(element.data_transaction)
      const dia = data.getDate();
      const mes = data.getMonth()
      const ano = data.getFullYear();
      element.data_transaction = `${dia}/${mes}/${ano}`

      totalDebits = totalDebits + parseFloat(element.value)
    });
    const [credits] = await connection.execute('SELECT * FROM Transactions WHERE idProject=? AND type="credit" ORDER BY data_transaction DESC', [date.id]);
    credits.forEach(element => {
      const data = new Date(element.data_transaction)
      const dia = data.getDate();
      const mes = data.getMonth()
      const ano = data.getFullYear();
      element.data_transaction = `${dia}/${mes}/${ano}`
      totalCredits += parseFloat(element.value)
    });
    const returnDebits = { ...debits, "totalDebits": totalDebits }
    const returnCredits = { ...credits, "totalCredits": totalCredits }
    const allTransactions = { returnDebits, returnCredits }
    return allTransactions;
  } catch (error) {
    console.error('Erro ao consultar dado:', error);
    throw error;
  }
}

const getCredits = async (date) => {
  try {
    const [allCredits] = await connection.execute('SELECT * FROM Transactions WHERE idProject=? AND type="credit"  ', [date.id]);
    let totalCredits = 0
    allCredits.forEach(element => {
      totalCredits += parseFloat(element.value)
    });
    return { ...allCredits, "totalDebits": totalCredits };
  } catch (error) {
    console.error('Erro ao consultar dado:', error);
    throw error;
  }
}

const editRegister = async (date) => {
  const { id, description } = date
  try {
    connection.connect('')
  } catch (error) {
    console.error('Erro ao editar dado:', error);
    throw error;
  }

}

module.exports = {
  registerDebit,
  registerCredit,
  getAllTransactions,
  getCredits
};