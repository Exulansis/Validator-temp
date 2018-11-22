const express = require('express')
const bodyParser = require('body-parser')
const instantiateIdentity = require('./validator')
const { JolocomLib } = require('jolocom-lib')

const setupApp = (iw) => {
  const app = express()

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.post('/authenticate', async (req, res) => {
    const { token } = req.body
    const credentialResponse = await JolocomLib.parse.interactionToken.fromJWT(token)
  
    /** Ensure request and response match, will check the nonce, audience, and signature. Will check the callbackURL too in next
      *  minor release.
      */
  
    await serviceIdentity.validateJWT(response, null)
    console.log(credentialResponse)
  
    if (!response.interactionToken.satisfiesRequest(request.interactionToken)) {
      throw new Error('Invalid credential passed, make sure issuer is currect.')
    }
  })

  const port = 8000
  app.listen(port, () => console.log(`Service running on ${port}`))
}

instantiateIdentity().then(iw => {
  setupApp(iw)
})