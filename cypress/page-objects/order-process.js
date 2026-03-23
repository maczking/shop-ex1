import { faker } from "@faker-js/faker";

class OrderProcessPage {

    getBuyButton() {
        return cy.get('.add_to_cart_button');
    }

    visitCategory() {
        cy.visit('/product-category/windsurfing');
    }

    clickBuyButton() {
        this.getBuyButton().click();
    }

addRandomProductToCart() {
    cy.intercept('POST', '/?wc-ajax=add_to_cart').as('addToCartRequest');

    this.getBuyButton().then((buttons) => {
        const randomIndex = Math.floor(Math.random() * buttons.length);
        const rawButton = buttons[randomIndex];

        cy.wrap(rawButton)
            .closest('.type-product')
            .find('a') 
            .first()   
            .invoke('attr', 'href')
            .then((href) => {
               
                cy.wrap(href).as('productUrl');
                

                cy.wrap(rawButton).click();
            });


        cy.wait('@addToCartRequest').its('response.statusCode').should('eq', 200);
    });
}

    goToCartDesktop() {
      cy.get('.site-header-cart').click();
    }

    goToCartMobile() {
        cy.get('.footer-cart-contents').click();
    }


    verifyProductInCart() {
        cy.get('@productUrl').then((url) => {
            cy.get('.woocommerce-cart-form__cart-item')
                .find(`a[href="${url}"]`)
                .should('be.visible');
        });
    }


    goToCheckout() {
        cy.get('.checkout-button').click();
        cy.url().should('include', '/zamowienie');
    }

    fillCheckoutForm() {
        cy.get('#billing_email').type('test' + faker.internet.email());
        cy.get('#billing_first_name').type('test' + faker.person.firstName());
        cy.get('#billing_last_name').type('test' + faker.person.lastName());
        cy.get('#billing_address_1').type(faker.location.streetAddress());
        cy.get('#billing_postcode').type(faker.location.zipCode());
        cy.get('#billing_city').type(faker.location.city());
        cy.get('#billing_phone').type(faker.phone.number());
    }

    //....work in progress, need to adapt for mobile as well
    // fillPaymentDetails() {
    //     cy.fixture('user-data').then(({paymentData}) => {
    //         cy.get('#payment-numberInput').type(paymentData.cardNumber);
    //         cy.get('#payment-expiryInput').type(paymentData.expiryDate);
    //         cy.get('#payment-cvcInput').type(paymentData.cvv);
    //     });
    // }

    // placeOrder() {
    //     cy.get('#terms').check();
    //     cy.get('#place_order').click();
    //     cy.url().should('include', '/zamowienie-otrzymane');
    // }
}

export default OrderProcessPage;