describe "formatted content binding", ->
  jasmine.itShouldBehaveLike("a binding", {
    describedClass: Traction.Bindings.FormattedContentBinding
  })

  describe "#bindTo", ->
    element = $("<p></p>")[0]
    model   = new Backbone.Model({name: "Original Name"})

    beforeEach ->
      @originalHelpers = Traction.TemplateHelpers.Formatting
      Traction.TemplateHelpers.Formatting = {
        downcase: (string) -> string.toLowerCase()
        append: (string, appended) -> string + appended
      }

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

    afterEach ->
      Traction.TemplateHelpers.Formatting = @originalHelpers
