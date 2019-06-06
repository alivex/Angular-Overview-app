import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { asyncData } from '../../../testing';

import { By }  from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { newEvent } from '../../../testing';

import { getTestJobs, TestJobService } from '../../model/testers/test-job.service';

import { JobModule }         from '../job.module';
import { JobService }        from '../../model/job.service';
import { JobListComponent } from './job-list.component';

@Component({selector: 'app-job-detail', template: ''})
class JobsDetailStubComponent {}

const JOBS = getTestJobs();

let comp: JobListComponent;
let de: DebugElement;
let fixture: ComponentFixture<JobListComponent>;
let page: Page;

describe('JobListComponent from CLI', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        JobListComponent, 
        JobsDetailStubComponent 
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    
  }));
  
  compileAndCreate();
    
  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  
});

/** Add TestBed providers, compile, and create JobListComponent */
function compileAndCreate() {
  beforeEach(async(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobs']);

    TestBed.configureTestingModule({
      providers: [
        { provide: JobService, useValue: jobServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(JobListComponent);
      comp = fixture.componentInstance;

      // getJobs spy returns observable of test jobs
      jobServiceSpy.getJobs.and.returnValue(asyncData(getTestJobs()));
    });
  }));
}

describe('JobListComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [JobModule],
      providers: [
        { provide: JobService, useClass: TestJobService }
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));
  
  it('should display jobs', () => {
    expect(page.jobRows.length).toBeGreaterThan(0);
  });

  it('1st job should match 1st test job', () => {
    const expectedJob = JOBS[0];
    const actualJob = page.jobRows[0].textContent;
    expect(actualJob).toContain(expectedJob.id.toString(), 'job.id');
    expect(actualJob).toContain(expectedJob.title, 'job.title');
  });

  it('should select job on click', fakeAsync(() => {
    const expectedJob = JOBS[1];
    const li = page.jobRows[1];
    li.dispatchEvent(newEvent('click'));
    tick();

    expect(comp.selectedJob).toEqual(expectedJob);
  }));
  
});

function createComponent() {
  fixture = TestBed.createComponent(JobListComponent);
  comp = fixture.componentInstance;

  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  /** Job line elements */
  jobRows: HTMLLIElement[];

  constructor() {
    const jobRowNodes = fixture.nativeElement.querySelectorAll('.job');
    this.jobRows = Array.from(jobRowNodes);
  };
}
