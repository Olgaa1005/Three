const User = require('./user');

class UserManager {
  constructor(database) {
    this.database = database; 
    this.loggedInUser = null; 
  }

  createUser(username, password) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const existingUser = this.database.getUser(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User(username, password);
    user.save(this.database); 
    return user;
  }


  login(username, password) {
    try {
      const user = User.findByUsername(username, this.database); 
      if (user.password === password) {
        this.loggedInUser = user; 
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }


  logout() {
    this.loggedInUser = null;
  }
}

module.exports = UserManager;


