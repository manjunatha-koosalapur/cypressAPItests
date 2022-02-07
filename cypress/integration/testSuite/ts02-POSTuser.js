///<reference types = "Cypress" />

describe('POST user request', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests

    it.skip('test01: Create user', ()=>{
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        },
        body: {
            "name": "Manjunath Cypress API Test",
            "email": "cypressAPI11@testEmail.com",
            "gender": "male",
            "status": "active"
        }

    }).then((response)=>{
        expect(response.status).to.eq(200)
        // assert.equal(response.status, 200)       //we can use this also for assertion step
        expect(response.body).to.not.be.null
        expect(response.body.data).has.property('email','cypressAPI11@testEmail.com')
        expect(response.body.data).has.property('name','Manjunath Cypress API Test')
        expect(response.body.data).has.property('gender','male')
        expect(response.body.data).has.property('status','active')
        // expect(response.body).to.be.null         //intenstionally to fail the assertion
        // console.log(response)
        // cy.log(JSON.stringify(response))
        })
    })

})

//Randomizing User Name and User Email ID
describe('POST user request - Random User Name & Email', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests
    //to genearte random mail id
    let randomText = ""
    let testEmail = ""
    let testName = ""

    it('test02: Create user', ()=>{
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        testName = randomText

        cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        },
        body: {
            "name": testName,
            "email": testEmail,
            "gender": "male",
            "status": "active"
        }

    }).then((response)=>{
        expect(response.status).to.eq(200)
        // assert.equal(response.status, 200)       //we can use this also for assertion step
        expect(response.body).to.not.be.null
        expect(response.body.data).has.property('email',testEmail)
        expect(response.body.data).has.property('name',testName)
        expect(response.body.data).has.property('gender','male')
        expect(response.body.data).has.property('status','active')
        // expect(response.body).to.be.null         //intenstionally to fail the assertion
        // console.log(response)
        cy.log(JSON.stringify(response))   //get details from API call response 
        const userId = response.body.data.id   //storing user id in a variable
        const userName = response.body.data.name //storing user name in a variable
        const userEmail = response.body.data.email //storing user meail in a variable
        cy.log("userID is:" + userId, "userName is:" + userName, "and userEmailID is:" + userEmail)

        })
    })

})

//passing test data from fixture file
const testData = require('../../fixtures/createUser')

describe('POST user request- testData from fixture file', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests

    it.skip('test03: Create user', ()=>{
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
        // assert.equal(response.status, 200)       //we can use this also for assertion step
        expect(response.body).to.not.be.null
        expect(response.body.data).has.property('email',testData.email)
        expect(response.body.data).has.property('name',testData.name)
        expect(response.body.data).has.property('gender',testData.gender)
        expect(response.body.data).has.property('status',testData.status)
        // expect(response.body).to.be.null         //intenstionally to fail the assertion
        // console.log(response)
        // cy.log(JSON.stringify(response))
        })
    })

})