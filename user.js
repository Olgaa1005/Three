class User {
    constructor(username, password) {
      if (!username || !password) {
        throw new Error('Username and password are required');
      }
      this.username = username;
      this.password = password;
    }
  
    toJSON() {
      return {
        username: this.username,
        password: this.password,
      };
    }
  
    static fromJSON(json) {
      if (!json.username || !json.password) {
        throw new Error('Invalid JSON object for User');
      }
      return new User(json.username, json.password);
    }
  
    save(database) {
      database.saveUser(this); 
      return this;
    }
  
    static findByUsername(username, database) {
      const userData = database.getUser(username);
      if (!userData) {
        throw new Error(`User with username "${username}" not found`);
      }
      return User.fromJSON(userData);
    }
  }
  
  module.exports = User;
  

  