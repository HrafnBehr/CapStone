const { expressjwt } = require('express-jwt')

const jwt = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: true,
  getToken: (req) => {
    if (req.cookies.jwt) {
      return req.cookies.jwt
    }

    return null
  },
})

module.exports = { jwt }