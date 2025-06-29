const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  // Seuraavaksi katsotaan onko pyynnön mukana oleva password oikea.
  // Koska tietokantaan ei ole talletettu salasanaa, vaan salasanasta
  // laskettu hash, tehdään vertailu metodilla bcrypt.compare.

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Jos salasana on oikein, luodaan metodin jwt.sign avulla token,
  // joka sisältää digitaalisesti allekirjoitetussa muodossa käyttäjätunnuksen ja käyttäjän id
  
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter