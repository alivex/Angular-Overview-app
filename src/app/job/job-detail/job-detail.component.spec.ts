import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { asyncData } from '../../../testing';

import { Job }        from '../../model/job';
import { JobDetailComponent } from './job-detail.component';
import { JobDetailService } from './job-detail.service';
import { JobModule }         from '../job.module';


let component: JobDetailComponent;
let de: DebugElement;
let fixture: ComponentFixture<JobDetailComponent>;
let page: Page;

describe('JobDetailComponent from CLI', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailComponent ]
    })
  }));
  
  compileAndCreate();

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});


/** Add TestBed providers, compile, and create JobDetailComponent */
function compileAndCreate() {
  beforeEach(async(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobs']);

    TestBed.configureTestingModule({
      providers: [
        { provide: JobService, useValue: jobServiceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(JobDetailComponent);
      component = fixture.componentInstance;

      // getJobs spy returns observable of test jobs
      jobServiceSpy.getJobs.and.returnValue(asyncData(getTestJobs()));
    });
  }));
}

describe('JobDetailComponent', () => {
  describe('with JobModule setup', jobModuleSetup);
  describe('when override its provided JobDetailService', overrideSetup);
});

function overrideSetup() {
  class JobDetailServiceSpy {
    testJob: Job = {id: 882, title: 'Test Job', state: 'active' };

    // emit cloned test job
    getJob = jasmine.createSpy('getJob').and.callFake(
      () => asyncData(Object.assign({}, this.testJob))
    );
  }
  
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports:   [ JobModule ],
      providers: [
        { provide: JobDetailService, useValue: {} }
      ]
    })

    .overrideComponent(JobDetailComponent, {
      set: {
        providers: [
          { provide: JobDetailService, useClass: JobDetailServiceSpy }
        ]
      }
    })

    .compileComponents();
  }));
  
  let hdsSpy: JobDetailServiceSpy;
  
  beforeEach(async(() => {
    createComponent();
    hdsSpy = fixture.debugElement.injector.get(JobDetailService) as any;
  }));
  
  it('should have called `getJob`', () => {
    expect(hdsSpy.getJob.calls.count()).toBe(1, 'getJob called once');
  });

  it('should display stub job\'s title', () => {
    expect(page.titleDisplay.textContent).toBe(hdsSpy.testJob.title);
  });


  it('fixture injected service is not the component injected service',
    // inject gets the service from the fixture
    inject([JobDetailService], (fixtureService: JobDetailService) => {

    // use `fixture.debugElement.injector` to get service from component
    const componentService = fixture.debugElement.injector.get(JobDetailService);

    expect(fixtureService).not.toBe(componentService, 'service injected from fixture');
  }));
}

import { getTestJobs, TestJobService, JobService } from '../../model/testers/test-job.service';

const firstJob = getTestJobs()[0];

function jobModuleSetup() {
  
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports:   [ JobModule ],
      providers: [
        { provide: JobService,    useClass: TestJobService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
    
  }));
  
  describe('when going to existing job', () => {
    let expectedJob: Job;
    
    beforeEach(async(() => {
      expectedJob = firstJob;
      createComponent();
    }));

    it('should display that job\'s title', () => {
      expect(page.titleDisplay.textContent).toBe(expectedJob.title);
    });

  });
  
  // Why we must use `fixture.debugElement.injector` in `Page()`
  it('cannot use `inject` to get component\'s provided JobDetailService', () => {
    let service: JobDetailService;
    fixture = TestBed.createComponent(JobDetailComponent);
    expect(
      inject([JobDetailService], (jds: JobDetailService) =>  service = jds )
    )
    .toThrowError(/No provider for JobDetailService/);

    service = fixture.debugElement.injector.get(JobDetailService);
    expect(service).toBeDefined('debugElement.injector');
  });

}  


/** Create the JobDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(JobDetailComponent);
  component = fixture.componentInstance;
  page = new Page(fixture);

  // 1st change detection triggers ngOnInit which gets a job
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
      console.log(fixture);
    // 2nd change detection displays the async-fetched job
    fixture.detectChanges();
  });
}
  
class Page {
  // getter properties wait to query the DOM until called.
  private compiled;

  get titleDisplay() { return this.query<HTMLElement>('.title'); }
  
  
  constructor(fixture: ComponentFixture<JobDetailComponent>) {
    this.compiled = fixture.debugElement.nativeElement;
  }

  private query<T>(selector: string): T {
    return this.compiled.querySelector(selector);
  }
  
  

}
