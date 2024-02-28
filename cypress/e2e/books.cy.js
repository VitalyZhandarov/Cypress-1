describe('books library test', () => {
  beforeEach (() => {
    cy.visit("/");
  });

  it('should login', () => {    
    cy.login("bropet@mail.ru", "123");
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible');
  });
  
  it('should not login with empty email', () => {    
    cy.login(null, "123");
    cy.get('#mail').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    })
  });

  it('should not login with empty pass', () => {    
    cy.login("bropet@mail.ru", null); 
    cy.get('#pass').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    });
  });
  
  it("should to add a book to favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Война и мир",
    "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
    "Толстой Лев Николаевич");
    cy.get('h4').click();
    cy.contains("Война и мир");
  });

  it("Should to remove a book from favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Война и мир",
    "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
    "Толстой Лев Николаевич");
    cy.contains('Favorites').click(); 
    cy.contains('Delete from favorite').click(); 
    cy.contains("Please add some book to favorit on home page!").should("be.visible");
  });

  it("should not add book without title on page", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook(
      "",
      "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
    "Толстой Лев Николаевич");
    cy.get('#title').then($el => cy.log($el));
    cy.get('#title').then($el => $el[0].checkValidity()).should('be.false'); 
    cy.get('#title').then(($el) => $el[0].validationMessage)
    .should('be.equal', 'Заполните это поле.');
  })
});