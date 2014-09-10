# Template Bindings

Bindings allow you to synchronize your model and your template automatically.

```HTML
<h1 data-bind="name"></h1>
```

`model.set({name: "User Name"})` will cause the \<h1> to display "User Name".
A subsequent `model.set({name: "Updated User Name"})` will cause the \<h1> to display "Updated User Name".

There are several varieties of bindings which allow the binding of tag content and tag attributes, as well as formatting tag content.

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

### Attribute bindings
The first `data-bind` declaration specifies an *attribute binding*.  If `order.get("completed")` is `true`, the outer \<div> gets a class of "completed-order".  If `order.get("completed")` is falsy, the \<div> gets a class of "incomplete-order".  Moreover, if we update the model, the binding will ensure the class attribute stays in sync.

### Content Bindings
The second `data-bind` declaration specifies a *content binding*.  A content binding ensures the content of the \<dd> always stays in sync with the model.

### Formatted Content Bindings
The third `data-bind` declaration specifies a *formatted content binding*.  A formatted content binding work exactly like a content binding, but passes content through a formatter before displaying.  In this case, `model.get("order_total")` is passed through the currency formatter.  `model.set({order_total: 15})` would cause "$15.00" to appear in the \<dd>.

Formatters can be chained and can receive arguments.


```HTML
<span data-bind="fullName|upcase|append:( Esquire)"></span>
```

In this example, the user's full name is upcased and then appended with "Esquire". When we call `user.set({fullName: "Crandles Babbidge"})`, the content of the \<span> will be "CRANDLES BABBIDGE ( ESQUIRE)"

If the argument passed to a formatter must contain a colon, it must be escaped e.g. `"datetime:h\\:mm a"`.

## All Formatters
Traction ships with the following template formatters:

- `downcase` - downcases a string
- `upcase` - upcases a string
- `prepend:<content>` - prepends content
- `append:<content>` - appends content
- `nonBreaking` - substitutes non-breaking spaces for whitespace
- `datetime` - Formats a JavaScript Date. *Requires moment.js*.
  - The default datetime format is `L h:mm a`, but you can optionally pass a custom datetime format string. For example, `"created_at|datetime:L"`. See the [moment.js docs](http://momentjs.com/docs/#/displaying/format/) for more formatting options.
- `currency` - Formats a number as currency
  - The default currency is '$', but you can optionally pass a custom currency. `"order_total|currency:€"`

## Adding new formatters

We can add a "parameterize" formatter by configuring Traction. "parameterize" will substitute whitespace with a specified parameter. "First Last" will become "first-name" by default, and when we supply an custom separator, perhaps "_", "first_last".

```Javascript
Traction.config.formatters = {
  parameterize: function(string, separator) {
    separator = separator || "-";
    return string.toLowerCase().replace(/\s/g, separator);
  }
}
```
