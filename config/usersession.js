const cript = require('crypto')
const generateToken = () => {
    const session = cript.randomUUID({
        disableEntropyCache: true
    })
    return session;
}

module.exports = {
    generateToken
}