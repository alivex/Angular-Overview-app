import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@Component({selector: 'app-job-list', template: ''})
class JobsListStubComponent {}


let app: AppComponent;
let de: DebugElement;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent from CLI', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        JobsListStubComponent
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeDefined();
  });

  it(`should have as title 'app'`, () => {
    expect(app.title).toEqual('Job-Overview');
  });

  it('should render title in an h1 tag', () => {
    fixture.detectChanges();
    expect(de.nativeElement.querySelector('h1').textContent)
      .toContain('Job-Overview');
  });
});

describe('AppComponent & TestModule', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        JobsListStubComponent
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app    = fixture.componentInstance;
    });
  }));
  
  tests();
  
});

function tests() {

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

  });

  it('can instantiate the component', () => {
    expect(app).not.toBeNull();
  });

}
