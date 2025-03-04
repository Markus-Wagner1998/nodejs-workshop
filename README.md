# Task 8

In this Task we want to create the second service of our application. This service is a message consumer for our SQS Queue and will provide one endpoint to retrieve the combinations with the most wins.

This service uses a Postgres DB. It is part of the Task to find out how to generate the prisma client and migrate the current schema to the database. 
Hints:
- .env file necessary for the database connection
- `prisma generate` can be used to generate clients
- `prisma migrate` can be used to migrate a database

You need to do the following steps:
- Implement the SQS Listener functionality in `history-consumer.service.ts`
- Implement the database access logic in `combinations.service.ts`

