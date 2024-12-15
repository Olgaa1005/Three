const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user'); 
const UserDatabase = require('./userdatabase');
const UserManager = require('./usermanager');

const app = express();
const port = 3000;

const db = new UserDatabase();
const userManager = new UserManager(db);

// Middleware to parse JSON
app.use(bodyParser.json());



// Default route for the root
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Social Media API</h1><p>Use the following endpoints:</p><ul><li><strong>POST /register</strong>: Register a new user</li><li><strong>POST /login</strong>: Log in a user</li><li><strong>POST /change-password</strong>: Change a user\'s password</li></ul>');
  });



// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Handle empty or invalid JSON
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    userManager.createUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    if (error.message === 'User already exists') {
      res.status(400).json({ error: `The username '${username}' is already taken. Please choose another.` });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});


// Log in a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  /*try {
    userManager.login(username, password);
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }*/
    try {
      console.log(`Attempting login for username: ${username}`);
      const user = User.findByUsername(username, db);
      console.log(`Found user: ${JSON.stringify(user)}`);
      if (user.password === password) {
        res.status(200).json({ message: 'User logged in successfully' });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error(`Login failed: ${error.message}`);
      res.status(401).json({ error: error.message });
    }


});



// Change password
app.post('/change-password', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    // Verify the user with the old password
    const user = User.findByUsername(username, db); // Retrieve the user
    if (user.password !== oldPassword) {
      throw new Error('Invalid credentials');
    }

    // Update the user's password
    user.password = newPassword;
    db.saveUser(user); // Save the updated user to the database

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
