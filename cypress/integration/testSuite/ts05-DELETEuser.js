/// <reference types="Cypress" />
describe('Delete user request', () => {
 let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc'
    it('create user test', () => {
            //Create User (POST METHOD)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "email": "ManjunathaCypressTest3@mail.com",
                    "name":"ManjunathaCypressTest",
                    "gender":"male",
                    "status":"active"
                  }
   
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(201)
                expect(res.body.data).has.property('email', 'ManjunathaCypressTest3@mail.com')
                expect(res.body.data).has.property('name','ManjunathaCypressTest')
            }).then((res) =>{
                   const userId = res.body.data.id 
                    cy.log("userID is: " + userId)
                    //Delete User (DELETE METHOD)
                    cy.request({
                        method: 'DELETE',
                        url: 'https://gorest.co.in/public/v1/users/'+userId,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    }).then((res)=>{
                        expect(res.status).to.eq(204)
                        expect(res.statusText).to.eq('No Content')
                        cy.log(JSON.stringify(res))
                        
                    })
            })
            
        
        
    })
})