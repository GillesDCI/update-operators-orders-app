const express = require('express');
const User = require('../models/User');

const router = express.Router();

//List of all the users 
router.get('/', async (req,res) => {

    const users = await User.find({}).select('firstname lastname'); //.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
});

//creating a new user 
router.post('/add',async (req, res) => {
    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username
        })
        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
});

//updating the document partly (adding one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/add/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorite":"GARDEN"}
//
router.patch('/favorites/add/one/:id', async (req, res) => {
         
    const { favorite } = req.body;
    const { id } = req.params;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, { $push:{favorites:favorite}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});

//updating the document partly (adding one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/add/multiple/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorites":"GARDEN,ELECTRONICS,KITCHEN,CLOTHING"}
//
router.patch('/favorites/add/multiple/:id', async (req, res) => {
         
    const { favorites } = req.body;
    const { id } = req.params;

    const favoritesArray = favorites.split(',');

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, { $push:{favorites:{$each:favoritesArray}}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});

//updating the document partly (adding one favorite at a time and unique element)
// URL: http://localhost:4000/api/users/favorites/add/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"favorite":"GARDEN"}
//
router.patch('/favorites/add/one/unique/:id', async (req, res) => {
         
    const { favorite } = req.body;
    const { id } = req.params;

    try {
        //adds the value to the array if the value does not already exist in the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $addToSet:{favorites:favorite}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});

// updating the document partly (removing one favorite at a time)
// URL: http://localhost:4000/api/users/favorites/remove/one/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : EMPTY
//
router.patch('/favorites/remove/one/:id', async (req, res) => {
         
    const { id } = req.params;

    try {
        //remove a value from the array. 
        //-1 deletes the first element. 
        //1 deletes the last element. 
        const updatedUser = await User.findByIdAndUpdate(id, { $pop:{favorites:1}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});

// updating the document partly (setting a field)
// URL: http://localhost:4000/api/users/update/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : {"username":"test"}
//
router.patch('/update/:id', async (req, res) => {

    const { username } = req.body;
    const { id } = req.params;

    try {
        //remove a value from the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $set:{username:username}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});

// remove the field of the document (remove a field)
// URL: http://localhost:4000/api/users/update/removefield/USERID:Mongoose.Schema.ObjectId
// HTTP BODY : EMPTY
router.patch('/update/removefield/:id', async (req, res) => {

    const { id } = req.params;

    try {
        //remove a key/value from the array. 
        const updatedUser = await User.findByIdAndUpdate(id, { $unset:{username:""}}, {new:true})

        if(!updatedUser) return res.status(404).json({message: 'User not found'});

        return res.status(200).json({message:'User was updated', updatedUser:updatedUser});


    } catch (error) {
        return res.status(400).json({message:'Error happened', error})
    }
});




module.exports = router;