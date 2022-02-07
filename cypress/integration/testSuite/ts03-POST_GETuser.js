/// <reference types="Cypress" />

// // passing test data from fixture file and access the const in the IT block
const testData = require('../../fixtures/createUser')

describe('POST user request- testData from fixture file', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests

    it('test03: Create user', ()=>{
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        },
        body: {
            "name": testData.name,
            "email": testData.email,
            "gender": testData.gender,
            "status": testData.status
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.null
        expect(response.body.data).has.property('email',testData.email)
        expect(response.body.data).has.property('name',testData.name)
        expect(response.body.data).has.property('gender',testData.gender)
        expect(response.body.data).has.property('status',testData.status)
        }).then((response) =>{
            const userId = response.body.data.id 
             cy.log("userID is: " + userId)
             //GET User (GET Method)
             cy.request({
                 method: 'GET',
                 url: 'https://gorest.co.in/public/v1/users/'+userId,
                 headers: {
                     'Authorization': 'Bearer ' + accessToken
                 }
             }).then((response)=>{
                 expect(response.status).to.eq(200)
                 expect(response.body.data).has.property('id', userId)
                 expect(response.body.data).has.property('name',testData.name)
                 expect(response.body.data).has.property('status',testData.status)
                 expect(response.body.data).has.property('email', testData.email)
                 cy.log("userID is: " + userId, "userName is: " + testData.name, "and userEmailID is: " + testData.email)
             })
     })
     
 
 })
})

// // // passing test data from fixture file and use fixture METHOD in the IT block
// const testData = require('../../fixtures/createUser')

// describe('Create (POST) user and Fetch (GET) the user details', () => {
// let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc'
//     it.only('test01: Create user and fetch user details', () => {

//         cy.fixture('createUser').then((payload) =>{
//             //Create User (POST Method)
//             cy.request({
//                 method: 'POST',
//                 url: 'https://gorest.co.in/public/v1/users',
//                 headers: {
//                     'Authorization': 'Bearer ' + accessToken
//                 },
//                 body: {
//                     "name": payload.name,
//                     "gender": payload.gender,
//                     "email": payload.email,
//                     "status":payload.status
//                 }
   
//             }).then((response)=>{
//                 cy.log(JSON.stringify(response))
//                 expect(response.status).to.eq(201)
//                 expect(response.body.data).has.property('email', payload.email)
//                 expect(response.body.data).has.property('name',payload.name)
//                 expect(response.body.data).has.property('status',payload.status)
//                 expect(response.body.data).has.property('gender',payload.gender)
//             }).then((response) =>{
//                    const userId = response.body.data.id 
//                     cy.log("userID is: " + userId)
//                     //GET User (GET Method)
//                     cy.request({
//                         method: 'GET',
//                         url: 'https://gorest.co.in/public/v1/users/'+userId,
//                         headers: {
//                             'Authorization': 'Bearer ' + accessToken
//                         }
//                     }).then((response)=>{
//                         expect(response.status).to.eq(200)
//                         expect(response.body.data).has.property('id', userId)
//                         expect(response.body.data).has.property('name',payload.name)
//                         expect(response.body.data).has.property('status',payload.status)
//                         expect(response.body.data).has.property('email', payload.email)
//                         cy.log("userID is: " + userId, "userName is: " + payload.name, "and userEmailID is: " + payload.email)
//                     })
//             })
            
        
//         })
//     })
// })