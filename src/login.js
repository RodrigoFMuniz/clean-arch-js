
module.exports = () => {
  router.post('/signup', new SignUpRouter().route)
}

const express = require('express')
const router = express.Router()

class SignUpRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    new SignUpUseCase().signUp(email, password, repeatPassword)

    res.status(400).json({ error: 'Password didn\'t match' })
  }
}

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountrepository().add(email, password)
    }
  }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountrepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
