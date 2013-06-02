describe "attribute binding", ->
  jasmine.itShouldBehaveLike("a binding", {
    describedClass: Traction.Bindings.AttributeBinding
  })

  describe "#bindTo", ->
    beforeEach ->
      @element       = $("<p></p>")[0]
      @model         = new Backbone.Model({status: "new"})
      @createBinding = (specification) ->
        new Traction.Bindings.AttributeBinding(@element, specification).bindTo(@model)

    it "sets the attribute", ->
      @createBinding("class:status")
      expect(@element.getAttribute("class")).toBe "new"

    it "sets the attribute non-destructively", ->
      @element.setAttribute("class", "other-class")
      @createBinding("class:status")
      expect(@element.getAttribute("class")).toBe "other-class new"

    it "updates the attribute when the property changes", ->
      @createBinding("class:status")
      @model.set("status", "pending")
      expect(@element.getAttribute("class")).toBe "pending"

    it "works with any attribute", ->
      @createBinding("made-up-attribute:status")
      expect(@element.getAttribute("made-up-attribute")).toBe "new"

    describe "a partial boolean specification", ->
      beforeEach ->
        @createBinding("class:isActive:active")

      it "sets the attribute if the boolean it true", ->
        @model.set("isActive", true)
        expect(@element.getAttribute("class")).toBe "active"

      it "removes the attribute if the boolean is false", ->
        @model.set("isActive", false)
        expect(@element.getAttribute("class")).toBe ""

    describe "a full boolean specification", ->
      beforeEach ->
        @createBinding("class:isActive:active:inactive")

      it "sets the attribute if the boolean it true", ->
        @model.set("isActive", true)
        expect(@element.getAttribute("class")).toBe "active"

      it "removes the attribute if the boolean is false", ->
        @model.set("isActive", false)
        expect(@element.getAttribute("class")).toBe "inactive"