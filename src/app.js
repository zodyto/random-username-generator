const express = require('express');
const ejs = require('ejs');
const users = require('./data/users.json'); // 3264 - length

const app = express();

app.set('view engine', 'ejs');
app.set('views', ('./src/views/'));

app.use(express.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + "/public"));

let randomUsername = '';

const generateRandomNumber = () => {
  return Math.floor((Math.random() * 3264) + 1);
}

const generateNewRandomData = () => {
    const randomNumber = generateRandomNumber();
    randomUsername = users[randomNumber].username;
}

app.get('/', (req, res) => {
  if (randomUsername === '') {
    generateNewRandomData();
  }
  res.render('home', {
    username: randomUsername,
  });
})

app.post('/generate', (req, res) => {
  generateNewRandomData();
  res.redirect('/');
});

const port = process.env.PORT || 5015;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})