import CustomerLoginPage from "../page-objects/customer-login";

const viewports = Cypress.env("viewports");
viewports.forEach((viewport) => {

  describe(`Login customer - ${viewport.name}`, () => {
    const customerLogin = new CustomerLoginPage();

    let testData;

    beforeEach(() => {
      cy.viewport(viewport.width, viewport.height);
      cy.fixture("user-data").then((data) => {
        testData = data;
      });
    });

    it("Login customer with valid credentials", () => {
      customerLogin.visit();
      cy.assertPageLoaded();
      customerLogin.enterUsername(testData.validCredentials.email);
      customerLogin.enterPassword(testData.validCredentials.password);
      customerLogin.clickLoginButton();
      customerLogin.verifyLoginSuccess();
    });

    it("Login customer with empty password input and check error message", () => {
      customerLogin.visit();
      customerLogin.enterUsername(testData.validCredentials.email);
      customerLogin.clickLoginButton();
      customerLogin.errorPasswordEmpty();
    });

    it("Login customer with invalid password and check error message", () => {
      customerLogin.visit();
      customerLogin.enterUsername(testData.validCredentials.email);
      customerLogin.enterPassword(testData.invalidCredentials.password);
      customerLogin.clickLoginButton();
      customerLogin.errorPasswordInvalid();
    });

    it("Login customer with invalid username and check error message", () => {
      customerLogin.visit();
      customerLogin.enterUsername(testData.invalidCredentials.email);
      customerLogin.enterPassword(testData.validCredentials.password);
      customerLogin.clickLoginButton();
      customerLogin.errorUsername();
    });
  });
});
