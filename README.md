# Task 2

In this Task we want to integrate an SQS Queue into our application and send a message into the queue for every finished game.

- Check that `@aws-sdk/client-sqs` and `@ssut/nestjs-sqs` are installed
- In `app.module.ts` add the Module Configuration with Queue URL
  - For information check https://github.com/ssut/nestjs-sqs
- In `game.service.ts` in `notifyAboutEndingGames(playerId, winningSign, board)`implement message sending to the queue
- Play some games and validate that messages are sent to the queue
