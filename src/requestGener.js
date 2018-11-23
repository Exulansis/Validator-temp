const { JolocomLib } = require('jolocom-lib')
const instantiateIdentity = require('./validator')

instantiateIdentity().then(async iw => {
  const callbackURL = 'dflow://authenticate/'
  const credentialRequest = await iw.create.interactionTokens.request.share({
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
    ],
  }, 'secret')
  
  console.log(credentialRequest.encode())
})

JolocomLib.parse.interactionToken.fromJWT('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpbnRlcmFjdGlvblRva2VuIjp7ImNyZWRlbnRpYWxSZXF1aXJlbWVudHMiOlt7InR5cGUiOlsiQ3JlZGVudGlhbCIsIlByb29mT2ZFbWFpbENyZWRlbnRpYWwiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiQ3JlZGVudGlhbCIsIlByb29mT2ZOYW1lQ3JlZGVudGlhbCJdLCJjb25zdHJhaW50cyI6W119XSwiY2FsbGJhY2tVUkwiOiJkZmxvdzovL2F1dGhlbnRpY2F0ZS8ifSwidHlwIjoiY3JlZGVudGlhbFJlcXVlc3QiLCJpYXQiOjE1NDI5NjU1MjAyMzEsImV4cCI6MTU0Mjk2OTEyMDIzMSwiaXNzIjoiZGlkOmpvbG86YjJkNWQ4ZDZjYzE0MDAzMzQxOWI1NGEyMzdhNWRiNTE3MTA0MzlmOWY0NjJkMWZjOThmNjk4ZWNhN2NlOTc3NyNrZXlzLTEiLCJqdGkiOiI2ZGJmMTBkMTk0NzFmIn0.fabc1188f8293517f5c55d775c331f80be7f287b7f78b4cf6b79a836e3d9530b461cd773b736a3af063ba222dd1645249d7a8124c3d8bdfe574620e823cf22c')