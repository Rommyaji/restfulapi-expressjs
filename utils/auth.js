const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    req.Name = decoded.Name
    next()
  })
}


module.exports = verifyToken