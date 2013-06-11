// Generated by CoffeeScript 1.3.3
(function() {

  describe("Traction.Forms.TextArea", function() {
    var createInstance;
    createInstance = function(options) {
      var defaults;
      defaults = {
        attribute: "first_name",
        name: "first_name_input",
        label: "First name",
        model: new Backbone.Model()
      };
      return new Traction.Forms.TextArea(_.extend(defaults, options));
    };
    return describe("shared behavior", function() {
      return jasmine.itShouldBehaveLike("a field", {
        createInstance: createInstance,
        input: "textarea"
      });
    });
  });

}).call(this);
