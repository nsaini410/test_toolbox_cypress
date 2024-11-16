import loginSelectors from '../fixtures/loginSelectors.json';

export default class BasePage {
    // Common methods that can be used on different pages
    
    visit(url: string): void {
        cy.visit(url);
    }

    login(email: string, password: string, selectors: { email: string; password: string; button: string }): void {
        cy.get(loginSelectors.login.loginEmail).type(email);
        cy.get(loginSelectors.login.loginPassword).type(password);
        cy.get(loginSelectors.login.loginButton).click();
    }

    logout(): void {
        cy.get(loginSelectors.afterSignUp.logoutButton).click();
    }

  }
  