const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/FlEXIFY", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection Error: ${err}`);
});

const SignupSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    repass:String,
});

const OurTrainerSchema = new mongoose.Schema({
    name:String,
    email : String,
    phone: String,
    specialty: String,
    bio: String,

})

const SignupModel = mongoose.model('Signup', SignupSchema);

const OurTrainerSchemaModel = mongoose.model('OurTrainer', OurTrainerSchema);

app.get('/', (req, res) => {
    res.render('Signup'); 
});

app.post('/Signup', async (req, res) => {
      const { name, email, pass, pass_repeat } = req.body; 
  
      const newData = new SignupModel({
          name: name,
          email: email,
          pass: pass,
          repass:pass_repeat,
      });
      
  
      try {
          const savedData = await newData.save();
          console.log('Data Successfully Saved:', savedData);
          res.send('Signup Successful');
          
      } catch (err) {
          console.error('Error Saving Data:', err);
          res.status(500).send('Error Saving Data.');
      }
  });
  

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/admin', (req,res)=>{
    res.render('admin');
});


app.get('/test', (req, res) => {
    res.render('test');
});

app.get('/admin/add-trainer', (req,res)=>{
    res.render('add-trainer');
});

app.post('/admin/add-trainer',(req,res)=> {
    const { name, email, phone, specialty, bio } = req.body;

    const newData = new OurTrainerSchemaModel({
        name:name,
        email : email,
        phone: phone,
        specialty: specialty,
        bio: bio,
    });

    
})

