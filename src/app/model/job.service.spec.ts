import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { asyncData, asyncError } from '../../testing/async-obs-helpers';

import { Job } from './job';
import { JobService } from './job.service';

describe('JobService (with spies)', () => {
  
  let httpClientSpy: { get: jasmine.Spy };
  let jobService: JobService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [JobService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    jobService = new JobService(<any> httpClientSpy);
  });

  it('should be created', () => {
    const service: JobService = TestBed.get(JobService);
    expect(service).toBeTruthy();
  });
  
  it('should return expected jobs (HttpClient called once)', () => {
    const expectedJobs: Job[] =
      [{ id: 1, title: 'A', state: 'active' }, { id: 2, title: 'B', state: 'active' }];
   
    httpClientSpy.get.and.returnValue(asyncData(expectedJobs));
   
    jobService.getJobs().subscribe(
      jobs => expect(jobs).toEqual(expectedJobs, 'expected jobs'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  
  it('should return only active jobs (HttpClient called once)', () => {
    const expectedJobs: Job[] =
      [{ id: 1, title: 'A', state: 'active' }, { id: 2, title: 'B', state: 'inactive' }];
   
    httpClientSpy.get.and.returnValue(asyncData(expectedJobs));
   
    jobService.getJobs().subscribe(
      jobs => expect(jobs).toEqual([{ id: 1, title: 'A', state: 'active' }], 'expected jobs'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
   
  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
   
    jobService.getJobs().subscribe(
      jobs => fail('expected an error, not jobs'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });
  
});
