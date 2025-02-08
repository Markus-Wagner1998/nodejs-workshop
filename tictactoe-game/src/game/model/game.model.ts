import { ApiProperty } from '@nestjs/swagger';

export class GameState {
  @ApiProperty({
    description: 'ID of the Game',
  })
  public id: string;
  @ApiProperty({
    description: "Current Player's identifier",
  })
  public playerId: string;
  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    isArray: true,
    type: 'string',
    description: 'Board stored as flat array',
  })
  public board: CellValue[];
  @ApiProperty({
    description: 'Current Turn index',
    minimum: 0,
    maximum: 8,
  })
  public turn: number;
  @ApiProperty({
    description: 'Information whether the game is finished',
  })
  public finished: boolean;
  @ApiProperty({
    description: 'ID of the winner. Null if no winner exists',
  })
  public winner: string | null;

  constructor(
    id: string,
    playerId: string,
    board: CellValue[],
    turn: number,
    finished: boolean,
    winner: string | null,
  ) {
    this.id = id;
    this.playerId = playerId;
    this.board = board;
    this.turn = turn;
    this.finished = finished;
    this.winner = winner;
  }
}

export type PlayerSign = 'X' | 'O';

export type CellValue = '' | PlayerSign;

export const winningCombos: number[][] = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Top-left to bottom-right diagonal
  [2, 4, 6], // Top-right to bottom-left diagonal
];
