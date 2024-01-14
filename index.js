const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signupModel = require('./Models/signupModel');
const path = require('path');
const bodyParser = require('body-parser');
const houseRecom = require('./home/houseRecom')
const interior = require('./home/interior');
const apiRouter = require('./chat/chat')
const Subscriber = require('./Models/subscribe')
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());
app.use('/recomendation',express.static(path.join(__dirname,'/recomendation')))
app.use('/interior',express.static(path.join(__dirname, '/interior')))

mongoose.connect('mongodb+srv://mgbemenaosonduv:w40j31bKpXuWHXWt@cluster0.sp8kn0t.mongodb.net/your-database-name?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  signupModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.json('Login successful');
          } else {
            res.json('Invalid email or password');
          }
        });
      } else {
        res.json('No record found for this email');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      res.status(500).json('Internal Server Error');
    });
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/recomhouse',(req,res)=>{
  res.json(houseRecom)
})

app.use('/interior',(req,res)=>{
  res.json(interior)
})

app.post('/signup', async (req, res) => {
 signupModel.create(req.body)
 .then(signups => res.json(signups))
 .catch(err => res.json(err))
});

app.use('/chats',(req,res)=>{
  res.json(apiRouter)
})

app.post('/subscriber', async (req, res) => {
  const { email } = req.body;
  try {
    const subscribeUser = new Subscriber({ email });
    await subscribeUser.save();
    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Error subscribing user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const propertySchema = new mongoose.Schema({
  location: String,
  // Other property fields
});

const Property = mongoose.model('Property', propertySchema);


app.get('/api/properties', async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const results = await Property.find({
      $or: [
        { location: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for location
        { _id: searchTerm }, // Search by property ID
      ],
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});



// curl ^
//  -H "Authorization: Bearer AHWDDIOK7A4UJ34SYJ3DY5H6Q6DSFR5U" ^
//  "https://api.wit.ai/message?v=20240108&q=i%20need%20a%20home"