const loginModule = require('../modules/loginModule')

const loginUser = async (rec, res) => {
  const users = await loginModule.loginUser(rec);
  return res.status('201').json(users)
}

module.exports = {
  loginUser
}