'use strict';

const jwt = require('jsonwebtoken');
const { Users } = require('../models');

class LoginController {
  /**
   * POST /loginJWT
   */
   async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email })
    
      if (!user || !(await Users.comparePassword(password)) ) {
        const error = new Error('invalid credentials');
        error.status = 401;
        next(error);
        return;
      }

      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ token: jwtToken});
      });
      
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new LoginController();

