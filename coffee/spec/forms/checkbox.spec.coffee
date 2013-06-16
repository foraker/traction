describe "Traction.Forms.Checkbox", ->
  createInstance = (options) ->
    defaults = {
      attribute: "active"
      label:     "Active"
      name:      "active_input"
      model:     new Backbone.Model()
    }

    new Traction.Forms.Checkbox(_.extend(defaults, options))

  describe "#render", ->
    it "removes existing content", ->
      field = createInstance()
      field.$el.append "existing content"
      field.render()
      expect(field.el.innerHTML).not.toContain("existing content")

    it "renders a label", ->
      field = createInstance().render()
      label = field.$("label").html().replace(/\n/g, "").trim()
      expect(label).toBe("Active")

    it "renders an input with the correct name", ->
      field = createInstance()
      field.render()
      expect(field.$("input").attr("name")).toBe("active_input")

    it "initializes the input content", ->
      model = new Backbone.Model({active: true})
      field = createInstance({model: model}).render()
      expect(field.get()).toBe(true)

    describe "a required input", ->
      it "designates the element as required", ->
        field = createInstance({required: true}).render()
        expect(field.$el.attr("class")).toContain("required")

      it "renders an asterisk in the label", ->
        field = createInstance({required: true}).render()
        label = field.$("label").html().replace(/\n/g, "").trim()
        expect(label).toBe("<i>*</i> Active")

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
    it "returns true when the checkbox is checked", ->
      field = createInstance().render()
      field.$("input").prop("checked", true)
      expect(field.get()).toBe(true)

    it "allows the checked value to be specified", ->
      field = createInstance(checkedValue: "isTrue").render()
      field.$("input").prop("checked", true)
      expect(field.get()).toBe("isTrue")

    it "returns null when the checkbox is checked", ->
      field = createInstance().render()
      field.$("input").prop("checked", false)
      expect(field.get()).toBe(null)

    it "allows the unchecked value to be specified", ->
      field = createInstance(uncheckedValue: "isFalse").render()
      field.$("input").prop("checked", false)
      expect(field.get()).toBe("isFalse")

  describe "#set", ->
    it "checks the checkbox if the specified value is true", ->
      field = createInstance().render()
      field.set(true)
      expect(field.$("input").prop("checked")).toBe(true)

    it "does not check the checkbox if the specied value is not true", ->
      field = createInstance().render()
      field.set(false)
      expect(field.$("input").prop("checked")).toBe(false)

    it "checks the checkbox if the specified value is matches the specified checkedValue", ->
      field = createInstance(checkedValue: "isTrue").render()
      field.set("isTrue")
      expect(field.$("input").prop("checked")).toBe(true)

    it "does not check the checkbox if the specified value is matches the specified checkedValue", ->
      field = createInstance(checkedValue: "isTrue").render()
      field.set("isFalse")
      expect(field.$("input").prop("checked")).toBe(false)

    it "allows the specified of an 'checkedTest' ", ->
      checkedTest = (val) ->
        val in [true, "isTrue"]

      field = createInstance(checkedTest: checkedTest).render()
      field.set("isTrue")
      expect(field.$("input").prop("checked")).toBe(true)

    it "does not check the checkbox if the checkedTest fails", ->
      checkedTest = (val) ->
        val in [true, "isTrue"]

      field = createInstance(checkedTest: checkedTest).render()
      field.set("isFalse")
      expect(field.$("input").prop("checked")).toBe(false)

  describe "#clear", ->
    it "unchecks the checkbox", ->
      field = createInstance().render()
      field.$("input").prop("checked", true)
      field.clear()
      expect(field.$("input").prop("checked")).toBe(false)

    it "clears errors", ->
      field = createInstance().render()
      field.renderErrors(["error"])
      field.clear()
      expect(field.$(".inline-errors").text()).not.toContain("error")

  describe "#reset", ->
    it "updates the input to reflect the model", ->
      model = new Backbone.Model({active: true})
      field = createInstance({model: model}).render()
      model.set({active: false}, {silent: true})
      field.reset()
      expect(field.get()).toBe(null)

  describe "#commit", ->
    it "applies the input value to the model", ->
      model = new Backbone.Model({active: false})
      field = createInstance({model: model}).render()
      field.set(true)
      field.commit()
      expect(model.get("active")).toBe(true)

  describe "model syncing", ->
    it "syncs the input with the model", ->
      model = new Backbone.Model({active: true})
      field = createInstance({model: model}).render()
      model.set({active: null})
      expect(field.get()).toBe(null)

    it "commits input changes back to the model", ->
      model = new Backbone.Model({active: false})
      field = createInstance({model: model}).render()
      field.set(true)
      field.$("input").trigger("change")
      expect(model.get("active")).toBe(true)

    it "does not commit changes when autocommit is disabled", ->
      model = new Backbone.Model({active: false})
      field = createInstance({model: model, autoCommit: false}).render()
      field.set(true)
      field.$("input").trigger("change")
      expect(model.get("active")).toBe(false)
