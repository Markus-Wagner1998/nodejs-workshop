# Node.JS and NestJS Workshop

## Workshop Goals
For our workshop we want to develop a small example application where we can play tic-tac-toe in the browser.
There will be two different services in the backend, one for game management (showing available games, deleting games) and one for playing the games. 

Technologies used:
* All Backend Services will be using NestJS as Framework on top of Typescript
* The Frontend Application will be using Angular v18 with new Signals instead of zone.js
* For ORM we use Prisma for both applications, but connect it with
    * PostgreSQL DB for the management service
    * MongoDB for the game playing service

Steps to Complete:
1. Create Management Backend Application
    * Simple CRUD Application storing, retrieving and deleting games. Games have a UUID, a player and a title. Players are automatically created by the OIDC Token if you login
    * Get familiar with NestJS and its CLI (general principles etc.)
    * Get familiar with Prisma ORM and its schema definition
    * Add Authentication and Authorization to Endpoints
2. Frontend for the Management Application
    * Frontend using Angular and Angular Material (Redirect to Keycloak if no valid token is available). Show list of games. Ability to delete a game, create a new game.
3. Game Playing Service
    * Take the game playing service from Repository (TicTacToe AI is already implemented with endpoints)
    * Connect it to MongoDB and see how easy different database types can be connected with Prisma.
4. Game Playing UI
    * Create a small UI (thin-client) playing tic-tac-toe

## Prerequisites
There are some prerequisites that need to be fulfilled in order to be able to follow the upcoming steps and to be able to install and run all of the components mentioned.

* Docker (Compose)
* Node.JS (v20, v21)
* VSCode with following Plugins
    * Prisma
    * Prettier

## Setup a NestJS Project
* Install NestJS CLI: `npm i -g @nestjs/cli`
* Setup Project: `nest new tictactoe-game`
    * Select `npm`

The previous steps automatically setup a fully functioning boilerplate application using NestJS in a Typescript project.
