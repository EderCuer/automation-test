import { login } from '../../support/selectors/login/Login'

describe('Login', () => {
    let users

    before(() => {
        cy.fixture('users').then((data) => {
            users = data
        })
    })

    context('Fluxo positivo', () => {
        it('realiza login com sucesso', () => {
            cy.login(users.valid)

            cy.url().should('include', '/inventory.html')
        })
    })

    context('Fluxo negativo', () => {
        it('realiza login com usuário inexistente', () => {
            cy.login(users.invalidUsername)

            cy.get(login.loginError)
                .should('be.visible')
                .and('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it('realiza login com senha inválida', () => {
            cy.login(users.invalidPassword)

            cy.get(login.loginError)
                .should('be.visible')
                .and('contain.text', 'Epic sadface: Username and password do not match any user in this service')
        })

        it('realiza login com campos em branco', () => {
            cy.login(users.blankFields)

            cy.get(login.loginError)
                .should('be.visible')
                .and('contain.text', 'Epic sadface: Username is required')
        })

        it('realiza login com usuário bloqueado', () => {
            cy.login(users.lockedOut)

            cy.get(login.loginError)
                .should('be.visible')
                .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
        })
    })
})
