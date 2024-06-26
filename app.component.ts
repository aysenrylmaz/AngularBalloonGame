import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalloonComponent } from './components/balloon/balloon.component';
import { IBalloon } from './balloon.interface';
import { Balloon } from './balloon.class';
import { isPlatformBrowser } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BalloonComponent,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  balloonsOnScreen = 10;
  balloons: IBalloon[] = [];
  score = 0;
  missed = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.balloons = new Array(this.balloonsOnScreen)
        .fill(0)
        .map(() => new Balloon(this.platformId));
    } else {
      console.log('Not running in a browser environment');
      // Handle the server-side rendering case or provide fallback
      this.balloons = new Array(this.balloonsOnScreen)
        .fill(0)
        .map(() => ({ id: 'default-id', color: 'default-color' } as IBalloon));
    }
  }

  trackByBalloon(index: number, balloon: IBalloon): string {
    return balloon.id; // Balonların benzersiz kimliği olan id kullanılıyor
  }

  
}
