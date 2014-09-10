The Traction.View class composes several Traction primitives. It can be used transparently in place of a Backbone.View, and supports the same API.  However, it has some added functionality.

#### The `template` attribute
```Javascript
var CommentView = Traction.View.extend({
  template: "comment"
})
```
By default, the template is retrieved via JST, and is expected to live in the `/templates`.
