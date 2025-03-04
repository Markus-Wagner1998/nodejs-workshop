import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GameModule } from './../src/game/game.module';

describe('GameController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, GameModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    const response = await request('http://localhost:8999')
      .post('/realms/workshop/protocol/openid-connect/token')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(
        'username=user1&password=password1&grant_type=password&client_id=workshop-client',
      );
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('access_token');
    authToken = response.body['access_token'];

    await request(app.getHttpServer())
      .delete('/game')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });

  it('/ (GET) - should not find non-existent game', async () => {
    const response = await getGame(app, authToken);
    expect(response.status).toEqual(404);
  });
    //TODO: Add E2E Tests here
});

async function getGame(app: INestApplication, authToken: string) {
  return await request(app.getHttpServer())
    .get('/game')
    .set('Authorization', `Bearer ${authToken}`);
}

async function moveOpponent(app: INestApplication, authToken: string) {
  return await request(app.getHttpServer())
    .post('/game/move/opponent')
    .set('Authorization', `Bearer ${authToken}`);
}

async function moveUser(
  app: INestApplication,
  authToken: string,
  row: number,
  column: number,
) {
  return await request(app.getHttpServer())
    .post('/game/move/user')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ row, column });
}
