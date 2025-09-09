import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the login page', () => {
  cy.visit('/signin')
})

When('I enter a valid username and a valid password', () => {
  cy.get(`[data-testid="input-username"]`).type('admin')
  cy.get(`[data-testid="input-password"]`).type('Admin123!')
})

When('I click the {string} button', (s: string) => {
  cy.get(`[data-testid="button-signin"]`).click()
})

Then('I should be redirected to the dashboard', () => {
  cy.location('pathname').should('have.string', '/')
})

Then('I should see complete menu', () => {
  cy.get('div').contains('')
})
