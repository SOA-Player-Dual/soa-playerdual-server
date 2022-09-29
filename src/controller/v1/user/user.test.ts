import supertest from 'supertest';
import { createServer } from '@config/express';

describe('User', () => {
  describe('Get all users', () => {
    describe("Don't have valid token", () => {
      it('Should return 401', async () => {
        await supertest(createServer()).get(`/api/v1/user`).expect(401);
      });
    });
  });
  describe('Login', () => {
    describe('Valid username and password', () => {
      it('Should return 200', async () => {
        await supertest(createServer())
          .post(`/api/v1/user/login`)
          .send({ username: 'huythanhnguyen', password: 'huy123' })
          .expect(200);
      });
    });
    describe('Invalid username and password', () => {
      it('Should return 401', async () => {
        await supertest(createServer())
          .post(`/api/v1/user/login`)
          .send({ username: 'huythanhnguyen', password: 'huy123456' })
          .expect(401);
      });
    });
  });
});
