# Task-1

This task is designed to get to know with the basics of NestJS. Create a basic Controller, Service and Database Layer. Implement some functionality and be able to play first games using the REST endpoints.

Therefore perform the following steps:

- Navigate into `tictactoe-game`
    - Run `npm install`
- Create `.env` file
    - DATABASE_URL=mongodb://root:example@localhost:27017/worksshop?authSource=admin
- Create the Database
    - `npx prisma db push`  to create the database
    - `npx prisma generate`  to create the prisma client files
- Create Controller methods in `game.controller.ts`
    - Endpoint which takes a `MoveDTO`  and performs the move of the User
    - Endpoint which performs a User of the Computer-AI opponent
    - Postman Collection in repo
- Create Service methods in `game.service.ts`
    - Both Methods follow this principle:
        - Load active game for user (user is a hardcoded id here)
        - If no Game exists, store an empty board in the database
        - Place a Turn
            - Either User Input
            - Or Computer-Calculated Move
        - Update Game State in the Database
    - There are many methods or skeletons in `game-util.service.ts` and `opponent.service.ts` which can be used here
- Create DB Access Layer in `game-util.service.ts`
    - Find the first non-finished game for a given playerId
    - Update an existing game state
    - Store a new Game State
- Play some games until everyone is finished
