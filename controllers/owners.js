const router = require('express').Router()

const db = require('../models')

router.get('/', (req, res) => {
    //get all the bounties
    db.Owner.find()
    .then(ownerArray => {
        console.log(ownerArray)
        res.send(ownerArray)
    }).catch(err => {
        console.log(err, 'error')
        res.status(503).send({message: 'Database asleep?'})
    })
})

//GET/:ID
router.get('/:id', (req, res) => {
    db.Owner.findById(req.params.id)
    .then(foundOwner=>{
        if(foundOwner){
            res.send(foundOwner)
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
    db.Owner.create(req.body)
    .then(createdOwner=>{
        console.log(createdOwner)
        res.status(201).send(createdOwner)
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
    db.Owner.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedOwner=>{
        res.send(updatedOwner)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
    // res.send('You\'ve hit the PUT /bounties/:id route!')
})

//DELETE /bounties
router.delete('/', (req, res) => {
    db.Owner.deleteMany()
    .then(() => {
        res.send({message: 'We did it?'})
    }) .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'Server Eror'})
    })
})

//DELETE
router.delete('/:id', (res,req) => {
    db.Owner.findByIdAndDelete(req.params.id)
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

