const router = require('express').Router();
let User = require('../models/user.model');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = []

// ******************    UTILITY FUNCTIONS      ******************
function generateAccessToken(data) {
  console.log("generate fn");
  console.log(data);
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]
  // //Bearer TOKEN 
  // if (token == null) return res.sendStatus(401)

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if(err) return res.sendStatus(403)
  //     req.user = user
  //     next()
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  // BEARER TOKEN 
  if (token == null) return res.status(401).send("token not found");
  req.newToken = token;

  try {
    const verifyJWTtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verifyJWTtoken) {
      console.log("token valid!")
      next()
      return;
    }
    return res.status(403).send("token is not valid, but code should not reach here!")
  }
  catch
  {
    console.log("token expired!")
    //token expired check for refresh token 
    const refreshToken = req.body.reftoken
    //console.log(refreshTokens);

    if (refreshToken == null) return res.status(403).send("token Expired, refresh token not provided");

    if (refreshTokens.includes(refreshToken)) {
      // console.log(refreshTokens);
      return res.status(403).send("refresh token not found in the list")
    }

    try {
      const verifyRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if (verifyRefreshToken) {
        console.log("refresh token valid, creating auth token")
        const username = verifyRefreshToken.username;
        const forJWTsign = { username };
        // console.log(forJWTsign);
        const newAccessToken = generateAccessToken(forJWTsign);
        req.newToken = newAccessToken
        next();
        return;
      }
      return res.status(403).send("refresh token verification failed, but code should not reach here")
    }
    catch
    {
      return res.status(403).send("refresh token verification failed");
    }
  }
}


//******************      AUTH APIS       ******************

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
  const { username, password, email } = req.body;
  console.log(req.body);

  //find for duplicate user 
  const user = await User.findOne({ username });
  if (user) {
    res.status(401).send({ message: 'Username not available!!' });
    return;
  }

  //find for duplicate email 
  const mail = await User.findOne({ email });
  if (mail) {
    res.status(401).send({ message: 'Email not available!!' });
    return;
  }

  try {
    const newUser = new User({ username, password, email });
    console.log("User added successfully");

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
})

//EXTRA API FOR questions

router.post('/question_to_gpt', async (req, res) => {
  console.log("question asked");

  try {
    const question = req.body.question;
    const model = 'text-davinci-003';
    console.log(question);
    // return;
    const response = await axios.post('https://api.openai.com/v1/engines/' + model + '/completions', {
      prompt: question,
      max_tokens: 200,
      temperature: 0.5,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const answer = response.data.choices[0].text;

    res.json({ answer });

    // console.log(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});



router.route('/test').post((req, res) => {

  console.log("Test api called");

  res.status(200).json({ message: 'Login successful!' });
  return;
});


module.exports = router; 