jasmine.sharedExamplesFor "a binding", (options) ->
  describe "destroying a binding", ->
    it "unbinds from the model", ->
      model   = new Backbone.Model()
      binding = new options.describedClass($("<p></p>")[0], "specification")

      binding.bindTo(model)
      spyOn(model, "off")
      binding.destroy()

      expect(model.off).toHaveBeenCalledWith(null, null, binding)