# Traction
Backbone.js Extensions

## Documentation

### Traction.View

The Traction.View class composes several Traction primitives. It can be used transparently in place of a Backbone.View, and supports the same API.  However, it has some added functionality.

#### The .template attribute
```Javascript
var CommentView = Traction.View.extend({
  template: "comment"
})
```
By default, the template is retrieved via JST, and is expected to live in the `/templates`.

#### Bindings
Whether a Traction View receives an `el` attribute or `template` attribute, the rendered HTML can be used to express bindings between the model and the HTML.  For example:

```HTML
<div id="order-summary" data-bind="class:completed:completed-order:incomplete-order">
  <dl>
    <dt>Order #</dt><dd data-bind="order_id"></dd>
    <dt>Amount</dt><dd data-bind="order_total|currency"></dd>
  </dl>

  <a href="#" data-emit="cancel">Cancel</a>
</div>
```
```Javascript
var OrderView = Traction.View.extend({
  el: "#order-summary",
  events: {
    "cancel": "cancel"
  },
  cancel: function() {
    this.model.cancel()
  }
})
```
* The first `data-bind` declaration specifies an *attribute binding*.  If `order.get("completed")` is `true`, the outer \<div> gets a class of "completed-order".  If `order.get("completed")` is falsy, the \<div> gets a class of "incomplete-order".  Moreover, if we update the model, the binding will ensure the class attribute stays in sync.

* The second `data-bind` declaration specifies a *content binding*.  A content binding ensures the content of the \<dd> always stays in sync with the model.

* The third `data-bind` declaration specifies a *formatted content binding*.  A formatted content binding work exactly like a content binding, but passes content through a formatter before displaying.  In this case, `model.get("order_total")` is passed through the currency formatter.  `model.set({order_total: 15})` would cause "$15.00" to appear in the \<dd>.  Formatters can be chained and can receive arguments.  For more information of formatter content bindings, see below.

* Lastly, `data-emit` does not express a binding.  Rather, it is used to trigger *semantic events*.  Semantic events are used to augment the declarative nature of the `events` attribute.  Where one might have written
```Javascript
events: {
  "click .cancel": "cancel"
}
```
One may now write
```Javascript
events: {
  "click": "cancel"
}
```

##### Customizing template retrieval

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
