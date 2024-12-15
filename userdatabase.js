const User = require('./user');

class UserDatabase {
  constructor() {
    this.data = [];
  }

  saveUser(user) {
    if (!(user instanceof User)) {
      throw new Error('The object being saved is not an instance of User');
    }

    this.data = this.data.filter((u) => u.username !== user.username);
    this.data.push(user.toJSON()); // Serialize the User object before saving
    return true;
  }

  getUser(username) {
    return this.data.find(user => user.username === username) || null;
  }
}

module.exports = UserDatabase;

  
  
  