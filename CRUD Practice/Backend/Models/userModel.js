const crudSchema = new Schema({
   name: {
        type: String,
        require: true
    },
  email: {
        type: String,
        require: true
    },
   password: {
        type: String,
        require: true
    },
     Date: {
        type: String,
        default : Date.now()
    }
});



const User = mongoose.model('CRUD', crudSchema);
