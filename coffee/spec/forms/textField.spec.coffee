describe "Traction.Forms.TextField", ->
  createInstance = (options) ->
    defaults = {
      attribute: "first_name"
      name:      "first_name_input"
      label:     "First name"
      model:     new Backbone.Model()
    }

    new Traction.Forms.TextField(_.extend(defaults, options))

  describe "shared behavior", ->
    jasmine.itShouldBehaveLike("a field", {
      createInstance: createInstance
      input: "input"
    })

    jasmine.itShouldBehaveLike("a text field", {
      createInstance: createInstance
      input: "input"
    })

  describe "#render", ->
    it "renders an input with the correct type", ->
      field = createInstance().render()
      expect(field.$("input").attr("type")).toBe("text")
