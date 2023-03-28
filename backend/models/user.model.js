const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,  
        minLength: 3
    }, 
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,  
        minLength: 3
    }, 
    password: {
        type: String,
        required: true,
        trim: true,  
        minLength: 3
    }, 

}, {
    timestamps: false,
})


const User = mongoose.model('User', userSchema);

module.exports=User;