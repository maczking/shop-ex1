class CustomerLoginPage {
  constructor() {
    this.url = "/moje-konto/";
  }

  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),

  loginButton: () =>
      cy.get('.woocommerce-form-login__submit'),
    };

  visit() {
    cy.visit(this.url);
  }

  enterUsername(email) {
    this.elements.usernameInput().type(email);
  }

  enterPassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLoginButton() {
    this.elements.loginButton().click();
  }

  verifyLoginSuccess() {
    cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').should('be.visible');
  }

  errorPasswordEmpty() {
    cy.get('.woocommerce-error > li').should('contain', 'pole hasła jest puste.')
  }

  errorPasswordInvalid() {
    cy.get('.woocommerce-error > li').should('contain', 'podano nieprawidłowe hasło. Nie pamiętasz hasła?')
  }


  errorUsername() {
    cy.get('.woocommerce-error > li').should('contain', 'Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.')
  }
}

export default CustomerLoginPage;