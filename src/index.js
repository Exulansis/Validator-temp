const getRpiIdentityWallet = require('./validator')
const getConfiguredServer = require('./server')

const PORT = 8000

getRpiIdentityWallet().then(rpiIdentity => {
  const server = getConfiguredServer(rpiIdentity)
  server.listen(PORT, () => console.log(`Service running on ${PORT}`))
})
