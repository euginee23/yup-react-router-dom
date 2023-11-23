const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
  const userData = req.body;
  console.log('Received registration data:', userData);

  saveUserData(userData);

  res.status(200).json({ message: 'Registration successful', user: userData });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const data = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(data);

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

function saveUserData(userData) {
  let existingData = [];

  try {
    const data = fs.readFileSync('users.json', 'utf8');
    existingData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading users.json:', error.message);
  }

  existingData.push(userData);

  try {
    const jsonData = JSON.stringify(existingData, null, 2);
    fs.writeFileSync('users.json', jsonData, 'utf8');
    console.log('User data added to users.json');
  } catch (error) {
    console.error('Error writing to users.json:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
