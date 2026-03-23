class CustomerLogoutPage {  

clickLogoutButton() {
   cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').click();
}

verifyUserIsLoggedOut() {
    cy.getCookies().should((cookies) => {
    const exists = cookies.some(cookie =>
      cookie.name.startsWith('wordpress_logged_in')
    );
    expect(exists).to.be.false;
  });
}
}

export default CustomerLogoutPage;
