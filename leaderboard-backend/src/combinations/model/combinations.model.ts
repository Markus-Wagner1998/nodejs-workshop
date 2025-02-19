import { ApiProperty } from '@nestjs/swagger';

export class CombinationsScore {
    @ApiProperty({
        minLength: 9,
        maxLength: 9,
        isArray: true,
        type: 'string',
        description: 'Board setup for a winning combination',
    })
    public board: string[];

    @ApiProperty({
        description: 'Number of times someone won with this combination',
    })
    public score: number;

    constructor(board: string[], score: number) {
        this.board = board;
        this.score = score;
    }
}
