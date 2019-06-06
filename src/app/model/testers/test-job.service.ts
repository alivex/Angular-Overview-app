import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { asyncData } from '../../../testing';

import { map } from 'rxjs/operators';

// re-export for tester convenience
export { Job }          from '../job';
export { JobService }   from '../job.service';
export { getTestJobs } from './test-jobs';

import { Job }          from '../job';
import { JobService }   from '../job.service';
import { getTestJobs } from './test-jobs';

@Injectable()
/**
 * FakeJobService pretends to make real http requests.
 * implements only as much of JobService as is actually consumed by the app
*/
export class TestJobService extends JobService {

  constructor() {
    super(null);
  }

  jobs = getTestJobs();
  lastResult: Observable<any>; // result from last method call

  getJobs(): Observable<Job[]> {
    return this.lastResult = asyncData(this.jobs);
  }

  getJob(id: number | string): Observable<Job> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let job = this.jobs.find(j => j.id === id);
    return this.lastResult = asyncData(job);
  }

}
