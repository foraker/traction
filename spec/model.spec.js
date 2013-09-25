// Generated by CoffeeScript 1.3.3
(function() {
  var TestClass,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TestClass = (function(_super) {

    __extends(TestClass, _super);

    function TestClass() {
      return TestClass.__super__.constructor.apply(this, arguments);
    }

    TestClass.prototype.computedAttributes = {
      fullName: function() {
        return [this.get("firstName"), this.get("lastName")].join(" ");
      }
    };

    return TestClass;

  })(Traction.Model);

  describe("computed attributes", function() {
    beforeEach(function() {
      return this.model = new TestClass({
        firstName: "first",
        lastName: "last"
      });
    });
    it("should accurately compute the property", function() {
      return expect(this.model.get("fullName")).toBe("first last");
    });
    it("updates the when a dependency changes", function() {
      this.model.set({
        firstName: "updated first name"
      });
      return expect(this.model.get("fullName")).toBe("updated first name last");
    });
    return it("emits change events", function() {
      var spy;
      spy = jasmine.createSpy();
      this.model.on("change:fullName", spy);
      this.model.set({
        firstName: "updated first name"
      });
      return expect(spy).toHaveBeenCalled();
    });
  });

}).call(this);
