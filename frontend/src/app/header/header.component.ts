import { Component, output, OutputEmitterRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatTabsModule],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  template: `
    <mat-toolbar color="primary">
      <mat-tab-group (selectedTabChange)="updateTab($event)" [selectedIndex]="currentIndex">
        <mat-tab label="Leaderboard"></mat-tab>
        <mat-tab label="Play a Game"></mat-tab>
      </mat-tab-group>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: center;
      }
      mat-tab-group {
        flex-grow: 1;
      }
    `,
  ],
})
export class HeaderComponent {
  onTabChange: OutputEmitterRef<number> = output();
  currentIndex: number = 0;

  location: Location;

  constructor(location: Location) {
    this.location = location;
    if (this.location.path() === '/tictactoe') {
      this.currentIndex = 1;
    }
  }

  updateTab(event: any) {
    this.currentIndex = event.index;
    this.onTabChange.emit(event.index);
  }
}

