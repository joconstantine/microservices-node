import request from 'supertest';
import { app } from '../../app';

it('clears cookie after sign out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  let response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();

  response = await request(app).post('/api/users/signout').expect(200);

  console.log(response.get('Set-Cookie'));
});
