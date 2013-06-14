# Traction
Extend your Backbone.

## Goals

Backbone.js is not a framework. It provides useful primitives and leaves the composition and architecture decisions to you.

Likewise, Traction.js has no framework ambitions.  Instead, it tries to enhance existing primitives and provide a few of its own.

## Features

[Bindings](#bindings)

[Computed Attributes](#computed-attributes)

[View Hierarchies](#children)

[Event Proxying](#event-proxying)

[Forms](#forms)

[Rails Support](#rails-support)

[Bootstrap Support](#bootstrap-support)

## Overview

#### Bindings
Bindings allow you to synchronize your model and your template automatically.
```HTML
<h1 data-bind="name"></h1>
```
`model.set({name: "User Name"})` will cause the \<h1> to display "User Name".
A subsequent `model.set({name: "Updated User Name"})` will cause the \<h1> to display "Updated User Name".

There are several varieties of bindings which allow the binding of tag content and tag attributes, as well as formatting tag content.

#### Computed Attributes
Computed attributes are model attributes which rely on other model attributes.
```Javascript
var User = Traction.Model.extend({
  computedAttributes: {
    fullName: function() {
      return [this.get("firstName"), this.get("lastName")].join(" ")
    }
  }
});

var user = new User({firstName: "Timothy", lastName: "Tanks"});
alert(user.get("fullName")); // alerts 'Timothy Tanks'

user.set({lastName: "Twain"})
alert(user.get("fullName")); // alerts 'Timothy Twain'

user.on("change:fullName", function(){
  alert("fullName changed")
})
user.set({firstName: "Crindy"}) // alerts 'fullName changed'
```

`change:<attribute>` events allow you to set up bindings to computed attributes.
```HTML
<span data-bind="fullName|upcase"></span>
```
This is an example of a *formatted content binding*. The \<span> content will always reflect the upcased version of `model.get("fullName")`.

#### Children

Backbone Views are often hierarchical. `Traction.View` instances include a `this.children` property which is used to manage child views.

```Javascript
var BlogPostView = Traction.View.extend({
  initialize: {
    this.children.add("commentForm", new CommentForm())
    this.children.add("commentsList", new CommentList())
  },
  hideComments: {
    this.children.each(function(child){
      child.hide()
    })
  },
  disableNewComments: {
    this.children.get("commentForm").disable()
  }
});
```

A parent `Traction.View` will automatically render its children whenever the parent is rendered.

#### Event Proxying

Events can be proxied and optionally renamed.  This is useful for propagating events upward in a hierarchy.

```Javascript
var UserView = Traction.View.extend({
  initialize: function() {
    this.proxyEvent(this.model, "sync", "user:saved")
    this.proxyEvent(this.model, "destroy")
  }
})

var user = new Backbone.Model()
var userView = new UserView({model: user})

userView.on("user:saved", function(user){
  alert("user saved")
});
userView.on("destroy", function(user){
  alert("user destroyed")
});

model.save() // alerts "user saved"
model.destroy() // alerts "user destroyed"
```

#### Forms
`Traction.Forms.Form` allows you to quickly compose forms which automatically sync data back to the model and render inline errors.

```Javascript
var ContactForm = Traction.Forms.Form.extend({
  initialize: function() {
    this.addInput({attribute: "email"})
    this.addInput({
      attribute: "message",
      label: "Your Message",
      placeholder: "Add a message here",
      type: Traction.Forms.TextArea
    })
  }
})
```
Template:

```HTML
<form>
  Welcome! Please enter your email address:
  <%= @output("email") %>

  And why not a message?
  <%= @output("message") %>

  <input type="sumbit"></input>
</form>
```

```Javascript
  var model = new Backbone.Model()
  var contactForm = new ContactForm({model: model}).render()
```
Yields (roughly):
```HTML
<form>
  Welcome! Please enter your email address:
  <lable for="email_field">Email</lable>
  <input type="text" name="email_field" placeholder="Email"></input>

  And why not a message?
  <label for="message_field">Email</lable>
  <textarea name="message_field" placeholder="Add a message here"></textarea>

  <input type="sumbit"></input>
</form>
```
```Javascript
// Type "email@example.com" into email field
model.get("email") // "email@example.com"
```

#### Rails Support
#### Bootstrap Support

## Documentation

### Traction.View

The Traction.View class composes several Traction primitives. It can be used transparently in place of a Backbone.View, and supports the same API.  However, it has some added functionality.

#### The `template` attribute
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
#### Callbacks

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
