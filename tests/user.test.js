import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import application from '@app/index';
import { databaseUtils } from './utils';

/* Initial */
databaseUtils.initial();
/* Execute */
describe('Users', () => {
  it('[POST] /v1/users', async () => {
    /* Prepare */
    let user = {
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    /* Execute */
    await request(application)
      .post('/v1/users')
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.name).toBe(user.name);
        expect(response.body.data.username).toBe(user.username);
      });
  });

  it('[PUT] /v1/users', async () => {
    /* Prepare */
    let user = {
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await request(application)
      .post('/v1/users')
      .send(user)
      .then((response) => {
        user.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .put(`/v1/users/${user.id}`)
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.name).toBe(user.name);
        expect(response.body.data.username).toBe(user.username);
      });
  });

  it('[DELETE] /v1/users', async () => {
    /* Prepare */
    let user = {
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await request(application)
      .post('/v1/users')
      .send(user)
      .then((response) => {
        user.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .delete(`/v1/users/${user.id}`)
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
      });
  });

  it('[GET] /v1/users/:id', async () => {
    /* Prepare */
    let user = {
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await request(application)
      .post('/v1/users')
      .send(user)
      .then((response) => {
        user.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .get(`/v1/users/${user.id}`)
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).toBe(user.id);
        expect(response.body.data.name).toBe(user.name);
        expect(response.body.data.username).toBe(user.username);
      });
  });

  it('[GET] /v1/users', async () => {
    /* Prepare */
    let user = {
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await request(application)
      .post('/v1/users')
      .send(user)
      .then((response) => {
        user = response.body.data;
      });
    /* Execute */
    await request(application)
      .get('/v1/users')
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.totalCounts).not.toBe(0);
      });
  });
});
