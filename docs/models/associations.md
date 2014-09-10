# Associations

`Traction.Model` adds support for declaring associations. For example, in a schema where a user has many comments, the user-comment association is declared as follows:

```Javascript
var User = Traction.Model.extend({
  associations: {
    comments: Backbone.Collection
  }
})
```

Whenever a `User` is instantiated with a 'comments' attribute, the 'comments' attribute is replaced by a `CommentsCollection`.

```Javascript
user = new User({
  name: "Example User",
  comments: [
    {body: "This is a comment"}
  ]
})

user.get("comments")
// => CommentsCollection {length: 1}

user.get("comments").pluck("body")
// => "This is a comment"
```

## Events

Whenever comments are changed, added or removed, a "change" event is fired on the model.

```Javascript
user = new User({
  name: "Example User",
  comments: [
    {body: "This is a comment"}
  ]
})

@user.on("change:comments", function(comment){
  console.log("The comments assocation has changed")
});

@user.get("comments").add({body: "Another comment"})

// =>
"The comments assocation has changed"
```

## Association URLs

If the model has an '<association_name>_url' attribute, the attribute is automatically assigned as the association's url.

```Javascript
user = new User({
  name: "Example User",
  comments_url: "/users/1/comments"
  comments: []
})

user.get("comments").url
// => "/users/1/comments"
```
