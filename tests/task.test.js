import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import application from '@app/index';
import { databaseUtils } from './utils';

/* Initial */
databaseUtils.initial();
/* Execute */
describe('Tasks', () => {
  it('[POST] /v1/tasks', async () => {
    /* Prepare */
    let task = {
      description: faker.address.city(),
    };
    /* Execute */
    await request(application)
      .post('/v1/tasks')
      .send(task)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.description).toBe(task.description);
        expect(response.body.data.isFinished).toBe(false);
      });
  });

  it('[PUT] /v1/tasks', async () => {
    /* Prepare */
    let task = {
      description: faker.address.city()
    }

    await request(application)
      .post('/v1/tasks')
      .send(task)
      .then((response) => {
        task.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .put(`/v1/tasks/${task.id}`)
      .send(task)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).not.toBe(null);
        expect(response.body.data.description).toBe(task.description);
      });
  });

  it('[DELETE] /v1/tasks', async () => {
    /* Prepare */
    let task = {
      description: faker.address.city()
    }

    await request(application)
      .post('/v1/tasks')
      .send(task)
      .then((response) => {
        task.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .delete(`/v1/tasks/${task.id}`)
      .send(task)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
      });
  });

  it('[GET] /v1/tasks/:id', async () => {
    /* Prepare */
    let task = {
      description: faker.address.city()
    }

    await request(application)
      .post('/v1/tasks')
      .send(task)
      .then((response) => {
        task.id = response.body.data.id;
      });
    /* Execute */
    await request(application)
      .get(`/v1/tasks/${task.id}`)
      .send(task)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.id).toBe(task.id);
        expect(response.body.data.description).toBe(task.description);
      });
  });

  it('[GET] /v1/tasks', async () => {
    /* Prepare */
    let task = {
      description: faker.address.city()
    }

    await request(application)
      .post('/v1/tasks')
      .send(task)
      .then((response) => {
        task = response.body.data;
      });
    /* Execute */
    await request(application)
      .get('/v1/tasks')
      .send(task)
      .then((response) => {
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body.data.totalCounts).not.toBe(0);
      });
  });
})