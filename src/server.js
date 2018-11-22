const express = require('express')
const bodyParser = require('body-parser')
const instantiateIdentity = require('./validator')

const setupApp = () => {
  const app = express()

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.post('/authenticate', (req, res) => {
    const { token } = req.body
    console.log(token)
  })

  const port = 8000
  app.listen(port, () => console.log(`Service running on ${port}`))
}

instantiateIdentity().then(iw => {
  setupApp()
})