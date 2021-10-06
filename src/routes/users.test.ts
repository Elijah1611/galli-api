import request from 'supertest'
import Server from '../server'
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import AppSeeder from '../data/seed/seeds/Seeder';

// @NOTE: For integration tests use a real database similar to production database

const server = new Server();

process.env.CONNECTION = 'testing'

beforeAll(async () => {
  await useRefreshDatabase({ connection: process.env.CONNECTION })

  server.run(7001)

  await useSeeding()
  await runSeeder(AppSeeder)
});

afterAll(async () => {
  await tearDownDatabase()
});

describe('GET /api/users', () => {
  test('responds with json', (done) => {
    try {

      request(server.app)
        .get('/api/users')
        .expect((res) => console.log(res.body))
        .expect(200, done)

    } catch (error) {
      done.fail(error)
    }
  });
});


