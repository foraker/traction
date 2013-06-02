# Traction
Backbone.js Extensions

## Documentation

### Traction.View
### Traction.Model
### Traction.Rails

## Development

This project uses Grunt to build and run tests. Generally, Grunt can be installed (assuming `npm` in installed) like so:

`npm install -g grunt-cli`

Detailed installation instructions can be found on the [Grunt website](http://gruntjs.com/getting-started).

### Installation

From the Traction directory, run `npm install`.

### Building

Building the project will compile, concat and uglify the Coffeescript.

`grunt build`

### Running specs

After building the project, run the specs with `grunt test`.

### General Development

The easiest way to develop is to call the default grunt task via `grunt`.  This will watch the coffee/ directory, recompile when changes are detected, and run the specs.
