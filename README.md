# Task 4

In this Task we will prepare the API to handle Errors and to be available for our future Frontend Application. We will go through three different steps here:

- OpenAPI:
    - Check that `@nestjs/swagger` is part of the dependencies
    - Add the swagger documentation to the application according to https://docs.nestjs.com/openapi/introduction
        - Create the /api endpoint that shows the OpenApi documentation
        - Add Type Annotations to Interface Parameters and Return Values
        - Add Operation Annotations to Controller Methods
    - Check that documentation is shown correctly
    - Try generating client code by using: `npm run openapi:generate`
- Validation
    - Add basic validation to `MoveDTO` according to https://docs.nestjs.com/techniques/validation
- Exception Handling
    - In `game-util.service.ts`you find the custom exception `WrongPlayerException`that is thrown, when the wrong user is performing a move.
    - Currently this custom exception leads to a `500 Internal Server Error`because it is not handled yet.
    - Create an Custom Exception Filter like shown here (https://docs.nestjs.com/exception-filters), you can create it manually or try the nest cli (https://docs.nestjs.com/cli/usages#nest-generate).
    - Attach it to the Controller methods and see the new response
