describe('API Test', () => {

  it('should retrieve data with query parameters, validate response body and duration', () => {
    const searchQuery = 'testing api';
    const pageNumber = '2';
    
    cy.api({
      method: 'GET', // Specify http method
      url: `${Cypress.env('apiBaseUrl')}/test?search=${searchQuery}&page=${pageNumber}`, // Changes baseUrl and query params are added to the URL
    }).then((response) => {
      expect(response.status).to.eq(200); // Check status code
      expect(response.body).to.have.property('query'); // Check queries passed in the request
      expect(response.body.query.search).to.eq(searchQuery); // Check query value
      expect(response.body.query.page).to.eq(pageNumber); // Check query value
      expect(response.duration).to.be.lessThan(3000); // Check response duration
    });
  });

  it('checks status, headers, and response time', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/test`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(3000);
      expect(response.headers).to.have.property('content-type'); // Check header content-type on response
      expect(response.headers['content-type']).to.include('application/json'); // Check content-type value
    });
  });
  
  it('should create a resource with body parameters', () => {
    const payload = {
      name: 'Luis Zubeldia', //
      age: 42,
    };
    
    cy.api({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/test`,
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('body');
      expect(response.body.body.name).to.eq(payload.name);
      expect(response.body.body.age).to.eq(payload.age);
      expect(response.duration).to.be.lessThan(3000);
    });
  });

  it('should update a resource with body parameters and validate response', () => {
    const updatedData = {
      name: 'Carlos Sanabria',
      age: 72,
    };

    cy.api({
      method: 'PUT',
      url: `${Cypress.env('apiBaseUrl')}/test`,
      body: updatedData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('body');
      expect(response.body.body.name).to.eq(updatedData.name);
      expect(response.body.body.age).to.eq(updatedData.age);
      expect(response.duration).to.be.lessThan(3000);
    });
  });
  
  it('should partially update a resource and validate response', () => {
    cy.api({
      method: 'PATCH',
      url: `${Cypress.env('apiBaseUrl')}/test`,
      body: {
        age: 29,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('body');
      expect(response.body.body.age).to.eq(29);
      expect(response.duration).to.be.lessThan(3000);
    });
  });

  it('should delete a resource and validate response', () => {
    cy.api({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/test`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('method', 'DELETE');
      expect(response.duration).to.be.lessThan(3000);
    });
  });

  // Testing Invalid Scenarios

  it('should fail if response time exceeds threshold', () => {
    const text = 'api-test';
    const wait = 3000;

    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/echo?text=${text}&wait=${wait}`,
    }).then((response) => {
      
      try {
        expect(response.duration).to.not.be.greaterThan(3000);
      } catch (error) {
        const e = error as Error; // Type assertion
        cy.log('Duration assertion failed:', e.message);
        throw error;
      }
    });
  });

  it('should return 404 for invalid resource', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/test/qa-api`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should return 401 for unauthorized', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/qa/test3`,
      failOnStatusCode: false,
      headers: {
        'Authorization': 'Bearer 65a4he6r5g4e5vc6v6e5re',
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'API KEY is required');
      expect(response.duration).to.be.lessThan(3000);
    });
  });

  it('should return 500 for Internal Server Error', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/qa/test2`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.duration).to.be.lessThan(3000);
    });
  });

});
