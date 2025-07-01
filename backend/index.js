const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const AuthRouter = require('./routes/AuthRouter');
const Dashboard = require('./routes/Dashboard');

app.get('/', (req, res) => {
    res.status(200).json({
        name: "hello world!",
        user: req.user, 
    }); 
  });

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/dashboard',Dashboard);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})