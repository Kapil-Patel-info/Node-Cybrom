const mongoose = require("mongoose");


const profileSchema = new Schema({

firstName :{
    type : String,
    require : true
},
lastName :{
    type : String,
    require : true
}
});



