# Task 7

In this task we want to add Tests to our application to ensure functionality.
We want to add unit tests for a central component `game.service.ts`. Here we will see the concepts of Mocking / Spying in Jest and NestJS.

Also we want to test our application from the outside perspective by implementing E2E Tests.
NestJS directly includes `SuperTest` for this purpose.

Steps:
- In `game.service.spec.ts` implement some Unit Tests and familiarize with the Conecpts. There are two tests available as a starting point and the test setup is already done.
- In `game.e2e-spec.ts` implement some E2E Tests. There are two tests available as a starting point and the test setup is already done. Also there are helper methods and the Auth Token is already fetched during initialization.

Important Notice:
- We skip tools like `TestContainers` here for sake of simplicity. The Unit Tests should be runnable without the need of external dependencies.
- For the E2E Tests it is necessary to have the compose-setup running.
