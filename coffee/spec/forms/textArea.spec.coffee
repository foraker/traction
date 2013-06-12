describe "Traction.Forms.TextArea", ->
  createInstance = (options) ->
    defaults = {
      attribute: "first_name"
      name:      "first_name_input"
      label:     "First name"
      model:     new Backbone.Model()
    }

    new Traction.Forms.TextArea(_.extend(defaults, options))

  describe "shared behavior", ->
    jasmine.itShouldBehaveLike("a field", {
      createInstance: createInstance
      input: "textarea"
    })

    jasmine.itShouldBehaveLike("a text field", {
      createInstance: createInstance
      input: "textarea"
    })