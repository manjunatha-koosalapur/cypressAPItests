/// <reference types="Cypress" />
describe('Delete user request', () => {
 let accessToken = '007526d9efdbc07e084ff7a6d4cfcc90588fbe20641c00faebf45a7f3b2eaf33'
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