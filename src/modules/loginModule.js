const bcrypt = require('bcrypt');
const connection = require('./conections')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const verifyPassword = async (passwordReceived, hashBd) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordReceived, hashBd, (err, result) => {
      if (err) {
        console.error('Erro na comparação de senhas:', err);
        reject(err);
      } else {
        if (result) {
          console.log('Senha válida');
          resolve(true);
        } else {
          console.log('Senha inválida');
          resolve(false);
        }
      }
    });
  });
}


const loginUser = async (user) => {
  const { email, password } = user.body;
  try {
    const [unicUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    const validPassword = await verifyPassword(password, unicUser[0].password)
    console.log(validPassword)
    if (unicUser[0].id != undefined && validPassword) {
      const secretKey = process.env.KEY_JWT;
      const token = jwt.sign(unicUser[0], secretKey, { expiresIn: '1h' });
      const userWithJwt = { ...unicUser[0], token }
      return userWithJwt
    }
    else {
      return 'Dados incorretos, tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};


module.exports = {
  loginUser
};