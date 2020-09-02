const mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 20
    },
    breed: String
})

module.exports = mongoose.model('Dog', dogSchema)


  