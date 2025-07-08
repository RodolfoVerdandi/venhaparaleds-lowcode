const request = require('supertest');
const app = require('../index');

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done); // Impede travamento no GitHub Actions
});

describe('GET /concursos', () => {
  it('deve retornar 200 e um array', async () => {
    const res = await request(server).get('/concursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
