describe "Traction.Forms.TextField", ->
  createInstance = (options) ->
    defaults = {
      attribute: "first_name"
      name:      "first_name_input"
      label:     "First name"
      model:     new Backbone.Model()
    }

    new Traction.Forms.TextField(_.extend(defaults, options))

  describe "#render", ->
    it "removes existing content", ->
      field = createInstance()
      field.$el.append "existing content"
      field.render()
      expect(field.el.innerHTML).not.toContain("existing content")

    it "renders a label", ->
      field = createInstance().render()
      label = field.$("label").html().replace(/\n/g, "").trim()
      expect(label).toBe("First name")

    it "renders an input with the correct name", ->
      field = createInstance()
      field.render()
      expect(field.$("input").attr("name")).toBe("first_name_input")

    it "renders an input with the correct type", ->
      field = createInstance().render()
      expect(field.$("input").attr("type")).toBe("text")

    it "renders an input with the correct placeholder", ->
      field = createInstance().render()
      expect(field.$("input").attr("placeholder")).toBe("First name")

    it "allows the placeholder to be specified", ->
      field = createInstance({placeholder: "alternative placeholder"}).render()
      expect(field.$("input").attr("placeholder")).toBe("alternative placeholder")

    it "initializes the input content", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model}).render()
      expect(field.$("input").val()).toBe("Jobin")

    describe "a required input", ->
      it "designates the element as required", ->
        field = createInstance({required: true}).render()
        expect(field.$el.attr("class")).toContain("required")

      it "renders an asterisk in the label", ->
        field = createInstance({required: true}).render()
        label = field.$("label").html().replace(/\n/g, "").trim()
        expect(label).toBe("<i>*</i> First name")

  describe "#renderErrors", ->
    it "adds a class of 'errors'", ->
      field = createInstance().render()
      field.renderErrors([])
      expect(field.$el.attr("class")).toContain("error")

    it "appends error messages", ->
      field = createInstance().render()
      field.renderErrors(["error 1", "error 2"])
      expect(field.$(".inline-errors").text()).toBe("error 1, error 2")

    it "appends a single error message", ->
      field = createInstance().render()
      field.renderErrors(["error 1"])
      expect(field.$(".inline-errors").text()).toBe("error 1")

  describe "#disable", ->
    it "adds the disabled attribute", ->
      field = createInstance().render()
      field.disable()
      expect(field.$("input").attr("disabled")).toBe("disabled")

  describe "#enable", ->
    it "removes the disabled attribute", ->
      field = createInstance().render()
      field.disable()
      field.enable()
      expect(field.$("input").attr("disabled")).toBeUndefined()

  describe "#get", ->
    it "returns the input value", ->
      field = createInstance().render()
      field.$("input").val("ABC")
      expect(field.get()).toBe("ABC")

  describe "#set", ->
    it "sets the input value", ->
      field = createInstance().render()
      field.set("ABC")
      expect(field.$("input").val()).toBe("ABC")

  describe "#clear", ->
    it "clears the input value", ->
      field = createInstance().render()
      field.set("ABC")
      field.clear()
      expect(field.get()).toBe("")

    it "removes any errors", ->
      field = createInstance().render()
      field.renderErrors(["error"])
      field.clear()
      expect(field.$(".inline-errors").text()).not.toContain("error")

  describe "#clearErrors", ->
    it "removes any errors", ->
      field = createInstance().render()
      field.renderErrors(["error"])
      field.clearErrors()
      expect(field.$(".inline-errors").text()).not.toContain("error")

  describe "#rerenderErrors", ->
    field = createInstance().render()
    field.renderErrors(["original error"])
    field.rerenderErrors(["new error"])

    it "removes the old errors", ->
      expect(field.$(".inline-errors").text()).not.toContain("original error")

    it "adds the new errors", ->
      expect(field.$(".inline-errors").text()).toContain("new error")

  describe "#reset", ->
    it "updates the input to reflect the model", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model}).render()
      model.set({first_name: "Crenst"}, {silent: true})
      field.reset()
      expect(field.get()).toBe("Crenst")

  describe "#commit", ->
    it "applies the input value to the model", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model}).render()
      field.set("Crenst")
      field.commit()
      expect(model.get("first_name")).toBe("Crenst")

  describe "model syncing", ->
    it "syncs the input with the model", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model}).render()
      model.set({first_name: "Crenst"})
      expect(field.get()).toBe("Crenst")

    it "commits input changes back to the model", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model}).render()
      field.set("Crenst")
      field.$("input").trigger("change")
      expect(model.get("first_name")).toBe("Crenst")

    it "does not commit changes when autocommit is disabled", ->
      model = new Backbone.Model({first_name: "Jobin"})
      field = createInstance({model: model, autoCommit: false}).render()
      field.set("Crenst")
      field.$("input").trigger("change")
      expect(model.get("first_name")).toBe("Jobin")
