// Generated by CoffeeScript 1.9.3
(function() {
  describe("attribute binding", function() {
    jasmine.itShouldBehaveLike("a binding", {
      describedClass: Traction.Bindings.AttributeBinding
    });
    return describe("#bindTo", function() {
      beforeEach(function() {
        this.element = $("<p></p>")[0];
        this.model = new Backbone.Model({
          status: "new"
        });
        return this.createBinding = function(specification) {
          return new Traction.Bindings.AttributeBinding(this.element, specification).bindTo(this.model);
        };
      });
      it("sets the attribute", function() {
        this.createBinding("class:status");
        return expect(this.element.getAttribute("class")).toBe("new");
      });
      it("sets the attribute non-destructively", function() {
        this.element.setAttribute("class", "other-class");
        this.createBinding("class:status");
        return expect(this.element.getAttribute("class")).toBe("other-class new");
      });
      it("updates the attribute when the property changes", function() {
        this.createBinding("class:status");
        this.model.set("status", "pending");
        return expect(this.element.getAttribute("class")).toBe("pending");
      });
      it("works with any attribute", function() {
        this.createBinding("made-up-attribute:status");
        return expect(this.element.getAttribute("made-up-attribute")).toBe("new");
      });
      describe("a partial boolean specification", function() {
        beforeEach(function() {
          return this.createBinding("class:isActive:active");
        });
        it("sets the attribute if the boolean it true", function() {
          this.model.set("isActive", true);
          return expect(this.element.getAttribute("class")).toBe("active");
        });
        return it("removes the attribute if the boolean is false", function() {
          this.model.set("isActive", false);
          return expect(this.element.getAttribute("class")).toBe("");
        });
      });
      return describe("a full boolean specification", function() {
        beforeEach(function() {
          return this.createBinding("class:isActive:active:inactive");
        });
        it("sets the attribute if the boolean it true", function() {
          this.model.set("isActive", true);
          return expect(this.element.getAttribute("class")).toBe("active");
        });
        return it("removes the attribute if the boolean is false", function() {
          this.model.set("isActive", false);
          return expect(this.element.getAttribute("class")).toBe("inactive");
        });
      });
    });
  });

}).call(this);
