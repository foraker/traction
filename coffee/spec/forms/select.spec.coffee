describe "Traction.Forms.Select", ->
  createInstance = (options) ->
    defaults = {
      attribute: "first_name"
      name:      "first_name_input"
      label:     "First name"
      options:   {"Jobin label": "Jobin","Crenst label": "Crenst"}
      model:     new Backbone.Model()
    }

    new Traction.Forms.Select(_.extend(defaults, options))

  describe "shared behavior", ->
    jasmine.itShouldBehaveLike("a field", {
      createInstance: createInstance
      input: "select"
    })

  describe "#render", ->
    it "creates an options with the correct label", ->
      field = createInstance({
        options: {"Label": "value"}
      }).render()
      expect(field.$("option").html()).toBe("Label")

    it "creates an options with the correct value", ->
      field = createInstance({
        options: {"Label": "value"}
      }).render()
      expect(field.$("option").attr("value")).toBe("value")

    it "creates a blank option with the correct label", ->
      field = createInstance({includeBlank: "Blank Label"}).render()
      expect(field.$("option:first").html()).toBe("Blank Label")

    it "creates a blank option with the correct value", ->
      field = createInstance({includeBlank: "Blank Label"}).render()
      expect(field.$("option:first").attr("value")).toEqual("")

    it "is not a multiselect field", ->
      field = createInstance().render()
      expect(field.$("select")[0].hasAttribute("multiple")).toEqual(false)

    describe "the multiselect option is passed", ->
      it "is a multiselect field", ->
        field = createInstance(multiselect: true).render()
        expect(field.$("select")[0].hasAttribute("multiple")).toEqual(true)

  describe "#clear", ->
    it "selects the first value", ->
      field = createInstance().render()
      field.set("Crenst")
      field.clear()
      expect(field.$("option:first").is(":selected")).toBe(true)