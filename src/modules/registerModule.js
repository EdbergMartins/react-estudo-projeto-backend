const bcrypt = require('bcrypt');
const connection = require('./conections')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const loginModule = require('./loginModule')
require('dotenv').config()

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseFloat(process.env.HASH_CRYPTO));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};


const getUsers = async () => {
  const users = await connection.execute('SELECT * FROM users ORDER BY id ASC;');
  return users
}

const registerUser = async (user) => {
  const id = uuidv4();
  const { email, password } = user;
  try {
    const passwordCrypto = await hashPassword(password);
    const createdDateUtc = new Date(Date.now());
    const userse = getUsers()
    const unicUser = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (unicUser[0].length === 0) {
      const [createUser] = await connection.execute('INSERT INTO users (id,email, password, created_at) VALUES (?, ?, ?, ?)', [id, email, passwordCrypto, createdDateUtc]);
      const createduser = await connection.execute('SELECT * FROM users WHERE email = ?', [email])
      delete createduser[0][0].password
      return createduser[0][0]
    } else {
      return 'Usuário já cadastrado';
    }
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};


module.exports = {
  registerUser,
  getUsers
};