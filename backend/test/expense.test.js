import request from 'supertest';
import app from '../src/app';

let authorization = null;

describe('Test expenses endpoint - /expenses', () => {
  beforeAll(async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@gmail.com',
      password: 'Johdo&123',
    });

    authorization = res.body.token;
  });

  it('POST /register - Create new expense -> Expense was register successfully!', async () => {
    const res = await request(app)
      .post('/expense')
      .set('Authorization', authorization)
      .send({
        name: 'Dinner at restaurant',
        description: 'Dinner at a fancy restaurant',
        value: 55.8,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Expense was registered successfully!',
        expense: expect.objectContaining({
          id: expect.any(Number),
          userId: expect.any(Number),
          name: 'Dinner at restaurant',
          description: 'Dinner at a fancy restaurant',
          value: 55.8,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      })
    );
  });
});
