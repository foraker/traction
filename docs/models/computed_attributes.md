# Computed Attributes

Computed attributes are model attributes which are derived from other model attributes. For example, a user's "full name" attribute could be derived from "first name" and "last name" attributes.

Computed attributes conform to the standard Backbone `change:<attribute>` event style, allowing you to create event bindings.

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

