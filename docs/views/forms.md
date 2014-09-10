# Forms and Fields
`Traction.Forms.FormView` allows you to quickly compose forms which automatically sync data back to the model and render inline errors.

```Javascript
var ContactForm = Traction.Forms.FormView.extend({
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
  <%= @outlet("email") %>

  And why not a message?
  <%= @outlet("message") %>

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
  <label for="email_field">Email</label>
  <input type="text" name="email_field" placeholder="Email"></input>

  And why not a message?
  <label for="message_field">Message</label>
  <textarea name="message_field" placeholder="Add a message here"></textarea>

  <input type="sumbit"></input>
</form>
```
```Javascript
// Type "email@example.com" into email field
model.get("email") // "email@example.com"
```

## Configuration
