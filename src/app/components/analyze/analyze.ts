import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Resume } from '../../services/resume';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-analyze',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './analyze.html',
  styleUrl: './analyze.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block max-w-xl mx-auto mt-10 p-6 shadow rounded',
  },
})
export class Analyze {
  private fb = inject(FormBuilder);
  private resumeService = inject(Resume);

  readonly form = this.fb.nonNullable.group({
    jdText: '',
  });
  readonly resumeFile = signal<File | null>(null);
  readonly jdFile = signal<File | null>(null);
  readonly useText = signal(false);
  readonly loading = signal(false);
  readonly result = signal<string | null>(null);
  readonly darkMode = signal<boolean>(false);

  ngOnInit() {
    // Optionally, initialize from localStorage or system preference
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

  toggleJDInput(useText: boolean) {
    this.useText.set(useText);
    this.jdFile.set(null);
    this.form.get('jdText')!.setValue('');
  }

  onFileChange(event: Event, type: 'resume' | 'jd') {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (type === 'resume') this.resumeFile.set(file);
    else this.jdFile.set(file);
  }

  onSubmit() {
    const resume = this.resumeFile();
    const jdText = this.form.get('jdText')!.value;
    const jdFile = this.jdFile();

    if (!resume || (!this.useText() && !jdFile) || (this.useText() && !jdText.trim())) return;

    const formData = new FormData();
    formData.append('resume', resume);
    if (this.useText()) {
      formData.append('jobDescText', jdText);
    } else {
      formData.append('jobDesc', jdFile!);
    }

    this.loading.set(true);
    this.resumeService.uploadResume(formData).subscribe({
      next: (res) => {
        this.result.set(res.analysis);
        this.loading.set(false);
      },
      error: () => {
        this.result.set('Error analyzing resume.');
        this.loading.set(false);
      },
    });
  }
}
