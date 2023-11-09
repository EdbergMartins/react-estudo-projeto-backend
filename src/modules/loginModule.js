const bcrypt = require('bcrypt');
const connection = require('./conections')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const verifyPassword = async (passwordReceived, hashBd) => {

  bcrypt.compare(passwordReceived, hashBd, (err, result) => {
    if (err) {
      console.error('Erro na comparação de senhas:', err);
      return err
    } else {
      if (result) {
        console.log('Senha válida');
        return true
      } else {
        console.log('Senha inválida');
        return false
      }
    }
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
      return 'Usuário não cadastrado.';
    }
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};


module.exports = {
  loginUser
};