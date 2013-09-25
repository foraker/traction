// Generated by CoffeeScript 1.3.3
(function() {

  jasmine.sharedExamplesFor("a binding", function(options) {
    return describe("destroying a binding", function() {
      return it("unbinds from the model", function() {
        var binding, model;
        model = new Backbone.Model();
        binding = new options.describedClass($("<p></p>")[0], "specification");
        binding.bindTo(model);
        spyOn(model, "off");
        binding.destroy();
        return expect(model.off).toHaveBeenCalledWith(null, null, binding);
      });
    });
  });

}).call(this);
