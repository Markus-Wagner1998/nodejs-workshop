import { Component, computed, input, InputSignal } from '@angular/core';
import { GameService } from '../../../generated/openapi-client';

@Component({
  selector: 'app-tictactoe-board',
  imports: [],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  board = computed(() => this.boardInput());

  constructor(private gameService: GameService) {}

  clickCell(cellIndex: number): void {
    console.log("before sending")
    const observableGameState = this.gameService.gameControllerMoveUser({row: cellIndex / 3, column: cellIndex % 3})
    observableGameState.subscribe((res) => console.log(res))
    console.log("after sending")
    console.log('clicked ' + cellIndex);
  }
}
