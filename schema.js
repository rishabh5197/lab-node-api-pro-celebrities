const mongoose = require('mongoose')
var userSchema = new mongoose.Schema(
    {
        name:{type:String, lowercase:true},
        occupation:{type:String},
        catchPrase:{type:String},
        celeb_id:{type:Number}
    },
    {collection:"celebrities"}
)
module.exports = mongoose.model('userModel',userSchema)