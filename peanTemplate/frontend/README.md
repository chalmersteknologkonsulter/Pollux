## Setup

The project is using **Node 6.9.5** as packet manager. All dependencies can be found in `package.json` in the root folder. Before running the project, run `npm install`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. backend, use the `ng serve --proxy-config proxy.conf.json` file to redirect api requests to the other server (needs a proxy config file).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`. Cohesive funtionality should be its own `module`. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. It is also possible to build for production with `npm build` (note that this runs with the flag `--aot=false`).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Tests are run in a headless Chrome (v59) instance. To run without headless, please remove the following flags for the custom launcher:
```
          '--headless',
          '--disable-gpu'
```


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
