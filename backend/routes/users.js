const router = require('express').Router();
let User = require('../models/user.model');
const axios = require('axios');

//LOGIN API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ username, password });
    console.log("done");
    if (user) {
      console.log("connecting mere bhai");
      res.status(200).send({ message: 'Login successful!' });
      console.log("ho gya mere bhai");

    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
})

//SIGNUP API 
router.post('/signup', async (req, res) => {
  const { username, password, email  } = req.body;
  console.log(req.body);

  //find for duplicate user 
  const user = await User.findOne({username});
  if(user) {
    res.status(401).send({ message: 'Username not available!!' });
    return;
  }

  //find for duplicate email 
  const mail = await User.findOne({email});
  if(mail) {
    res.status(401).send({ message: 'Email not available!!' });
    return;
  }

  try {
    const newUser = new User({ username, password, email});
    console.log("User added successfully");

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
})


module.exports = router; 