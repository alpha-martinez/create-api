const express = require ('express');
const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use('/dogs', require('./controllers/dogs'));
app.use('/owners', require('./controllers/owners'));

app.get('/', (req, res) => {
    res.send(`You've hit the home route`)
})

app.listen(8000, () => {
    console.log('Hello')
})