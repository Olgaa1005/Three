const UserDatabase = require('./userdatabase');
const User = require('./user');

describe('UserDatabase Class', () => {
  let db;

  beforeEach(() => {
    db = new UserDatabase();
  });

  test('should save a user to the database', () => {
    const user = new User('testUser', 'password123');
    db.saveUser(user);
    expect(db.getUser('testUser')).toEqual({ username: 'testUser', password: 'password123' });
  });

  test('should retrieve a user by username', () => {
    const user = new User('testUser', 'password123');
    db.saveUser(user);
    const retrievedUser = db.getUser('testUser');
    expect(retrievedUser).toEqual({ username: 'testUser', password: 'password123' });
  });

  test('should return null for a non-existent user', () => {
    expect(db.getUser('nonExistentUser')).toBeNull();
  });

  test('should throw an error when saving an invalid object', () => {
    expect(() => db.saveUser({ username: 'testUser', password: 'password123' }))
      .toThrowError('The object being saved is not an instance of User');
  });
});

