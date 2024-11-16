import LoginPage from '../../pages/LoginPage';

describe('Login Test', () => {
  const loginPage = new LoginPage();

  it('should sign up correctly', () => {
    // Opens up login page and register a new user
    loginPage.visit();
    loginPage.signUp('Nico', 'prueba3@yopmail.com');
    loginPage.signUpFillAccountInfo('Nico', '123456');
    loginPage.signUpFillAddressInfo('Nicolas', 'Fernandez', 'Parana 106', 
    'United States', 'Texas', 'Austin', 'X5000', '351624812');
    loginPage.createAccount();
    
    // Assertions for successful signup
    cy.location("pathname").should("equal", "/account_created");
    cy.get("h2[class='title text-center'] b").should('have.text', 'Account Created!');
    loginPage.clickContinue();
    cy.location("pathname").should("equal", "/");

    // Logout after assertions
    loginPage.logout();
    // Assert correct logout
    cy.location("pathname").should("equal", "/login");
  });
  
  it('should log in successfully with the created account', () => {
    // Opens login page and perform login actions
    loginPage.visit();
    loginPage.login('prueba3@yopmail.com', '123456');

    //Assertions for successful login
    cy.location("pathname").should("equal", "/");
    cy.get("a[href='/delete_account']").should('be.visible');
    cy.get("a[href='/logout']").should('be.visible');
    
    // Logout after assertions
    loginPage.logout();
    // Assert correct logout
    cy.location("pathname").should("equal", "/login");
  });

  it('should delete account succesfully', () => {
    // Opens login page and perform login actions
    loginPage.visit();
    loginPage.login('prueba3@yopmail.com', '123456');

    //Assertions for successful login
    cy.location("pathname").should("equal", "/");
    cy.get("a[href='/delete_account']").should('be.visible');
    cy.get("a[href='/logout']").should('be.visible');
    
    // Delete account
    loginPage.deleteAccount();

    // Assertions after deleting account
    cy.location("pathname").should("equal", "/delete_account");
    cy.get("h2[class='title text-center'] b").should('have.text', 'Account Deleted!');
    
    // Assert correct navigation after deleting account
    loginPage.clickContinue();
    cy.location("pathname").should("equal", "/");
  });

});