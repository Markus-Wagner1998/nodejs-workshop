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

  it('/game/move/user (POST) - should perform users move', async () => {
    const response = await moveUser(app, authToken, 0, 0);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      playerId: 'user1',
      board: ['X', '', '', '', '', '', '', '', ''],
      turn: 1,
      finished: false,
      winner: null,
    });
  });

  it('/game/move/user (POST) - should get same game as after post', async () => {
    const postResponse = await moveUser(app, authToken, 0, 0);
    expect(postResponse.status).toEqual(201);

    const getResponse = await getGame(app, authToken);
    expect(getResponse.status).toEqual(200);

    expect(postResponse.body).toEqual(getResponse.body);
  });

  it('/game/move/user (POST) - cannot move twice consecutively', async () => {
    const postResponse = await moveUser(app, authToken, 0, 0);
    expect(postResponse.status).toEqual(201);
    const secondPostResponse = await moveUser(app, authToken, 1, 0);
    expect(secondPostResponse.status).toEqual(400);
  });

  it('/game/move/opponent (POST) - user moves first', async () => {
    const postResponse = await moveOpponent(app, authToken);
    expect(postResponse.status).toEqual(400);
  });

  it('/game/move/opponent (POST) - opponent cannot move twice consecutively', async () => {
    const postResponse = await moveUser(app, authToken, 0, 0);
    expect(postResponse.status).toEqual(201);
    const opponentResponse = await moveOpponent(app, authToken);
    expect(opponentResponse.status).toEqual(201);
    const secondOpponentResponse = await moveOpponent(app, authToken);
    expect(secondOpponentResponse.status).toEqual(400);
  });

  it('/game/move/user (POST) - cannot put a move in occupied field', async () => {
    const postResponse = await moveUser(app, authToken, 0, 0);
    expect(postResponse.status).toEqual(201);
    const opponentResponse = await moveOpponent(app, authToken);
    expect(opponentResponse.status).toEqual(201);
    const secondPostResponse = await moveUser(app, authToken, 0, 0);
    expect(secondPostResponse.status).toEqual(400);
  });

  it('/game/move/user (POST) - cannot put a move in invalid field number - row', async () => {
    const postResponse = await moveUser(app, authToken, 3, 0);
    expect(postResponse.status).toEqual(400);
  });

  it('/game/move/user (POST) - cannot put a move in invalid field number - column', async () => {
    const postResponse = await moveUser(app, authToken, 0, 3);
    expect(postResponse.status).toEqual(400);
  });
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
