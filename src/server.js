const express = require('express')
const bodyParser = require('body-parser')
const setUpRoutes = require('./routes')

/**
 * @description - Returns an instance of the express server with configured routes
 * @param rpiIdentity - Identity wallet instantiated with the rpi entropy / password
 * @return express - Instance of express server
 */
module.exports = getConfiguredServer = rpiIdentity => {
  const app = express()

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  setUpRoutes(app, rpiIdentity)
  return app
}