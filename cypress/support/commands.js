import { login } from './selectors/login/Login'
import { inventory } from './selectors/inventory/Inventory'
import { cart } from './selectors/cart/Cart'
import { checkout } from './selectors/checkout/Checkout'

Cypress.Commands.add('login', ({ username = 'standard_user', password = 'secret_sauce' } = {}) => {
    cy.visit('/')

    if (username) cy.get(login.username).type(username)
    if (password) cy.get(login.password).type(password)
    cy.get(login.loginBtn).click()
})

Cypress.Commands.add('compraProduto', ({ firstName, lastName, postalCode, produtos } = {}) => {
    cy.iniciaCheckout(produtos)
    cy.preencheDadosCheckout({ firstName, lastName, postalCode })
    cy.get(checkout.finishBtn).click()
})

Cypress.Commands.add('adicionaProdutoCarrinho', (produtos = ['sauce-labs-backpack']) => {
    produtos.forEach((slug) => {
        cy.get(inventory.addToCartBtn(slug)).click()
    })
})

Cypress.Commands.add('vaiCheckout', () => {
    cy.get(inventory.shoppingCart).click()
    cy.get(cart.checkoutBtn).click()
})

Cypress.Commands.add('iniciaCheckout', (produtos) => {
    cy.adicionaProdutoCarrinho(produtos)
    cy.vaiCheckout()
})

Cypress.Commands.add('preencheDadosCheckout', ({ firstName = '', lastName = '', postalCode = '' } = {}) => {
    if (firstName) cy.get(checkout.firstName).type(firstName)
    if (lastName) cy.get(checkout.lastName).type(lastName)
    if (postalCode) cy.get(checkout.postalCode).type(postalCode)
    cy.get(checkout.continueBtn).click()
})