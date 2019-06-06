import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Job } from '../../model/job';
import { JobService } from '../../model/job.service';

@Injectable()
export class JobDetailService {
  constructor(private jobService: JobService) {  }

  // Returns a clone
  getJob(id: number | string): Observable<Job> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    return this.jobService.getJob(id).pipe(
      map(job => {
        return job ? Object.assign({}, job) : null; // clone or null
      })
    );
  }

}