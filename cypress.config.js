const { defineConfig } = require("cypress");

module.exports = defineConfig({
    allowCypressEnv: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'Relatório dos testes',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },
    e2e: {
        baseUrl: 'https://www.saucedemo.com/',
        specPattern: 'cypress/{e2e,api}/**/*.cy.{js,jsx,ts,tsx}',
        env: {
            apiUrl: 'https://jsonplaceholder.typicode.com'
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
    },
});
