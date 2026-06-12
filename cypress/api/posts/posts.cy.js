import { faker } from '@faker-js/faker';

describe('Endpoint /posts', () => {
    let postSchema
    let postCreatedSchema

    before(() => {
        cy.fixture('schemas/post.schema.json').then((schema) => {
            postSchema = schema
        })
        cy.fixture('schemas/post-created.schema.json').then((schema) => {
            postCreatedSchema = schema
        })
    })

    context('GET', () => {
        it('listar todos os posts', () => {
            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/posts`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, postSchema)
            })
        })

        it('listar posts do usuário', () => {
            const userId = faker.number.int({ min: 1, max: 10 })

            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/posts?userId=${userId}`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, postSchema)
                response.body.forEach((post) => {
                    expect(post.userId).to.eq(userId)
                })
            })
        })

        it('listar posts de usuário inexistente', () => {
            cy.api({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/posts?userId=15`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                expect(response.body).to.have.length(0)
            })
        })
    })

    context('POST', () => {
        it('cria post para usuário', () => {
            const userId = faker.number.int({ min: 1, max: 10 })
            const title = faker.lorem.word()
            const body = faker.lorem.text()

            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/posts`,
                failOnStatusCode: false,
                body: {
                    title: title,
                    body: body,
                    userId: userId,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
                cy.validateSchema(response.body, postCreatedSchema)
                expect(response.body.title).to.eq(title)
                expect(response.body.body).to.eq(body)
                expect(response.body.userId).to.eq(userId)
            })
        })

        it('cria post para endpoint inexistente', () => {
            const userId = faker.number.int({ min: 1, max: 10 })
            const title = faker.lorem.word()
            const body = faker.lorem.text()

            cy.api({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/postss`,
                failOnStatusCode: false,
                body: {
                    title: title,
                    body: body,
                    userId: userId,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.headers['x-content-type-options']).to.eq('nosniff')
            })
        })
    })
})