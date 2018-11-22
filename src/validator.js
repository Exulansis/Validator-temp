const { JolocomLib } = require('jolocom-lib')

module.exports = instantiateIdentity = async () => {
  const entropy = Buffer.from('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'hex')
  const pass = 'secret'
  const keyProvider = new JolocomLib.KeyProvider(entropy, pass)
  
  const registry = JolocomLib.registries.jolocom.create()
  return registry.authenticate(keyProvider, {
    derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
    encryptionPass: pass
  })
}
