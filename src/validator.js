const { JolocomLib } = require('jolocom-lib')
const { encryptionPassword, entropy } = require('../config')

module.exports = getRpiIdentityWallet = async () => {
  const keyProvider = new JolocomLib.KeyProvider(Buffer.from(entropy, 'hex'), encryptionPassword)

  const registry = JolocomLib.registries.jolocom.create()
  return registry.authenticate(keyProvider, {
    derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
    encryptionPass: encryptionPassword
  })
}