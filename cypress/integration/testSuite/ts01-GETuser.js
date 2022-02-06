///<reference types = "Cypress" />

describe('GET user request', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests


    it('test01: GET all users', ()=>{
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        // assert.equal(response.status, 200)       //we can use this also for assertion step
        expect(response.body.data).to.be.a('array')
        expect(response.body).to.not.be.null
        // expect(response.body).to.be.null         //intenstionally to fail the assertion
        // console.log(response)
        })
    })

    it('test02: GET user by ID', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public-api/users/3406',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.data.id).to.eq(3406)
            expect(response.body.data.name).to.eq('Manjunath Cypress API Test')
            })
        })

})