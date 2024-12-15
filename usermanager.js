const User = require('./user');

class UserManager {
  constructor(database) {
    this.database = database; // Instance of UserDatabase
    this.loggedInUser = null; // Store the currently logged-in user
  }

  // Create a new user and save it to the database
  createUser(username, password) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const existingUser = this.database.getUser(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User(username, password);
    user.save(this.database); // Save the user using ORM functionality
    return user;
  }

  // Log in an existing user
  login(username, password) {
    try {
      const user = User.findByUsername(username, this.database); // Retrieve user
      if (user.password === password) {
        this.loggedInUser = user; // Set as logged-in user
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  // Get the currently logged-in user
  getLoggedInUser() {
    return this.loggedInUser;
  }

  // Log out the currently logged-in user
  logout() {
    this.loggedInUser = null;
  }
}

module.exports = UserManager;


