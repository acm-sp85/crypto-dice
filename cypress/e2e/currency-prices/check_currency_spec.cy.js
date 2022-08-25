/// <reference types="cypress" />

describe('currency price page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can show the correct default price', () => {
    // FIXME: why isn't waitUntil working? I don't know
    // Surprise Alex!!!

    // cy.waitUntil(() => {
    //   return cy.getBySelector('currency-loading-text').should('not.be.visible');
    // });

    // check correct default value is 3
    cy.getBySelector('credits-left-count').first().should('contain', '3');

    // click reference button
    cy.getBySelector('set-reference-button').click();

    // make sure that the bet up button is visible in the ui
    cy.getBySelector('bet-up-button').should('be.visible');

    // click the bet up button
    cy.getBySelector('bet-up-button').click();

    // TODO: shouldn't have arbitrary wait times
    // fix cy.waitUntil currency-loading-text doesn't exist
    // cy.wait(3000)
    // cy.getBySelector('currency-loading-text');

    // check that the check button is now visible
    cy.getBySelector('check-bet-cta').should('be.visible');

    // click check button
    cy.getBySelector('check-bet-cta').click();

    cy.getBySelector('try-again-cta').click();

    // FIXME: assume it wasn't a tie - add logic to catch tie later
    cy.getBySelector('credits-left-count').first().should('not.contain', '3');
  });
});
