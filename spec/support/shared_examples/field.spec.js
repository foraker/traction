// Generated by CoffeeScript 1.9.3
(function() {
  jasmine.sharedExamplesFor("a field", function(options) {
    describe("#render", function() {
      it("removes existing content", function() {
        var field;
        field = options.createInstance();
        field.$el.append("existing content");
        field.render();
        return expect(field.el.innerHTML).not.toContain("existing content");
      });
      it("renders a label", function() {
        var field, label;
        field = options.createInstance().render();
        label = field.$("label").html().replace(/\n/g, "").trim();
        return expect(label).toBe("First name");
      });
      it("renders an input with the correct name", function() {
        var field;
        field = options.createInstance();
        field.render();
        return expect(field.$(options.input).attr("name")).toBe("first_name_input");
      });
      it("initializes the input content", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model
        }).render();
        return expect(field.$(options.input).val()).toBe("Jobin");
      });
      return describe("a required input", function() {
        it("designates the element as required", function() {
          var field;
          field = options.createInstance({
            required: true
          }).render();
          return expect(field.$el.attr("class")).toContain("required");
        });
        return it("renders an asterisk in the label", function() {
          var field, label;
          field = options.createInstance({
            required: true
          }).render();
          label = field.$("label").html().replace(/\n/g, "").trim();
          return expect(label).toBe("<i>*</i> First name");
        });
      });
    });
    describe("#renderErrors", function() {
      it("adds a class of 'errors'", function() {
        var field;
        field = options.createInstance().render();
        field.renderErrors([]);
        return expect(field.$el.attr("class")).toContain("error");
      });
      it("appends error messages", function() {
        var field;
        field = options.createInstance().render();
        field.renderErrors(["error 1", "error 2"]);
        return expect(field.$(".inline-errors").text()).toBe("error 1, error 2");
      });
      return it("appends a single error message", function() {
        var field;
        field = options.createInstance().render();
        field.renderErrors(["error 1"]);
        return expect(field.$(".inline-errors").text()).toBe("error 1");
      });
    });
    describe("#disable", function() {
      return it("adds the disabled attribute", function() {
        var field;
        field = options.createInstance().render();
        field.disable();
        return expect(field.$(options.input).attr("disabled")).toBe("disabled");
      });
    });
    describe("#enable", function() {
      return it("removes the disabled attribute", function() {
        var field;
        field = options.createInstance().render();
        field.disable();
        field.enable();
        return expect(field.$(options.input).attr("disabled")).toBeUndefined();
      });
    });
    describe("#get", function() {
      return it("returns the input value", function() {
        var field;
        field = options.createInstance().render();
        field.$(options.input).val("Jobin");
        return expect(field.get()).toBe("Jobin");
      });
    });
    describe("#set", function() {
      return it("sets the input value", function() {
        var field;
        field = options.createInstance().render();
        field.set("Jobin");
        return expect(field.$(options.input).val()).toBe("Jobin");
      });
    });
    describe("#clear", function() {
      return it("removes any errors", function() {
        var field;
        field = options.createInstance().render();
        field.renderErrors(["error"]);
        field.clear();
        return expect(field.$(".inline-errors").text()).not.toContain("error");
      });
    });
    describe("#clearErrors", function() {
      return it("removes any errors", function() {
        var field;
        field = options.createInstance().render();
        field.renderErrors(["error"]);
        field.clearErrors();
        return expect(field.$(".inline-errors").text()).not.toContain("error");
      });
    });
    describe("#rerenderErrors", function() {
      var field;
      field = options.createInstance().render();
      field.renderErrors(["original error"]);
      field.rerenderErrors(["new error"]);
      it("removes the old errors", function() {
        return expect(field.$(".inline-errors").text()).not.toContain("original error");
      });
      return it("adds the new errors", function() {
        return expect(field.$(".inline-errors").text()).toContain("new error");
      });
    });
    describe("#reset", function() {
      return it("updates the input to reflect the model", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model
        }).render();
        model.set({
          first_name: "Crenst"
        }, {
          silent: true
        });
        field.reset();
        return expect(field.get()).toBe("Crenst");
      });
    });
    describe("#commit", function() {
      return it("applies the input value to the model", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model
        }).render();
        field.set("Crenst");
        field.commit();
        return expect(model.get("first_name")).toBe("Crenst");
      });
    });
    return describe("model syncing", function() {
      it("syncs the input with the model", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model
        }).render();
        model.set({
          first_name: "Crenst"
        });
        return expect(field.get()).toBe("Crenst");
      });
      it("commits input changes back to the model", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model
        }).render();
        field.set("Crenst");
        field.$(options.input).trigger("change");
        return expect(model.get("first_name")).toBe("Crenst");
      });
      return it("does not commit changes when autocommit is disabled", function() {
        var field, model;
        model = new Backbone.Model({
          first_name: "Jobin"
        });
        field = options.createInstance({
          model: model,
          autoCommit: false
        }).render();
        field.set("Crenst");
        field.$(options.input).trigger("change");
        return expect(model.get("first_name")).toBe("Jobin");
      });
    });
  });

}).call(this);
