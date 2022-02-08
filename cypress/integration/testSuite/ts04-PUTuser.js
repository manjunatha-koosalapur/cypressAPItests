///<reference types = "Cypress" />

describe('PUT user request - Random User Name & Email', ()=>{
    
    let accessToken = 'c7f0aaeacaf27a1e9d7bf666d905e49e170c53f19735ded8b0d8e2cbfa5d85fc' //we can call this in tests
    //to genearte random mail id
    // let randomText = ""
    // let testEmail = ""
    // let testName = ""

    it('test01: Create user', ()=>{
        // var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        // for (var i = 0; i < 10; i++)
        // randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        // testEmail = randomText + '@gmail.com'
        // testName = randomText
        //CREATE User (POST METHOD)
        cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public-api/users/',
        headers: {
            'authorization': "Bearer " + accessToken
        },
        body: {
            "email": 'cypressAPIautomation23@mail.com',
            "name": 'Manjunatha cypressAPIautomation',
            "gender": "male",
            "status": "active"
        }

    }).then((response)=>{
        cy.log(JSON.stringify(response))
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.null
        expect(response.body.data).has.property('email','cypressAPIautomation23@mail.com')
        expect(response.body.data).has.property('name','Manjunatha cypressAPIautomation')
        expect(response.body.data).has.property('gender','male')
        expect(response.body.data).has.property('status','active')
        }).then((response) =>{
            const userId = response.body.data.id    //get details from API call response 
             cy.log("userID is: " + userId)         //storing user id in a variable
             //UPDATE User (PUT METHOD)
             cy.request({
                 method: 'PUT',
                 url: 'https://gorest.co.in/public/v1/users/'+userId,
                 headers: {
                     'Authorization': 'Bearer ' + accessToken
                 },
                 body: {
                    "email": "cypressAPIautomation23@mail.com", 
                    "name":"Manjunatha cypressAPIautomation-UPDATED",
                     "gender":"male",
                     "status":"active"
                   }
             }).then((response)=>{
                 expect(response.status).to.eq(200)
                 expect(response.body.data).has.property('email', 'cypressAPIautomation23@mail.com')
                 expect(response.body.data).has.property('name','Manjunatha cypressAPIautomation-UPDATED')
                 expect(response.body.data).has.property('status','active')
                 expect(response.body.data).has.property('gender','male')
                 cy.log(JSON.stringify(response))   //get details from API call response 
                 const userId = response.body.data.id   //storing user id in a variable
                 const userName = response.body.data.name //storing user name in a variable
                 const userEmail = response.body.data.email //storing user meail in a variable
                 cy.log("userID is:"+ userId, "userName is:"+ userName, "and userEmailID is:"+ userEmail)
             }).then((response) =>{
                const userId = response.body.data.id 
                 cy.log("userID is: " + userId)
                 //GET User (GET METHOD)
                 cy.request({
                     method: 'GET',
                     url: 'https://gorest.co.in/public/v1/users/'+userId,
                     headers: {
                         'Authorization': 'Bearer ' + accessToken
                     }
                 }).then((response)=>{
                     expect(response.status).to.eq(200)
                     expect(response.body.data).has.property('id', userId)
                     cy.log("userID is: " + userId)
                 })

            })

        })

    })
})