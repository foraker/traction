# View hierarchies

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


- Instantiating manually

- Listening to events

- Proxying events


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
