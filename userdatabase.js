const User = require('./user');

class UserDatabase {
  constructor() {
    this.data = []; // Simulating a database with an array
  }

  // Save a User instance to the database
  saveUser(user) {
    if (!(user instanceof User)) {
      throw new Error('The object being saved is not an instance of User');
    }

    // Remove any existing user with the same username
    this.data = this.data.filter((u) => u.username !== user.username);
    this.data.push(user.toJSON()); // Serialize the User object before saving
    return true;
  }

  // Retrieve a User by username
  getUser(username) {
    return this.data.find(user => user.username === username) || null;
  }
}

module.exports = UserDatabase;

  
  
  