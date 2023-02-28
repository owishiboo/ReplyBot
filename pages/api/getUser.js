const { User } = require("../../models/user");
var jwt = require('jsonwebtoken');

export default async function auth(req, res, next){
    try {
      const token = req.header('Authorization')
      const decoded = jwt.verify(token, 'supersecret');
      //const user = await User.findOne({ email: decoded.email });
      console.log(decoded);
    //   if (!user) {
    //     throw new Error();
    //   }
  
    //   req.token = token;
    //   req.user = user;
    //   res.send({user:user});
    //   next();
    } catch (e) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
  
  module.exports = auth;