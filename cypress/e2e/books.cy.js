describe('books library test', () => {
  beforeEach (() => {
    cy.visit("/");
  })

  it('should login', () => {    
    cy.login("bropet@mail.ru", "123");
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible');
  })
  
  it('should not login with empty email', () => {    
    cy.login(null, "123");
    cy.get('#mail').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    })
  })

  it('should not login with empty pass', () => {    
    cy.login("bropet@mail.ru", null); 
    cy.get('#pass').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    })
  })
})