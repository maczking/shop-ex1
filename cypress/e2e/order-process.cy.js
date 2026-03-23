import OrderProcessPage from "../page-objects/order-process";

const viewports = Cypress.env("viewports");
viewports.forEach((viewport) => {
    describe(`Order process - ${viewport.name}`, () => {
        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
        });
        it("Add product to cart and go to checkout", () => {
            const orderProcess = new OrderProcessPage();
            orderProcess.visitCategory();
            orderProcess.addRandomProductToCart();
            if (viewport.name === "desktop") {
                orderProcess.goToCartDesktop();
            } else if (viewport.name === "mobile") {
                orderProcess.goToCartMobile();
            }
            orderProcess.verifyProductInCart();
            orderProcess.goToCheckout();
            orderProcess.fillCheckoutForm();
            //....work in progress, need to adapt for mobile as well
            // orderProcess.fillPaymentDetails();
            // orderProcess.placeOrder();
        });
    });
});