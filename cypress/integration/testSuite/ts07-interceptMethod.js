/// <reference types="Cypress" />

describe('intercept - Spy & Stub network requests and responses', ()=>{

    it('test01: mock API with intercept stubbing', ()=>{

        cy.visit('https://jsonplaceholder.typicode.com/')

        cy.intercept({
            path : '/posts'

        }).as('posts')

        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.wait('@posts').then(inter =>{
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.length(100)
        })

    })

    it('test02: mock API with intercept static response stubbing', ()=>{
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET', '/posts', {totalPost:8, name:'Manjunatha'}).as('posts')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.wait('@posts')
    })

    it('test03: mock API Awith intercept fixture file response stubbing', ()=>{
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET', '/posts', {fixture: 'createUser.json'}).as('posts')
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
        cy.wait('@posts')
    
    })  
        
})