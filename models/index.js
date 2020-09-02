const mongoose = require('mongoose')

// Set up connection for mongoose
mongoose.connect('mongodb://localhost/dog-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// shortcut to our mongoose.connection object
const db = mongoose.connection

// set up an event listener to fire once the connection opens
db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (error) => {
    console.error(`database error:\n${error}`)
})

// export things
module.exports.Dog = require('./dog')
module.exports.Owner = require('./owner')
