import { httpResource } from '@angular/common/http';
import { Component, computed, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Visit } from './models/visit.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resume-optimizer');
  readonly darkMode = signal<boolean>(false);

  projectName = signal<string>('');

  private apiURL = environment.trackingApiUrl;

  visitResource = httpResource<Visit>(() => ({
    url: this.apiURL,
    method: 'POST',
    body: { projectName: this.projectName() },
  }));

  visitorCount = computed(() => {
    const value = this.visitResource.value();
    return value?.uniqueVisitors ?? 0;
  });

  isVisitorCountLoading = computed(() => this.visitResource.isLoading());

  visitorCountError = computed(() => {
    const error = this.visitResource.error();
    return error ? error.message : null;
  });

  constructor() {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      this.setDarkMode(saved === 'true');
    }
  }

  ngOnInit() {
    this.trackVisit();
  }

  private trackVisit(): void {
    // Update the signal to trigger the httpResource
    this.projectName.set(this.title());
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
