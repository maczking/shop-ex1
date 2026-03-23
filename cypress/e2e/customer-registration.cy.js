import CustomerRegisterPage from "../page-objects/customer-register";
import CustomerLoginPage from "../page-objects/customer-login";

const viewports = Cypress.env("viewports");
viewports.forEach((viewport) => {
  describe(`Register account - ${viewport.name}`, () => {
    beforeEach(() => {
      cy.viewport(viewport.width, viewport.height);
    });
    it("Register new customer account", () => {
      cy.fixture("user-data").then((data) => {
        //Go to registration page
        cy.visit("/moje-konto/");
        cy.assertPageLoaded();
        const customerRegistration = new CustomerRegisterPage();
        //Fill in the registration form
        customerRegistration.fillCustomerRegisterForm();
        //Verify that the user is registered and logged in
        const customerLogin = new CustomerLoginPage();
        customerLogin.verifyLoginSuccess();
      });
    });
  });
});
