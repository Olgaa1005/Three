const User = require('./user');
const UserDatabase = require('./userdatabase');

describe('User Class with ORM functionality', () => {
  let db;

  beforeEach(() => {
    db = new UserDatabase();
  });

  test('should initialize with a username and password', () => {
    const user = new User('testUser', 'password123');
    expect(user.username).toBe('testUser');
    expect(user.password).toBe('password123');
  });

  test('should throw an error if username or password is missing', () => {
    expect(() => new User('', 'password123')).toThrowError('Username and password are required');
    expect(() => new User('testUser', '')).toThrowError('Username and password are required');
  });

  test('should save the user to the database', () => {
    const user = new User('testUser', 'password123');
    user.save(db);
    expect(db.getUser('testUser')).toEqual({ username: 'testUser', password: 'password123' });
  });

  test('should find a user by username from the database', () => {
    const user = new User('testUser', 'password123');
    user.save(db);
    const fetchedUser = User.findByUsername('testUser', db);
    expect(fetchedUser).toBeInstanceOf(User);
    expect(fetchedUser.username).toBe('testUser');
    expect(fetchedUser.password).toBe('password123');
  });

  test('should throw an error if user is not found', () => {
    expect(() => User.findByUsername('nonExistentUser', db)).toThrowError('User with username "nonExistentUser" not found');
  });

  test('should throw an error when creating a user from invalid JSON', () => {
    const invalidJson = { username: 'testUser' }; // Missing password
    expect(() => User.fromJSON(invalidJson)).toThrowError('Invalid JSON object for User');
  });


});




