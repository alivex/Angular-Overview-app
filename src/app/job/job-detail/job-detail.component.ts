import { Component, Input, OnInit } from '@angular/core';

import { Job } from '../../model/job';
import { JobDetailService } from './job-detail.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers:  [ JobDetailService ]
})
export class JobDetailComponent implements OnInit {

  constructor( private jobDetailService: JobDetailService ) { }
  
  @Input() job: Job;

  ngOnInit() {
  }

  private getJob(id: string): void {

    this.jobDetailService.getJob(id).subscribe(job => {
      if (job) {
        this.job = job;
      }
    });
  }
}
