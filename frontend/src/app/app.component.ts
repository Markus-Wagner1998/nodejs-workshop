import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private router: Router,
  ) {}

  updatePage(index: number) {
    this.router.navigate([index === 0 ? '/' : '/tictactoe']);
  }
}
