const User = require('../models/user');
const jwt = require('jwt-simple');

const SECRET = process.env.SECRET ;

function tokenizeUser(user) {
    const timestamp = new Date().getTime();
    const payload = { sub: user.id, iat: timestamp } ;
    const token = jwt.encode( payload, SECRET) ;

    return token;
}


exports.signin = function(req, res) {
    const token = tokenizeUser(req.user) ;

    res.send( { token: token });
}


exports.signup = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }

    // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err) ;}

    // If that exists, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    // If user with email does not exist , create and save user record
    const user = new User({
      email: email,
      password: password
    })

    // Save the record to the database, it may take some time or error
    user.save( function(err){
      if(err) {return next(err);}

      // Respond to the request indicating the user was created
      res.json({token : tokenizeUser(user)})
      // res.json(user);  // We dont want to expose all user info, like password

    });

  });

}