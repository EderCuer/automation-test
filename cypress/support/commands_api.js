import Ajv from 'ajv'

const ajv = new Ajv()

Cypress.Commands.add('validateSchema', (body, schema) => {
    const validate = ajv.compile(schema)
    expect(validate(body), JSON.stringify(validate.errors)).to.be.true
})