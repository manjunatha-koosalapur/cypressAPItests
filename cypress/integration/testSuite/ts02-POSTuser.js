///<reference types = "Cypress" />

describe('POST user request', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests


    it('test01: Create user', ()=>{
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        },
        body: {
            "name": "Manjunath Cypress API Test6",
            "email": "cypressAPI6@testEmail.com",
            "gender": "male",
            "status": "active"
        }

    }).then((response)=>{
        expect(response.status).to.eq(200)
        // assert.equal(response.status, 200)       //we can use this also for assertion step
        expect(response.body.data).has.property('email','cypressAPI6@testEmail.com')
        expect(response.body.data).has.property('name','Manjunath Cypress API Test6')
        expect(response.body).to.not.be.null
        // expect(response.body).to.be.null         //intenstionally to fail the assertion
        // console.log(response)
        })
    })

})