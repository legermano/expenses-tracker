import request from 'supertest';
import app from '../src/app';

let authorization = null;
let newExpenseId = null;

describe('Test expenses endpoint - /expenses', () => {
  beforeAll(async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@gmail.com',
      password: 'Johdo&123',
    });

    authorization = res.body.token;
  });

  it('POST / - Create new expense -> Expense was register successfully!', async () => {
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

    newExpenseId = res.body.expense.id;
  });

  it('POST / - Try to create expense without required fieds -> ValidationError', async () => {
    const res = await request(app)
      .post('/expense')
      .set('Authorization', authorization)
      .send({
        description: 'Description',
        value: 10.0,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        type: 'ValidationError',
        message: 'Name is required',
      })
    );
  });

  it('PUT /:id - Update an specific expense', async () => {
    const res = await request(app)
      .put(`/expense/${newExpenseId}`)
      .set('Authorization', authorization)
      .send({
        name: 'Dinner at restaurant - Update',
      });

    expect(res.statusCode).toEqual(204);
  });

  it('PUT /:id - Try to update non existing expense -> Could not update expense!', async () => {
    let nonExistingId = newExpenseId;
    nonExistingId += 1;

    const res = await request(app)
      .put(`/expense/${nonExistingId}`)
      .set('Authorization', authorization)
      .send({
        name: 'New smartphone',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Could not update expense!',
      })
    );
  });

  it('PUT /:id - Try to update expense by non numeric Id -> ValidationError', async () => {
    const res = await request(app)
      .put('/expense/nonNumericKey')
      .set('Authorization', authorization)
      .send({
        name: 'Bills',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        type: 'ValidationError',
        message: expect.any(String),
      })
    );
  });

  it(`GET /all - List all user's expenses`, async () => {
    const res = await request(app)
      .get('/expense/all')
      .set('Authorization', authorization);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: newExpenseId,
          userId: expect.any(Number),
          name: 'Dinner at restaurant - Update',
          description: 'Dinner at a fancy restaurant',
          value: 55.8,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });

  it('GET /:id - Get specific expense -> Expense object', async () => {
    const res = await request(app)
      .get(`/expense/${newExpenseId}`)
      .set('Authorization', authorization);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: newExpenseId,
        userId: expect.any(Number),
        name: 'Dinner at restaurant - Update',
        description: 'Dinner at a fancy restaurant',
        value: 55.8,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });

  it('GET /:id - Try to get non existing expense -> Expense not found', async () => {
    let nonExistingId = newExpenseId;
    nonExistingId += 1;

    const res = await request(app)
      .get(`/expense/${nonExistingId}`)
      .set('Authorization', authorization);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Expense not found',
      })
    );
  });
});
