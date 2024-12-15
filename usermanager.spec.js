const UserManager = require('./usermanager');
const UserDatabase = require('./userdatabase');

describe('UserManager Class', () => {
  let userManager;
  let db;

  beforeEach(() => {
    db = new UserDatabase();
    userManager = new UserManager(db);
  });

  test('should create a new user', () => {
    const user = userManager.createUser('testUser', 'password123');
    expect(user.username).toBe('testUser');
    expect(db.getUser('testUser')).toEqual({ username: 'testUser', password: 'password123' });
  });

  test('should not allow creating a user with an existing username', () => {
    userManager.createUser('testUser', 'password123');
    expect(() => userManager.createUser('testUser', 'password456')).toThrowError('User already exists');
  });


  
  test('should throw an error when creating a user with missing username or password', () => {
    expect(() => userManager.createUser('', 'password123')).toThrowError('Username and password are required');
    expect(() => userManager.createUser('testUser', '')).toThrowError('Username and password are required');
  });





  test('should log in a user with correct credentials', () => {
    userManager.createUser('testUser', 'password123');
    expect(userManager.login('testUser', 'password123')).toBe(true);
    expect(userManager.getLoggedInUser().username).toBe('testUser');
  });

  test('should not log in a user with incorrect credentials', () => {
    userManager.createUser('testUser', 'password123');
    expect(() => userManager.login('testUser', 'wrongPassword')).toThrowError('Invalid credentials');
  });

  test('should log out a logged-in user', () => {
    userManager.createUser('testUser', 'password123');
    userManager.login('testUser', 'password123');
    userManager.logout();
    expect(userManager.getLoggedInUser()).toBeNull();
  });
});

