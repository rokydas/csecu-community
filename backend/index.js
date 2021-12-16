const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// import routes
const authHandler = require('./routes/auth');
const notificationHandler = require('./routes/notification');
const blogHandler = require('./routes/blog');
const achievementHandler = require('./routes/achievement');

const db = mongoose.connection

mongoose.connect(process.env.DB_CONNECT_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("connection successful"))
.catch(err => console.log(err))

db.on('error', err => {
    console.error('connection error:', err)
  })

app.use(cors());
app.use(express.json());

// Route middleware
app.use('/auth', authHandler)
app.use('/notification', notificationHandler)
app.use('/blog', blogHandler)
app.use('/achievement', achievementHandler)

// starting get api
app.get('/', (req, res) => {
    res.send({msg: 'root api created'})
})


app.listen(process.env.PORT || 5000, () => { 
    console.log("server is running")
}); 