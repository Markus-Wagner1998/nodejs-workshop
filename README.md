# Task 3

In this task we want to replace the hardcoded playerId, by adding Keycloak Authentication to the application and grabbing the current user's context from the JWT Token.

Therefore follow these steps:
- Add dependency for @5stones/nest-oidc
- In app.module.ts add the AuthModule
- Protect the Controller methods with the JwtGuard
- Inject the CurrentUser context into the controller methods and replace the hardcoded playerId
