const  mongoose = require("mongoose");

const userSchema = new Schema({
  
  email: {
        type: String,
        require: true
    },
   password: {
        type: String,
        require: true
    }
});



const User = mongoose.model('user', userSchema);
