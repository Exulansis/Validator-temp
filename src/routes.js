const configuration = require('../config')
const {JolocomLib} = require('jolocom-lib')

module.exports = setUpRoutes = (app, rpiIdentity) => {

  /** @description Endpoint returning a credential request JWT, can run on backend */
  app.get('/authenticate', async (req, res) => {
    const credentialRequest = await rpiIdentity.create.interactionTokens.request.share(
      {
        callbackURL: configuration.callbackURL,
        credentialRequirements: configuration.credentialRequirements
      },
      configuration.encryptionPassword
    )

    console.log('New authentication request generated')
    res.send(credentialRequest.encode())
  })

  /** @description Endpoint consuming the client's credential response and completing the authentication */
  app.post('/authenticate', async (req, res) => {
    const {token} = req.body
    console.log(`Received token ${token.substring(0, 25)}... Decoding`)
    const credentialResponse = await JolocomLib.parse.interactionToken.fromJWT(token)

    console.log(`Token from ${credentialResponse.issuer} received. Validating`)

    try {
      await rpiIdentity.validateJWT(credentialResponse)
      console.log('Validated')
      res.send('OK')
    } catch (err) {
      console.log('Validation failed')
      res.sendStatus(401)
    }
  })
}

