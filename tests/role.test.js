import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import application from '@app/index';
import { databaseUtils } from './utils';

/* Initial */
databaseUtils.initial();
/* Execute */
describe('Roles', () => {
  it('[POST] /v1/roles', async () => {
    /* Prepare */
    let role = {
      description: faker.address.city(),
    };
    /* Execute */
    await request(application)
      .post('/v1/roles')
      .send(role)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.description).toBe(role.description);
      });
  });

  it('[PUT] /v1/roles', async () => {
    /* Prepare */
    let role = {
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/roles')
      .send(role)
      .then((response) => {
        role.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .put(`/v1/roles/${role.id}`)
      .send(role)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.description).toBe(role.description);
      });
  });

  it('[DELETE] /v1/roles', async () => {
    /* Prepare */
    let role = {
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/roles')
      .send(role)
      .then((response) => {
        role.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .delete(`/v1/roles/${role.id}`)
      .send(role)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
      });
  });

  it('[GET] /v1/roles/:id', async () => {
    /* Prepare */
    let role = {
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/roles')
      .send(role)
      .then((response) => {
        role.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .get(`/v1/roles/${role.id}`)
      .send(role)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).toBe(role.id);
        expect(response.body.data.description).toBe(role.description);
      });
  });

  it('[GET] /v1/roles', async () => {
    /* Prepare */
    let role = {
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/roles')
      .send(role)
      .then((response) => {
        role = response.body.data;
      });
    /* Execute */
    await request(application)
      .get('/v1/roles')
      .send(role)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.totalCounts).not.toBe(0);
      });
  });
});
