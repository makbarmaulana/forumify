/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when username is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display error message when confirm password is wrong
 *   - should display alert when email already taken
 *   - should redirect to loginpage when username, email, and password are correct
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register/');
  });

  it('should display register page correctly', () => {
    cy.get('input#username').should('be.visible');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('input#confirmPassword').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
    cy.get('a[href="/login"]').contains('Have an account ?').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('input#password').type('usertesting');
    cy.get('input#confirmPassword').type('usertesting');
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('input#username').type('User Testing');
    cy.get('input#password').type('usertesting');
    cy.get('input#confirmPassword').type('usertesting');
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input#username').type('User Testing');
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display error message when confirm password is wrong', () => {
    cy.get('input#username').type('User Testing');
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('input#password').type('usertesting');
    cy.get('button').contains(/^Register$/).click();
    cy.get('#errorMsg').should('be.visible');
  });

  it('should display alert when email already taken', () => {
    cy.get('input#username').type('User Testing');
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('input#password').type('usertesting');
    cy.get('input#confirmPassword').type('usertesting');
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should redirect to login page when username, email, and password are correct', () => {
    // Generates a random user
    const username = `user${Math.random().toString(36).slice(2, 7)}`;
    const email = `user${Math.random().toString(36).slice(2, 7)}@mail.com`;
    const password = `pass${Math.random().toString(36).slice(2, 12)}`;

    cy.get('input#username').type(username);
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('input#confirmPassword').type(password);
    cy.get('button').contains(/^Register$/).click();

    cy.url().should('include', '/login');
  });
});
