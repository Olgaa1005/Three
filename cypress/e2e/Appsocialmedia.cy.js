describe('API Endpoints', () => {
  const baseUrl = 'http://localhost:3000'; // Your API base URL
  const initialUser = { username: 'testUser', password: 'password123' };
  const newPassword = 'newPassword456';

  // Before all tests, register the initial user
  before(() => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      body: initialUser,
      failOnStatusCode: false, // Prevent Cypress from failing if the user already exists
    });
  });

  // Test: Register endpoint
  describe('/register Endpoint', () => {
    it('should not allow duplicate registration', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/register`,
        body: initialUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq(`The username '${initialUser.username}' is already taken. Please choose another.`);
      });
    });
  });

  // Test: Login endpoint
  describe('/login Endpoint', () => {
    it('should log in the registered user', () => {
      cy.request('POST', `${baseUrl}/login`, initialUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'User logged in successfully');
      });
    });

    it('should not log in with incorrect password', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: { username: initialUser.username, password: 'wrongPassword' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq('Invalid credentials');
      });
    });
  });

  // Test: Change Password endpoint
  describe('/change-password Endpoint', () => {
    it('should change the password for a registered user', () => {
      cy.request('POST', `${baseUrl}/change-password`, {
        username: initialUser.username,
        oldPassword: initialUser.password,
        newPassword: newPassword,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Password changed successfully');
      });
    });

    it('should log in with the new password', () => {
      cy.request('POST', `${baseUrl}/login`, {
        username: initialUser.username,
        password: newPassword,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'User logged in successfully');
      });
    });

    it('should not change the password with incorrect old password', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/change-password`,
        body: {
          username: initialUser.username,
          oldPassword: 'wrongPassword',
          newPassword: 'anotherPassword',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Invalid credentials');
      });
    });
  });
});
