

const express =require('express');
const path=require('path');
const port=1014;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
 const app=express();

 app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));

 app.use(express.urlencoded());
 
 app.use (express.static('asset'));
 

app.get('/', async function (req, res) {
  try {
    //retrive all objects from Contact colections as find has no object to find
    const contacts = await Contact.find({});
    return res.render('contact_list', {
      title: "CONTACT_LIST",
      contact_list: contacts,
    });
  } catch (err) {
    console.log('Error in fetching contacts from the database:', err);
    return res.status(500).send('Internal Server Error');
  }
});


 app.get('/practice', function(req, res) {

  return res.render('practice',{
    title:'lets play'
  })
});

app.post('/create_contact', async function (req, res) {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      mobile: req.body.mobile,
    });
    console.log('****************', newContact);
    return res.redirect('back');
  } catch (error) {
    console.log('error in creating db', error);
    return res.redirect('back');
  }
});



app.get('/delete-contact', async function(req, res) {
  let id = req.query.id;

  try {
    await Contact.findByIdAndDelete(id);
    return res.redirect('back');
  } catch (err) {
    console.log("Error in deleting an object from the database:", err);
    return res.status(500).send('Internal Server Error');
  }
});



 app.listen(port,function(err){
    if(err){
        console.log('error in running',err);
    }
    console.log('Yup! My server is running on port:',port);
 });