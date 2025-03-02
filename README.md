# Task 6

In this task we will enable playing the game with the given UI.

Therefore we need to do these steps:
- Implement the Game Board in `tictactoe-board.component.html`
    - Add a grid of 3x3 for playing tictactoe
    - Add Click Functionality to the Board
- Add the tictactoe-board component to `play.component.html`
    - Implement Login, Logout, Reset
- Implement the Game Board Logic in `tictactoe-board.component.ts`
    - Add missing input for access token to and pass it from `play.component.html`
    - Use Access Token Input to Load Gamestate from Server
      - if it's the AI Component's turn, perform the move
    - Implement `clickCell` method by:
      - Perform API call to perform user action
      - Wait 1,5s and perform AI move
      - React to reset game input in the constructor and reset the game.
