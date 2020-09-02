const router = require('express').Router()

const db = require('../models')

router.get('/', (req, res) => {
    //get all the bounties
    db.Dog.find()
    .then(dogArray => {
        console.log(dogArray)
        res.send(dogArray)
    }).catch(err => {
        console.log(err, 'error')
        res.status(503).send({message: 'Database asleep?'})
    })
})

//GET/:ID
router.get('/:id', (req, res) => {
    db.Dog.findById(req.params.id)
    .then(foundDog=>{
        if(foundDog){
            res.send(foundDog)
        } else {
            res.status(404).send({message: 'Resource not located.'})
        }
    }).catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Service Unavaliable'})
    })
//    res.send('GETTING ID')
})

//Post
router.post('/', (req, res) => {
    db.Dog.create(req.body)
    .then(createdDog=>{
        console.log(createdDog)
        res.status(201).send(createdDog)
    })
    .catch(err => {
        console.log('Error while creating new bounty', err)
        if(err.name === 'Validation Error') {
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database or sever'})
        }
    })
    // res.send('post')
})

//put /bounties/:id
router.put('/:id', (req, res)=>{
    db.Dog.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedDog=>{
        res.send(updatedDog)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
    // res.send('You\'ve hit the PUT /bounties/:id route!')
})

//DELETE /bounties
router.delete('/', (req, res) => {
    db.Dog.deleteMany()
    .then(() => {
        res.send({message: 'We did it?'})
    }) .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Eror'})
    })
})

//DELETE
router.delete('/:id', (res,req) => {
    db.Dog.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
    // res.send('delete')
})

module.exports = router

