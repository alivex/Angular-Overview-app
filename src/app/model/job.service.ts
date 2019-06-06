import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

import { Job } from './job';


@Injectable()
export class JobService {

  readonly jobsUrl = 'api/jobs';  // URL to web api
  
  constructor(
    private http: HttpClient) { }
  
  
  /** GET Jobs from the server */
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl)
      .pipe(
        map(j => j.filter(job => job.state === 'active')),
        catchError(this.handleError<Job[]>('getJobs', []))
      ) as Observable<Job[]>;
  }
  
  /** GET hero by id. Return `undefined` when id not found */
  getJob<Data>(id: number | string): Observable<Job> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    const url = `${this.jobsUrl}/?id=${id}`;
    return this.http.get<Job[]>(url)
      .pipe(
        map(jobs => jobs[0]), // returns a {0|1} element array
        catchError(this.handleError<Job>(`getJob id=${id}`))
      );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
   
      // TODO: Handle error depending
      console.error(error); // log to console instead
   
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }
  
}
