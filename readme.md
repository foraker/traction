# Traction
Backbone.js extensions and components.

## Features

Models
  - [Computed attributes](./docs/models/computed_attributes.md)
  - [Associations](./docs/models/associations.md)

Views
  - [Data bindings](./docs/views/bindings.md)
  - [Callbacks](./docs/views/callbacks.md)
  - [View hierarchies](./docs/views/view_hierarchies.md)
  - [Forms and Fields](./docs/views/forms.md)
  - [Model decorators](./docs/views/decorators.md)
  - [Automatic template rendering](./docs/views/tempalates.md)

Utilities
  - [Mixins](./docs/utilities/mixins.md)
  - [Delegation](./docs/views/delegation.md)

Rails Support
  - Parameter whitelisting

## Dependencies

- [Underscore](http://underscorejs.org/)
- [Backbone](http://backbonejs.org/)
- [Underscore.string](https://github.com/epeli/underscore.string)

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

```
grunt
```

## About Foraker Labs

<img src="http://assets.foraker.com/foraker_logo.png" width="400" height="62">

This project is maintained by Foraker Labs. The names and logos of Foraker Labs are fully owned and copyright Foraker Design, LLC.

Foraker Labs is a Boulder-based Ruby on Rails and iOS development shop. Please reach out if we can [help build your product](http://www.foraker.com).
