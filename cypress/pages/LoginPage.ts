import BasePage from './BasePage';
import loginSelectors from '../fixtures/loginSelectors.json';


class LoginPage extends BasePage {
  

  visit(): void {
    super.visit('/login');
  }

  login(email: string, password: string): void {
    super.login(email, password, {
      email: loginSelectors.login.loginEmail,
      password: loginSelectors.login.loginPassword,
      button: loginSelectors.login.loginButton,
    });
  }

  signUp(username: string, email: string): void {
    cy.get(loginSelectors.signUp.newUsernameInput).type(username);
    cy.get(loginSelectors.signUp.newUserEmail).type(email);
    cy.get(loginSelectors.signUp.signUpButton).click();
  }

  signUpFillAccountInfo(username: string, password: string): void {
    cy.get(loginSelectors.fillSignUp.username).should('have.value', username);
    cy.get(loginSelectors.fillSignUp.email).should('be.disabled');
    cy.get(loginSelectors.fillSignUp.password).type(password);
  }

  signUpFillAddressInfo(firstName: string, lastName: string, address: string, 
    country: string, state: string, city: string, zipCode: string, mobileNumber: string): void {

    cy.get(loginSelectors.fillSignUp.firstName).type(firstName);
    cy.get(loginSelectors.fillSignUp.lastName).type(lastName);
    cy.get(loginSelectors.fillSignUp.address).type(address);
    cy.get(loginSelectors.fillSignUp.country).select(country).should('have.value', country);
    cy.get(loginSelectors.fillSignUp.state).type(state);
    cy.get(loginSelectors.fillSignUp.city).type(city);
    cy.get(loginSelectors.fillSignUp.zipcode).type(zipCode);
    cy.get(loginSelectors.fillSignUp.mobileNumber).type(mobileNumber);
  }

  createAccount(): void {
    cy.get(loginSelectors.fillSignUp.createAccountButton).click();
  }

  deleteAccount(): void {
    cy.get(loginSelectors.afterSignUp.deleteAccountButton).click();
  }

  clickContinue(): void {
    cy.get(loginSelectors.afterSignUp.continueButton).click();
  }

  logout(): void {
    super.logout();
  }

}

export default LoginPage;