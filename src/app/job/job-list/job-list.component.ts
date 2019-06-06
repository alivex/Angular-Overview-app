import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Job } from '../../model/job';
import { JobService } from '../../model/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: Observable<Job[]>;
  selectedJob: Job;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs = this.jobService.getJobs();
  }
  
  onSelect(job: Job): void {
    this.selectedJob = job;
  }

}
