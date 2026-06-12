import { faker } from '@faker-js/faker';

describe('Endpoint /users', () => {
    let userSchema
    let userSingleSchema

    before(() => {
        cy.fixture('schemas/user.schema.json').then((schema) => {
            userSchema = schema
        })
        cy.fixture('schemas/user-single.schema.json').then((schema) => {
            userSingleSchema = schema
        })
    })

    context('GET', () => {
        it('busca usuários', () => {
            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/users`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, userSchema)
            })
        })

        it('busca usuário', () => {
            const userId = faker.number.int({ min: 1, max: 10 })

            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/users/${userId}`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, userSingleSchema)
                expect(response.body.id).to.eq(userId)
            })
        })

        it('busca usuário inexistente', () => {
            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/users/21`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                expect(response.body).to.be.empty
            })
        })
    })

    context('PATCH', () => {
        it('atualiza usuário', () => {
            const userId = faker.number.int({ min: 1, max: 10 })
            const name = `${faker.person.firstName()} ${faker.person.lastName()}`
            const phone = faker.phone.number()

            cy.api({
                method: 'PATCH',
                url: `${Cypress.env('apiUrl')}/users/${userId}`,
                failOnStatusCode: false,
                body: { name, phone }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, userSingleSchema)
                expect(response.body.name).to.eq(name)
                expect(response.body.phone).to.eq(phone)
            })
        })

        it('atualiza usuário com endpoint inválido', () => {
            const name = `${faker.person.firstName()} ${faker.person.lastName()}`
            const phone = faker.phone.number()

            cy.api({
                method: 'PATCH',
                url: `${Cypress.env('apiUrl')}/users`,
                failOnStatusCode: false,
                body: { name, phone }
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                expect(response.body).to.be.empty
            })
        })
    })

    context('DELETE', () => {
        it('delete usuário', () => {
            const userId = faker.number.int({ min: 1, max: 10 })

            cy.api({
                method: 'DELETE',
                url: `${Cypress.env('apiUrl')}/users/${userId}`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                expect(response.body).to.be.empty
            })
        })
    })
})