class User {
    constructor(username, password) {
      if (!username || !password) {
        throw new Error('Username and password are required');
      }
      this.username = username;
      this.password = password;
    }
  
    // Convert the User object to a plain JSON object
    toJSON() {
      return {
        username: this.username,
        password: this.password,
      };
    }
  
    // Create a User instance from a JSON object
    static fromJSON(json) {
      if (!json.username || !json.password) {
        throw new Error('Invalid JSON object for User');
      }
      return new User(json.username, json.password);
    }
  
    // Save the user to the database
    save(database) {
      database.saveUser(this); // Call UserDatabase's saveUser method
      return this;
    }
  
    // Retrieve a user by username from the database
    static findByUsername(username, database) {
      const userData = database.getUser(username); // Call UserDatabase's getUser method
      if (!userData) {
        throw new Error(`User with username "${username}" not found`);
      }
      return User.fromJSON(userData);
    }
  }
  
  module.exports = User;
  
  
  



/*class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    toJSON() {
      return {
        username: this.username,
        password: this.password,
      };
    }
  }
  
  module.exports = User;*/
  