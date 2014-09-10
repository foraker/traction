# View Callbacks

`Traction.View` provides callbacks for invoking functions after standard view lifecycle events. For example, we can call the `initRichText` and `initDatepicker` after the view is rendered.

```JavaScript
var View = Traction.View.extend({
  callbacks: {
    "after:render": "initRichText initDatepicker"
  },

  initRichText: function(){
    // initialize rich text editor
  },

  initDatepicker: function(){
    // initialize datepicker
  }
});
```

## Complete list of callbacks

- `before:initialize`
- `after:initialize`
- `before:render`
- `after:render`
- `before:remove`
- `after:remove`
