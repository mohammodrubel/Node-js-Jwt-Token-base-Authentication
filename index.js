const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 9000;

const userRouter = require('./Router/userRouter');
const checkLogin = require('./Middelware/checkLogin');

app.use(express.json());
app.use(cors());

// Connection
mongoose.connect(process.env.MONGOOSEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connection successful');
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });

app.use('/users',userRouter)


app.get('/',checkLogin, (req, res) => {
    res.send('Hello World!');
});

// error handeler 
app.use((err, req, res, next) => {
   console.log(err)
    res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error response
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
