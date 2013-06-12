jasmine.sharedExamplesFor "a text field", (options) ->
  describe "#render", ->
    it "renders an input with the correct placeholder", ->
      field = options.createInstance().render()
      expect(field.$(options.input).attr("placeholder")).toBe("First name")

    it "allows the placeholder to be specified", ->
      field = options.createInstance({placeholder: "alternative placeholder"}).render()
      expect(field.$(options.input).attr("placeholder")).toBe("alternative placeholder")

  describe "#clear", ->
    it "clears the input value", ->
      field = options.createInstance().render()
      field.set("ABC")
      field.clear()
      expect(field.get()).toBe("")