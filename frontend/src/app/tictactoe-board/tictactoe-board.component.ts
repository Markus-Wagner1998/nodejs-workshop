import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe-board',
  imports: [
    CommonModule,
  ],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent implements OnInit {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  editableInput: InputSignal<boolean> = input(true);
  accessTokenInput: InputSignal<string> = input('');
  resetGameInput: InputSignal<number> = input(0);

  userWon: OutputEmitterRef<void> = output();
  opponentWon: OutputEmitterRef<void> = output();

  ngOnInit(): void {
  }

}
