import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Resume {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/analyze';

  uploadResume(data: FormData): Observable<{ analysis: string }> {
    return this.http.post<{ analysis: string }>(this.apiUrl, data);
  }
}
