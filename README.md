# Task 5

In this task we want to setup our frontend to be able to play games. Therefore we need to integrate KeyCloak to get authorized for our API Calls. In this task we will:

- Implement OIDC Logic in `play.component.ts`according to https://github.com/manfredsteyer/angular-oauth2-oidc/blob/master/README.md?plain=1#L230-L261 Everything you need for this exercise is in the marked block. The other steps are already finished
    - Initialize the Auth Token in `ngOnInit`
    - Perform Login at with the `login`method
    - Perform Logout with the `logout`method
    - Add Login and Logout Buttons to `play.component.html` to test your implementations
- Implement `play.component.html`
    - Add a Login Button, if the user is currently not logged in
    - Add a Logout Button, if the user is currently logged in
