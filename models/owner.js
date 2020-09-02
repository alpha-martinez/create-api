const mongoose = require('mongoose');

let ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 20
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    }]

})

module.exports = mongoose.model('Owner', ownerSchema)
