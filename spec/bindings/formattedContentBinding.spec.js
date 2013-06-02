// Generated by CoffeeScript 1.3.3
(function() {

  describe("formatted content binding", function() {
    return describe("#bindTo", function() {
      var createBinding, element, model;
      element = $("<p></p>")[0];
      model = new Backbone.Model({
        name: "Original Name"
      });
      beforeEach(function() {
        var _base;
        (_base = Traction.TemplateHelpers).Formatting || (_base.Formatting = {
          downcase: function() {},
          append: function() {}
        });
        spyOn(Traction.TemplateHelpers.Formatting, "downcase").andCallFake(String.prototype.toLowerCase);
        return spyOn(Traction.TemplateHelpers.Formatting, "append").andCallFake(function(appended) {
          return this + appended;
        });
      });
      createBinding = function(specification) {
        return new Traction.Bindings.FormattedContentBinding(element, specification).bindTo(model);
      };
      it("sets the content of element as the formatted attribute", function() {
        createBinding("name|downcase");
        return expect(element.innerHTML).toBe("original name");
      });
      it("passes arguments to formatters", function() {
        createBinding("name|append:zzz");
        return expect(element.innerHTML).toBe("Original Namezzz");
      });
      it("chains formatters", function() {
        createBinding("name|downcase|append:zzz");
        return expect(element.innerHTML).toBe("original namezzz");
      });
      return it("updates the content of the element when the property changes", function() {
        createBinding("name|downcase");
        model.set("name", "Updated Name");
        return expect(element.innerHTML).toBe("updated name");
      });
    });
  });

}).call(this);
