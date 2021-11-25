const express = require('express');
const Tea = require('../models/Tea');

const router = express.Router();

//in-memory database with Teas 
// const teas = [ 
//     { id:'1', name:'Green Tea' }, 
//     { id:'2', name:'White Tea' },   //--> These ones we don't need here anymore. 
//     { id:'3', name:'Oolong Tea' }];

//READ OPERATION
//using GET (get list of teas)
router.get('/', async (req,res) => {
    const teas = await Tea.find();
    //status 200 response. OK
    return res.status(200).json(teas);
})

//READ OPERATION
//using a GET request with a id parameter 
router.get('/:id', async (req, res) =>{
    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);
    const tea = await Tea.findById(req.params.id)
    
    //we didn't find any tea with that id 
    if(!tea){
        return res.status(404).json("Tea not found");
    }

    //everything went ok (status code 200) and send the tea we found in the array. 
    return res.status(200).json(tea);
})

//READ OPERATION
//using a GET request with a name parameter
router.get('/byname/:name', async (req, res) =>{
    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);
    const tea = await Tea.findOne({'name':req.params.name})
    
    //we didn't find any tea with that id 
    if(!tea){
        return res.status(404).json("Tea not found");
    }

    //everything went ok (status code 200) and send the tea we found in the array. 
    return res.status(200).json(tea);

})

//READ OPERATION
//using a GET request with a id parameter 
router.get('/byname/multiple/:name', async (req, res) =>{
    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);
    const tea = await Tea.find({'name':req.params.name})
    
    //we didn't find any tea with that id 
    if(!tea){
        return res.status(404).json("Tea not found");
    }

    //everything went ok (status code 200) and send the tea we found in the array. 
    return res.status(200).json(tea);

})

//CREATE
//POST request to create a new tea.
router.post('/add', async (req, res) => {
    try {
      const resultTea = await Tea.create({
          name:req.body.name,
          description:req.body.description,
          category:req.body.category,
          price:req.body.price
      }) 

      return res.status(201).json({message:'Tea was created', createdTea:resultTea});
      
    } catch (error) {
       return res.status(500).json({message:'Error happened', error:error})
    }
})
//UPDATE OPERATION
//PATCH request to update the name of the tea. 
router.patch('/update/:id', async (req, res) => {

    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);

   const { body } = req;

    try {
        const tea = await Tea.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            description:req.body.description,
            price:req.body.price
        },{new:true})
    
        if(!tea){
            //sending 404 we can't find the resource (the tea)
            return res.status(404).json("Tea not found");
        }
    
        //return status code 200
        return res.status(200).json({updatedTea:tea}); 
    } catch (error) {
        return res.status(500).json({message:'Error happened', error:error})
    }


});

//UPDATE OPERATION
//PATCH request to update the name of the tea. 
router.patch('/update/description/:name', async (req, res) => {

    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);

    try {
        const tea = await Tea.findOneAndUpdate({name:req.params.name},{
            description:req.body.description
        },{new:true})
    
        if(!tea){
            //sending 404 we can't find the resource (the tea)
            return res.status(404).json("Tea not found");
        }
    
        //return status code 200
        return res.status(200).json({updatedTea:tea}); 
    } catch (error) {
        return res.status(500).json({message:'Error happened', error:error})
    }


});
//DELETE OPERATION  
//DELETE request 
router.delete('/delete/:id', async (req, res) => {
   //look for the tea in the tea array that has the :id from the entry point. 
   //const tea = teas.find(tea => tea.id == req.params.id);
   
    try {
        const tea = await Tea.findByIdAndDelete(req.params.id);

        if(!tea){
         //sending 404 we can't find the resource (the tea)
         return res.status(404).json("Tea not found");
        }
     
        //return a response statuscode 200 it worked out and show the new list of teas
        return res.status(200).json(tea); 
    } catch (error) {
        return res.status(500).json({message:'Error happened', error:error})
    }

});

//DELETE OPERATION  
//DELETE request 
router.delete('/delete/category/:category', async (req, res) => {
    //look for the tea in the tea array that has the :id from the entry point. 
    //const tea = teas.find(tea => tea.id == req.params.id);
    
     try {
         const deleteResult = await Tea.deleteMany({category:req.params.category})
 
         //returns the delete Result
         return res.status(200).json(deleteResult); 
     } catch (error) {
         return res.status(500).json({message:'Error happened', error:error})
     }
 
 });

module.exports = router;