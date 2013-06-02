describe "formatted content binding", ->
  describe "#bindTo", ->
    element = $("<p></p>")[0]
    model   = new Backbone.Model({name: "Original Name"})

    beforeEach ->
      Traction.TemplateHelpers.Formatting ||= {
        downcase: ->
        append: ->
      }

      spyOn(Traction.TemplateHelpers.Formatting, "downcase")
        .andCallFake(String.prototype.toLowerCase)
      spyOn(Traction.TemplateHelpers.Formatting, "append")
        .andCallFake((appended) -> this + appended)

    createBinding = (specification) ->
      new Traction.Bindings.FormattedContentBinding(element, specification).bindTo(model)

    it "sets the content of element as the formatted attribute", ->
      createBinding("name|downcase")
      expect(element.innerHTML).toBe "original name"

    it "passes arguments to formatters", ->
      createBinding("name|append:zzz")
      expect(element.innerHTML).toBe "Original Namezzz"

    it "chains formatters", ->
      createBinding("name|downcase|append:zzz")
      expect(element.innerHTML).toBe "original namezzz"

    it "updates the content of the element when the property changes", ->
      createBinding("name|downcase")
      model.set("name", "Updated Name")
      expect(element.innerHTML).toBe "updated name"
