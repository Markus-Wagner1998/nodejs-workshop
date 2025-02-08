import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TictactoeBoardComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
