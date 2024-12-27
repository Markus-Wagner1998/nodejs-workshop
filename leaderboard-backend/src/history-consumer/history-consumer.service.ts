import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import prisma from 'src/db';

@Injectable()
export class HistoryConsumerService {
  @SqsMessageHandler('workshop-test-queue', false)
  public async handleMessage(message: Message): Promise<void> {
    if (this.isValidMessageObject(message.Body)) {
      const jsonBody = JSON.parse(message.Body);
      const boardHash = this.hashCode(JSON.stringify(jsonBody['board']));
      await prisma.game.create({
        data: {
          playerId: jsonBody['playerId'],
          winner: jsonBody['winner'],
          board: {
            connectOrCreate: {
              create: this.messageBoardToDbBoard(jsonBody['board']),
              where: {
                stateHash: boardHash,
              },
            },
          },
        },
      });
    }
  }

  private messageBoardToDbBoard(messageBoard: any): any {
    return {
      state: messageBoard,
      stateHash: this.hashCode(JSON.stringify(messageBoard)),
    };
  }

  private isValidMessageObject(body: string): boolean {
    if (!body) {
      return false;
    }
    const jsonBody = JSON.parse(body);

    return (
      jsonBody &&
      jsonBody['playerId'] &&
      jsonBody['winner'] &&
      jsonBody['board']
    );
  }

  private hashCode(str): string {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }
}
