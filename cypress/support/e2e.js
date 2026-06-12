import './commands'
import './commands_api'
import 'cypress-plugin-api'
import 'cypress-mochawesome-reporter/register'

afterEach(function () {
    cy.screenshot(this.currentTest.fullTitle().replace(/\s+/g, '-'))
})