const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

//allow us to send json information to the server. 
app.use(express.json());
//setting up cors
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
,{
   useNewUrlParser:true, //default true
   useUnifiedTopology:true //default true
})
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})

const teaRoutes = require('./routes/teaRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

//register routes
app.use('/api/teas', teaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


//listening for requests
app.listen(4000, () => {
    console.log("The server is listening for requests...")
})
