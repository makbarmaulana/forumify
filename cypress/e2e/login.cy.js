/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login/');
  });

  it('should display login page correctly', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('a[href="/register"]').contains('Create an account').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('input#password').type('usertesting');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input#email').type('wronguser@mail.com');
    cy.get('input#password').type('wrong_password');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input#email').type('usertesting@mail.com');
    cy.get('input#password').type('usertesting');
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Welcome back "User Testing"!');
    });
    cy.get('header').contains(/^forumify.$/).should('be.visible');
  });
});
