/// <reference types="Cypress" />

describe('OAuth2.0 API Tests', ()=>{
    let access_token = '';
    let userId = ''
    
        beforeEach('Generate Access Token', ()=>{
            //generate access token
            cy.request({
                method: 'POST',
                url: '/token',              //baseUrl is coming from cypress.json
                form: true,
                body:{
                    "client_id" : "cypressTestAutomation",
                    "client_secret" : "f20845c2d34731533b30eb914c217238",
                    "grant_type" : "client_credentials"
                }
        }).then(response=>{
               cy.log(JSON.stringify(response));
               cy.log(response.body.access_token);
               access_token = response.body.access_token;
    
               //get the user id
                cy.request({
                    method: 'GET',
                    url: '/api/me',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    userId = response.body.id;
                    cy.log("user id " + userId);
                })
            })
        })
    it('test01: Retrieves user that is tied to the access token', ()=>{
                    cy.request({
                        method: 'GET',
                        url: '/api/me',
                        headers: {
                            'Authorization' : 'Bearer ' + access_token
                        }
            }).then(response=>{
                        cy.log(JSON.stringify(response))
                        expect(response.status).to.eql(200)
                        expect(response.body).to.not.be.null
                        expect(response.body.email).to.eq('manjunatha.yell@gmail.com')
                })
        })
            
            
    it('test02: Unlock the Barn', ()=>{
                cy.request({
                    method: 'POST',
                    url: '/api/'+userId+'/barn-unlock',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
        }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(200);
                })
            })
    
    it('test03: Put the Toilet Seat Down', ()=>{
                cy.request({
                    method: 'POST',
                    url: '/api/'+userId+'/toiletseat-down',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(200);
                })
        })
    
    it('test04: Chicekn Feed Test', ()=>{
                cy.request({
                    method: 'POST',
                    url: '/api/'+userId+'/chickens-feed',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(200);
                })
            
        })

    it('test05: Collect Eggs from Your Chickens', ()=>{
                cy.request({
                    method: 'POST',
                    url: '/api/'+userId+'/eggs-collect',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(200);
                })
        
    })
    
    it('test06: Get the Number of Eggs Collected Today', ()=>{
                cy.request({
                    method: 'POST',
                    url: '/api/'+userId+'/eggs-count',
                    headers: {
                        'Authorization' : 'Bearer ' + access_token
                    }
                }).then(response=>{
                    cy.log(JSON.stringify(response));
                    expect(response.status).to.equal(200);
                })
    
    })
    
})