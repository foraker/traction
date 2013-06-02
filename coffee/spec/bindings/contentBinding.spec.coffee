describe "content binding", ->
  describe "#bindTo", ->
    element = $("<p></p>")[0]
    model   = new Backbone.Model({name: "original name"})

    beforeEach ->
      new Traction.Bindings.ContentBinding(element, "name").bindTo(model)

    it "sets the content of element", ->
      expect(element.innerHTML).toBe "original name"

    it "updates the content of the element when the property changes", ->
      model.set("name", "updated name")
      expect(element.innerHTML).toBe "updated name"
