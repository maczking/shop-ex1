import CustomerLogoutPage from "../page-objects/customer-logout";
import CustomerLoginPage from "../page-objects/customer-login";

const customerLogin = new CustomerLoginPage();
const customerLogout = new CustomerLogoutPage();

const viewports = Cypress.env("viewports");
viewports.forEach((viewport) => {
  describe(`Login and logout customer - ${viewport.name}`, () => {
    beforeEach(() => {
      cy.viewport(viewport.width, viewport.height);
    });

    it("Login and logout", () => {
      cy.fixture("user-data").then((data) => {
        customerLogin.visit();
        cy.assertPageLoaded();

        customerLogin.enterUsername(data.validCredentials.email);
        customerLogin.enterPassword(data.validCredentials.password);
        customerLogin.clickLoginButton();
        customerLogin.verifyLoginSuccess();
        customerLogout.clickLogoutButton();
        customerLogout.verifyUserIsLoggedOut();
      });
    });
  });
});
