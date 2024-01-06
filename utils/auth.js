const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

  const token = req.cookie.access_token
  if(!token || token === null) {
      return res.sendStatus(401)
  } else {
      jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.Name = decoded.Name
        next()
    })
  }
}


module.exports = verifyToken