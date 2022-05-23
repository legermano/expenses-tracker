import request from 'supertest';
import app from '../src/app';

describe('Test app authorizations - /auth', () => {
  it('POST /register - Create new user -> User was registered successfully!', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'Foo User',
      email: 'foo@gmail.com',
      password: 'Foo@123',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User was registered successfully!',
      })
    );
  });

  it('POST /register - Try to create duplicate user -> Email is already in use', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'Foo User',
      email: 'foo@gmail.com',
      password: 'Foo@123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Email is already in use',
      })
    );
  });

  it('POST /register - Validate body schema -> ValidationError', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'Foo',
      email: 'foo@gmail.com',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        type: 'ValidationError',
        message: expect.any(String),
      })
    );
  });

  it('POST /login - Login with John Doe -> User object', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@gmail.com',
      password: 'Johdo&123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        token: expect.any(String),
      })
    );
  });

  it('POST /login - Try to login with wrong e-mail -> User not found!', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe1@gmail.com',
      password: 'Johndo&123',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User not found!',
      })
    );
  });

  it('POST /login - Try to login with wrong password -> Invalid password!', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@gmail.com',
      password: 'Johndo&12',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Invalid password!',
      })
    );
  });
});
