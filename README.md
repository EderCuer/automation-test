# Automation Test - Cypress

Projeto de automação de testes end-to-end (E2E) e de API utilizando Cypress. Os testes E2E cobrem os fluxos de login e checkout da aplicação [SauceDemo](https://www.saucedemo.com/), enquanto os testes de API validam os endpoints da [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

A arquitetura do projeto é baseado na técnica de automação de testes App Actions, é um modelo proposto pelos desenvolvedores do Cypress, que encaixa melhor na arquitetura do Cypress. 

## Relatório

O relatório de execução atualizado a cada push está disponível em:
**[https://edercuer.github.io/automation-test/](https://edercuer.github.io/automation-test/)**

---

## Estrutura de pastas

```
automation-test-cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml           # Pipeline CI/CD (GitHub Actions)
├── cypress/
│   ├── api/                      # Testes de API
│   │   ├── posts/
│   │   │   └── posts.cy.js
│   │   └── users/
│   │       └── users.cy.js
│   ├── e2e/                      # Testes end-to-end
│   │   ├── checkout/
│   │   │   └── checkout.cy.js
│   │   └── login/
│   │       └── login.cy.js
│   ├── fixtures/                 # Dados de teste
│   │   ├── schemas/              # JSON Schemas para validação de API
│   │   │   ├── post.schema.json
│   │   │   ├── post-created.schema.json
│   │   │   ├── user.schema.json
│   │   │   └── user-single.schema.json
│   │   ├── products.json         # Produtos do SauceDemo
│   │   └── users.json            # Dados de usuários
│   └── support/
│       ├── selectors/            # Seletores centralizados por domínio
│       │   ├── cart/Cart.js
│       │   ├── checkout/Checkout.js
│       │   ├── inventory/Inventory.js
│       │   └── login/Login.js
│       ├── commands.js           # Custom commands E2E
│       ├── commands_api.js       # Custom commands de API
│       └── e2e.js                # Configuração do support
├── cypress.config.js
├── package.json
└── README.md
```

---

## Versões utilizadas

| Ferramenta | Versão |
|---|---|
| Node.js | 22.22.0 |
| npm | 10.9.4 |
| Cypress | 15.17.0 |
| @faker-js/faker | 10.4.0 |
| ajv | 8.20.0 |
| cypress-mochawesome-reporter | 4.0.2 |
| cypress-plugin-api | 2.11.2 |

---

## Dependências

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 22 ou superior

### Instalação
Acessar a página do projeto e rodar o comando:
```bash
npm install
```

---

## Como executar os testes

### Interface gráfica (modo interativo)

```bash
npm run cypress:open
```

### Linha de comando (modo headless)

| Comando | Descrição |
|---|---|
| `npm test` | Todos os testes |
| `npm run test:e2e` | Todos os testes E2E |
| `npm run test:e2e:login` | Testes de login |
| `npm run test:e2e:checkout` | Testes de checkout |
| `npm run test:api` | Todos os testes de API |
| `npm run test:api:posts` | Testes do endpoint `/posts` |
| `npm run test:api:users` | Testes do endpoint `/users` |

---

## Relatório

O relatório é gerado automaticamente após cada execução no diretório `cypress/reports/html/index.html`.

Para visualizá-lo localmente, abra o projeto e acesse a pasta /reports

```bash
cypress/reports/html/index.html
```

O relatório inclui:
- Resultado de cada teste (passou/falhou)
- Gráficos de cobertura
- Screenshots de evidência embutidas diretamente no HTML

---

## CI/CD

O projeto possui pipeline configurado com **GitHub Actions** que executa automaticamente após cada push ou pull request na branch `main`.

Os jobs rodam em paralelo:
- **E2E Tests** — executa os testes de interface
- **API Tests** — executa os testes de API
- **Publicar Relatório** — publica o resultado no GitHub Pages após ambos terminarem
