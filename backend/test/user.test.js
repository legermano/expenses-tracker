import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import secret from '../src/config/auth.config';

let authorization = null;
let userId = null;

describe('Test user endpoint - /user', () => {
  beforeAll(async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@gmail.com',
      password: 'Johdo&123',
    });

    authorization = res.body.token;
  });

  it('GET /me - Get user informations -> User id, username and email', async () => {
    const res = await request(app)
      .get('/user/me')
      .set('Authorization', authorization);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: 'John Doe',
        email: 'john.doe@gmail.com',
      })
    );

    userId = res.body.id;
  });

  it('GET /me - Try to get user information without authotization token -> No token provided!', async () => {
    const res = await request(app).get('/user/me');

    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'No token provided!',
      })
    );
  });

  it('GET /me - Try to get user information with invalid authorization token -> Unauthorized!', async () => {
    const res = await request(app)
      .get('/user/me')
      .set('Authorization', 'invalidToken');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Unauthorized!',
      })
    );
  });

  it('GET /me - Try to get informatoin from non existing user -> User not found!', async () => {
    const token = jwt.sign({ id: (userId += 2) }, secret, {
      expiresIn: 86400, // 24 hours
    });

    const res = await request(app).get('/user/me').set('Authorization', token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User not found!',
      })
    );
  });
});
