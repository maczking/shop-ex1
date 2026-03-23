import {faker} from '@faker-js/faker';

class CustomerRegisterPage {
 fillCustomerRegisterForm() {
    cy.get('#reg_email').type("test" + faker.internet.email());
    cy.get('#reg_password').type(faker.internet.password());
    cy.get('.woocommerce-form-register__submit').click();
  }
}

export default CustomerRegisterPage;