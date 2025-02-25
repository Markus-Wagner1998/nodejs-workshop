# Node.JS and NestJS Workshop

## Workshop Goals
For our workshop we want to develop a small example application where we can play tic-tac-toe in the browser.
There will be two different services in the backend, one for playing a game of Tic Tac Toe and one for showing a LeaderBoard to see which combinations result most ofen in a win.

Technologies used:
* All Backend Services will be using NestJS as Framework on top of Typescript
* The Frontend Application will be using Angular v19 using new Syntax and using Signals being completely without Zone.JS.
* For ORM we use Prisma for both applications, but connect it with
    * PostgreSQL DB for the lederboard service
    * MongoDB for the game playing service

## Prerequisites
There are some prerequisites that need to be fulfilled in order to be able to follow the upcoming steps and to be able to install and run all of the components mentioned.

* Docker (Compose)
* Angular 18
* nest.js 10
* node v20
* Prisma.IO
* SQS (localstack)
* MongoDB
* PostgreSQL
* VSCode with following Plugins
    * Prisma
    * Prettier

