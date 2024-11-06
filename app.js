const express = require("express");
const path = require("path"); 
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);
// app.use(express.static('static', options))
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static files
app.use(express.urlencoded())
//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the templates engine as pug
app.set('views',path.join(__dirname,'views'));//set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const param={}
    res.status(200).render('home.pug',param);
})
app.get('/contact',(req,res)=>{
    const param={}
    res.status(200).render('contact.pug',param);
})
app.post('/contact',(req,res)=>{  
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})