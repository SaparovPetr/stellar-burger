// const buns = '[data-cy=buns]';
// const mains = '[data-cy=mains]';
// const ingredients = '[data-cy=ingredients]';
// const constructorIngredients = '[data-cy=constructor-ingredients]';

describe('Интеграционные тесты', function () {
  beforeEach(function () {
    cy.intercept('api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('http://localhost:4000');
  });

  it('работа модального окна', function () {
    cy.get('[data-cy=ingredient-link-two]').click(); // работает тут 🔴
  });

  it('Добавление булки в конструктор', function () {
    cy.get('[data-cy=ingredient-add-one]').click(); // но не работает тут 🔴
    // cy.contains('Добавить').click();

    cy.get(`[data-cy=constructor-bun-top]`).contains('булка').should('exist');

    cy.get(`[data-cy=constructor-bun-bottom]`)
      .contains('булка')
      .should('exist');
  });
});
