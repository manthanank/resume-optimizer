import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resume-optimizer');
  readonly darkMode = signal<boolean>(false);

  constructor() {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      this.setDarkMode(saved === 'true');
    }
  }

  setDarkMode(enabled: boolean) {
    this.darkMode.set(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(enabled));
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkMode());
  }
}
