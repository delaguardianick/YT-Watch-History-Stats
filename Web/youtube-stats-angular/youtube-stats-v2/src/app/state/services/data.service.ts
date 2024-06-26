import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, Observable, of } from 'rxjs';
import { Stats, StatsFactory } from '../models/models';
import { DataStateService } from '../data-state.service';
import { DataState } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private dataStateService: DataStateService
  ) {
    this.state$ = this.dataStateService.getState();
  }

  state$: Observable<DataState>;

  uploadTakeoutAndFetchStats(file: File): Observable<Stats | null> {
    const formData = new FormData();
    formData.append('file', file);

    return this.uploadTakeout(file).pipe(
      switchMap((response) => {
        console.log('Upload successful, takeout_id:', response.takeout_id);
        return this.analyzeTakeout();
      }),
      catchError((error) => {
        console.error('Upload failed:', error);
        return of(null);
      })
    );
  }

  uploadTakeout(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:8000/upload', formData);
  }

  analyzeTakeout(): Observable<Stats> {
    return this.http.get<any>('http://localhost:8000/stats').pipe(
      map((statsApiResponse) => {
        const stats = StatsFactory.fromApiResponse(statsApiResponse);
        this.dataStateService.updateStatistics(stats);
        return stats;
      })
    );
  }

  getStats(): void {
    this.http
      .get<Stats>('http://localhost:8000/stats')
      .pipe(
        map((statsApiResponse) => {
          const stats = StatsFactory.fromApiResponse(statsApiResponse);
          this.dataStateService.updateStatistics(stats);
        })
      )
      .subscribe({
        error: (err) => console.error('Error fetching stats data:', err),
      });
  }
}
