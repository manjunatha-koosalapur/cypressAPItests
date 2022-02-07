///<reference types = "Cypress" />

describe('check weather informaiton', ()=>{


    it.skip('test01: GET weather ifnormation for all cities', ()=>{
        //GET request for all cities 
        cy.request({
              method: 'GET',
              url: 'https://www.metaweather.com/api/location/search/?query=Ber'
           
        }).then((response)=>{
            const city = response.body[0].title
            return city
        })
            .then((city)=>{
                //GET request for the first city from the first GET request
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+city
                }).then((response)=>{
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.property('title', city)
                })

            })

    })


    it.skip('test02: get weather information for all cities', ()=>{
        //GET request for all cities 
        cy.request({
              method: 'GET',
              url: 'https://www.metaweather.com/api/location/search/?query=Ber'
           
        }).then((response)=>{
            const location = response.body
            return location
        })
            .then((location)=>{

                for(let i=0; i< location.length; i++){
                //GET request to scan all location from the first GET request
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+location[i].title
                }).then((response)=>{
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.property('title', location[i].title)
                })

            }

            })

    })


    it.skip('test03: GET weather ifnormation based on latitude-longitude', ()=>{
        cy.request({
              method: 'GET',
              url: 'https://www.metaweather.com/api/location/search/?lattlong=52.516071,13.376980'
           
        }).then((response)=>{
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.property('title')
                })

    })    


    it('test04: GET weather ifnormation for cities based on latitude-longitude', ()=>{
        //GET request for all cities 
        cy.request({
              method: 'GET',
              url: 'https://www.metaweather.com/api/location/search/?lattlong=52.516071,13.376980'
           
        }).then((response)=>{
            const city = response.body
            return city
        })
            .then((city)=>{
                //GET request to scan all cities from the first GET request
                for(let i=0; i< city.length; i++){
                
                    cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+city[i].title
                }).then((response)=>{
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.property('title', city[i].title)
                })
            }

            })

    })    



})