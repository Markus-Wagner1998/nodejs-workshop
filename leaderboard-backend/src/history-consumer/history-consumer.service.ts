import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import prisma from 'src/db';

@Injectable()
export class HistoryConsumerService {
    //TODO: Implement a message handler for messages in the SQS Queue 'workshop-test-queue'.
    //Store the content of the message in the database.

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
