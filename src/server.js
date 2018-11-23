const express = require('express')
const bodyParser = require('body-parser')
const instantiateIdentity = require('./validator')
const { JolocomLib } = require('jolocom-lib')

const setupApp = iw => {
  const app = express()

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.post('/credentialRequest', async (req, res) => {
    const { callbackURL } = req.body
    const credentialRequest = await iw.create.interactionTokens.request.share(
      {
        callbackURL,
        credentialRequirements: [
          {
            type: ['Credential', 'ProofOfEmailCredential'],
            constraints: []
          },
          {
            type: ['Credential', 'ProofOfNameCredential'],
            constraints: []
          }
        ]
      },
      'secret'
    )

    console.log('New authentication request generated')
    res.send(credentialRequest.encode())
  })

  app.post('/authenticate', async (req, res) => {
    const { token } = req.body
    const credentialResponse = await JolocomLib.parse.interactionToken.fromJWT(token)

    /**
     *  Ensure request and response match, will check the nonce, audience, and signature. Will check the callbackURL too in next
     *  minor release.
     */

    try {
      await iw.validateJWT(credentialResponse)
      console.log('Signature validated')
      console.log('request from', credentialResponse.issuer)
      res.send('OK')
    } catch (err) {
      res.sendStatus(401)
    }
  })

  const port = 8000
  app.listen(port, () => console.log(`Service running on ${port}`))
}

instantiateIdentity().then(iw => {
  setupApp(iw)
})
