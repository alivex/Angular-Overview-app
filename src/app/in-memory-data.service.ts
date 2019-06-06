import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Job } from './model/job';

import { Injectable } from '@angular/core';

import JobsJson from '../assets/data/jobs.json';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    const jobs = JobsJson.body;
    return {jobs};
  }
  
  genId(jobs: Job[]): number {
    return jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 11;
  }

  constructor() { }
}
