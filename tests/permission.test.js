import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import application from '@app/index';
import { databaseUtils } from './utils';

/* Initial */
databaseUtils.initial();
/* Execute */
describe('Permission', () => {
  it('[POST] /v1/permissions', async () => {
    /* Prepare */
    let permission = {
      code: faker.address.countryCode(),
      description: faker.address.city(),
    };
    /* Execute */
    await request(application)
      .post('/v1/permissions')
      .send(permission)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.code).toBe(permission.code);
        expect(response.body.data.description).toBe(permission.description);
      });
  });

  it('[PUT] /v1/permissions', async () => {
    /* Prepare */
    let permission = {
      code: faker.address.countryCode(),
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/permissions')
      .send(permission)
      .then((response) => {
        permission.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .put(`/v1/permissions/${permission.id}`)
      .send(permission)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.code).toBe(permission.code);
        expect(response.body.data.description).toBe(permission.description);
      });
  });

  it('[DELETE] /v1/permissions', async () => {
    /* Prepare */
    let permission = {
      code: faker.address.countryCode(),
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/permissions')
      .send(permission)
      .then((response) => {
        permission.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .delete(`/v1/permissions/${permission.id}`)
      .send(permission)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
      });
  });

  it('[GET] /v1/permissions/:id', async () => {
    /* Prepare */
    let permission = {
      code: faker.address.countryCode(),
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/permissions')
      .send(permission)
      .then((response) => {
        permission.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .get(`/v1/permissions/${permission.id}`)
      .send(permission)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).toBe(permission.id);
        expect(response.body.data.code).toBe(permission.code);
        expect(response.body.data.description).toBe(permission.description);
      });
  });

  it('[GET] /v1/permissions', async () => {
    /* Prepare */
    let permission = {
      code: faker.address.countryCode(),
      description: faker.address.city(),
    };

    await request(application)
      .post('/v1/permissions')
      .send(permission)
      .then((response) => {
        permission = response.body.data;
      });
    /* Execute */
    await request(application)
      .get('/v1/permissions')
      .send(permission)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.totalCounts).not.toBe(0);
      });
  });
});
