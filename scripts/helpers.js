const userSchema = require("./User");

// uses passport authentication infrastructure to check if authentication is 
// needed at some point in middleware pipeline. 
function ensureAuthenticated (req, resp, next) {
   if (req.isAuthenticated()) {
     return next();
   }
   req.flash('info', 'Please log in to view that resource');
   resp.render('login2', {message: req.flash('info')} );
}

// // We'll use this later on to check if user has the correct credentials. 
// // Can't be arrow syntax because need 'this' within it
// userSchema.methods.isValidPassword = async function(formPassword) { 
//   const user = this; 
//   const hash = user.password; 
//   // Hashes the password sent by the user for login and checks if the 
//   // digest stored in the database matches the one sent. Returns true 
//   // if it does else false.
//   const compare = await bcrypt.compare(formPassword, hash); 
//   return compare; 
//  }
module.exports = { ensureAuthenticated };
