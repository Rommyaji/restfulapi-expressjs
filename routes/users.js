const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const usersModel = require('../models/users')
const passwordCheck = require('../utils/passwordCheck')
const verifyToken = require('../utils/auth')


// sign up user account
router.post('/register', async (req, res) => {
  
  const { Name, Password } = req.body
  
  try {
    const encrypt = await bcrypt.hash(Password, 10)

    const users = await usersModel.create({
       Name, Password: encrypt
    })
    res.status(200).json({
        data: users,
        metadata: 'Register success'
    })
  } catch(err) {
    res.status(500).json({
        error: err
    })
  }
})


// sign in user account with token generated
router.post('/login', async (req, res) => {
  const { Name, Password } = req.body

  try {
    const token = jwt.sign({Name}, process.env.API_SECRET, {expiresIn: '2h'})
    const check = await passwordCheck(Name, Password)

    if (check.compare === true) {
        res.status(200).json({
            token,
            metadata: 'login success'
        }
    ) 
    } else {
      res.status(400).json({
        data: 'incorrect Name or password'
      })
    }
    } catch (e) {
        res.status(400).json({
            error: "incorrect Name or password"
        })
      }
})



// protected with token
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await usersModel.findOne({where : {Name: req.Name}})
    res.status(200).json({
      users,
      metadata: 'get user data sucessfully with protected route'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'internal server error'
    })
  }
})


// update user data
router.put('/', verifyToken, async (req, res) => {
  const { Name, Password, newPassword } = req.body;

  try {
      const check = await passwordCheck(Name, Password); // Verify password using the user ID from the token
      if (check.compare) {
          const encrypt = await bcrypt.hash(newPassword, 10);
          const updatedUser = await usersModel.update(
              { Name, Password: encrypt },
              { where: { Name: req.Name } } // Update only the authenticated user's account
          );
          res.status(200).json({
              updatedUser,
              metadata: 'Update success',
          });
      } else {
          res.status(401).json({
              error: 'Incorrect password',
          });
      }
  } catch (err) {
      res.status(500).json({
          error: err.message,
      });
  }
});



router.delete('/', verifyToken, async (req, res) => {

  try {   
    const users = await usersModel.destroy(
          {where: {Name: req.name}}
    )
    res.status(200).json({
          data: `successfully delete ${users}`
    })
  } catch(err) {
    res.status(500).json({
      error: err
    })
  }
})


module.exports = router