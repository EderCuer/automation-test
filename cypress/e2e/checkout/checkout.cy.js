import { checkout } from '../../support/selectors/checkout/Checkout'
import { faker } from '@faker-js/faker';

describe('Checkout', () => {
    let firstName, lastName, postalCode

    beforeEach(() => {
        firstName = faker.person.firstName()
        lastName = faker.person.lastName()
        postalCode = String(faker.number.int({ min: 1000000, max: 9999999 }))

        cy.login()
    })

    context('Fluxo positivo', () => {
        it('compra produto com sucesso', () => {
            cy.compraProduto({ firstName, lastName, postalCode })

            cy.get(checkout.completeHeader)
                .should('be.visible')
                .and('contain.text', 'Thank you for your order!')
            cy.get(checkout.completeText)
                .should('be.visible')
                .and('contain.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        })

        it('compra mais de um produto com sucesso', () => {
            cy.fixture('products').then((products) => {
                const produtos = products.slice(0, 3).map((p) => p.slug)

                cy.compraProduto({ firstName, lastName, postalCode, produtos })

                cy.get(checkout.completeHeader)
                    .should('be.visible')
                    .and('contain.text', 'Thank you for your order!')
            })
        })
    })

    context('Fluxo negativo', () => {
        it('compra produto sem informar nenhum dado do usuário', () => {
            cy.iniciaCheckout()
            cy.preencheDadosCheckout()

            cy.get(checkout.errorMessage).should('be.visible')
            cy.url().should('include', '/checkout-step-one.html')
        })

        it('compra produto sem informar primeiro nome do usuário', () => {
            cy.iniciaCheckout()
            cy.preencheDadosCheckout({ lastName, postalCode })

            cy.get(checkout.errorMessage).should('be.visible')
            cy.url().should('include', '/checkout-step-one.html')
        })

        it('compra produto sem informar último nome do usuário', () => {
            cy.iniciaCheckout()
            cy.preencheDadosCheckout({ firstName, postalCode })

            cy.get(checkout.errorMessage).should('be.visible')
            cy.url().should('include', '/checkout-step-one.html')
        })

        it('compra produto sem informar código postal', () => {
            cy.iniciaCheckout()
            cy.preencheDadosCheckout({ firstName, lastName })

            cy.get(checkout.errorMessage).should('be.visible')
            cy.url().should('include', '/checkout-step-one.html')
        })
    })
})