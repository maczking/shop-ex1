Cypress.Commands.add("visitHomePage", () => {
    cy.visit("/");
  });
  
  Cypress.Commands.add('assertPageLoaded', () => {
    cy.document().should('have.property', 'readyState', 'complete');
  });
  
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });