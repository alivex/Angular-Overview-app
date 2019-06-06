# JobOverview

## Prerequisites

Node.js version 8.x or 10.x
npm

## Setting up node modules

Run `npm install`

Run `npm install -g @angular/cli` To install the CLI using npm

## Development server

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Notes

- Used in-memory web-api to mimic the http request which were loaded from JSon file.
- Used rxjs library to handle http requests
- Used Bootstrap 4
- Used Karma/Jasmine for testing (the JobDetailComponent has 3 failed tests, for time constraints, I wasn't able to debug the issue.)

## Nice to have

- More rigorous tests (negative and positive, using spies and mocks, also testing for Testbeds)
- Improve UX design
