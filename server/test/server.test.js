let app = require('../server');
let testServer = require('supertest');


describe('Test the root path', () => {
  test('it should respond 200 to the logout route', async () => {
    const response = await testServer(app).post('/api/user/logout');
    expect(response.statusCode).toBe(200);
  })
})

  test('should protect the /user route', async () => {
    const response = await testServer(app).get('/api/user');
    expect(response.statusCode).toBe(403);
  })

  test('/user route should return user info when authenticated', async () => {
    let agent = testServer.agent(app);
    const response = await agent
                            .post('/api/user/login')
                            .send({username: 'Rachel', password: 'password'});
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get('/api/user')
    expect(userResponse.statusCode).toBe(200);
  })

  test('/day/dates should return when user is logged in and authenticated', async () => {
    let agent = testServer.agent(app);
    const response = await agent
                            .post('/api/user/login')
                            .send({username: 'Rachel', password: 'password'});
    expect(response.statusCode).toBe(200);

    const dayResponse = await agent.get('/api/day/dates?startDate=2019-05-15&endDate=2019-05-20')
    expect(dayResponse.statusCode).toBe(200);
    console.log('dayResponse:', dayResponse)
  })