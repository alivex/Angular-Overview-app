import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
  declarations: [JobListComponent, JobDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [
    JobListComponent
  ]
})
export class JobModule { }

export {JobListComponent};
