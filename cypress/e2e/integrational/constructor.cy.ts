const baseUrl = 'http://localhost:4000';
const getIngredientsUrl = 'api/ingredients';
const getUserUrl = 'api/auth/user';
const postOrderUrl = 'api/orders';

const pinkBunAddBatton =
  '[data-cy=ingredient-list-item-eight] button[type=button]';
const placeForTopBun = `[data-cy=constructor-bun-top]`;
const placeForBottomBun = `[data-cy=constructor-bun-bottom]`;
const firstOfMainAddButton =
  '[data-cy=ingredient-list-item-two] button[type=button]';
const placeBetweenBuns = '[data-cy=ingredient-between-buns]';
const modalContent = '[data-cy=modal-content]';
const closeModalButton = '[data-cy=modal-content] button[type=button]';
const firstOfMainModal = '[data-cy=ingredient-link-two]';
const overlayUnderModal = '[data-cy=overlay-for-modal]';
const makeOrderButton = '[data-cy=make-order-button]';

describe('Интеграционные тесты', function () {
  beforeEach(function () {
    cy.intercept(getIngredientsUrl, {
      fixture: 'ingredients.json'
    });
    cy.visit(baseUrl);
  });

  describe('ДОБАВЛЕНИЕ В КОНСТРУКТОР', function () {
    it('добавление булки', function () {
      cy.get(pinkBunAddBatton).click();
      cy.get(placeForTopBun).contains('булка').should('exist');
      cy.get(placeForBottomBun).contains('булка').should('exist');
    });

    it('добавление начинки', function () {
      cy.get(firstOfMainAddButton).click();
      cy.get(placeBetweenBuns).contains('марсианской').should('exist');
    });
  });

  describe('ОТРАБАТЫВАЕНИЕ МОДАЛКИ', function () {
    beforeEach(function () {
      cy.get(firstOfMainModal).click();
    });

    it('закрытие по кнопке', function () {
      cy.get(modalContent).should('exist');
      cy.get(closeModalButton).click();
      cy.get(modalContent).should('not.exist');
    });

    it('закрытие по оверлею', function () {
      cy.get(modalContent).should('exist');
      cy.get(overlayUnderModal).click('top', { force: true });
      cy.get(modalContent).should('not.exist');
    });
  });

  describe('ФОРМИРОВАНИЕ И ОТПРАВКА ЗАКАЗА НА СЕРВЕР', function () {
    beforeEach(function () {
      cy.intercept(getUserUrl, { fixture: 'user.json' });
      cy.intercept(postOrderUrl, { fixture: 'order.json' });
      window.localStorage.setItem('refreshToken', JSON.stringify('9999999999'));
      cy.setCookie('accessToken', JSON.stringify('8888888888'));
    });

    afterEach(function () {
      cy.clearCookie('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('добление, отправка, сверка номера', function () {
      cy.get(pinkBunAddBatton).click();
      cy.get(firstOfMainAddButton).click();
      cy.get(makeOrderButton).click();
      cy.get(modalContent).contains('111222333').should('exist');
    });

    it('закрытие модалки, проверка очистки конструктора', function () {
      cy.get(pinkBunAddBatton).click();
      cy.get(firstOfMainAddButton).click();
      cy.get(makeOrderButton).click();
      cy.get(modalContent).contains('111222333').should('exist');

      cy.get(closeModalButton).click();
      cy.get(modalContent).should('not.exist');
      cy.get(placeForTopBun).contains('булка').should('not.exist');
      cy.get(placeForBottomBun).contains('булка').should('not.exist');
      cy.get(placeBetweenBuns).should('not.exist');
    });
  });
});
