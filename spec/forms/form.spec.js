// Generated by CoffeeScript 1.3.3
(function() {

  describe("form", function() {
    beforeEach(function() {
      this.model = {};
      return this.form = new Traction.Forms.Form({
        model: this.model
      });
    });
    describe("#addInput", function() {
      beforeEach(function() {
        this.input = {};
        return spyOn(Traction.Forms, "TextField").andReturn(this.input);
      });
      it("creates an input with default options", function() {
        this.form.addInput({
          attribute: "email"
        });
        return expect(Traction.Forms.TextField).toHaveBeenCalledWith({
          attribute: "email",
          label: "Email",
          model: this.model
        });
      });
      it("allows label specification", function() {
        this.form.addInput({
          attribute: "email",
          label: "User Email"
        });
        return expect(Traction.Forms.TextField).toHaveBeenCalledWith({
          attribute: "email",
          label: "User Email",
          model: this.model
        });
      });
      it("allows type specification", function() {
        spyOn(Traction.Forms, "TextArea");
        this.form.addInput({
          attribute: "email",
          type: Traction.Forms.TextArea
        });
        return expect(Traction.Forms.TextArea).toHaveBeenCalledWith({
          attribute: "email",
          label: "Email",
          model: this.model
        });
      });
      it("adds the input to children", function() {
        spyOn(this.form.children, "add");
        this.form.addInput({
          attribute: "email"
        });
        return expect(this.form.children.add).toHaveBeenCalledWith('email_field', this.input);
      });
      return it("allows the child name to be specified", function() {
        spyOn(this.form.children, "add");
        this.form.addInput({
          attribute: "email",
          name: "emailInput"
        });
        return expect(this.form.children.add).toHaveBeenCalledWith('emailInput', this.input);
      });
    });
    describe("#serialize", function() {
      return it("serializes input values and attributes", function() {
        var child;
        child = {
          attribute: "attribute",
          val: function() {
            return "value";
          }
        };
        this.form.children.add(child);
        return expect(this.form.serialize()).toEqual({
          "attribute": "value"
        });
      });
    });
    describe("#renderErrors", function() {
      return it("serializes input values and attributes", function() {
        var child;
        child = {
          attribute: "attribute",
          val: function() {
            return "value";
          }
        };
        this.form.children.add(child);
        return expect(this.form.serialize()).toEqual({
          "attribute": "value"
        });
      });
    });
    describe("#clearErrors", function() {
      it("clears errors for each child", function() {
        var child;
        child = jasmine.createSpyObj('input', ['clearErrors']);
        this.form.children.add(child);
        this.form.clearErrors();
        return expect(child.clearErrors).toHaveBeenCalled();
      });
      return it("handles children which do not support clearning errors", function() {
        this.form.children.add({});
        return this.form.clearErrors();
      });
    });
    describe("#clear", function() {
      it("clears each child", function() {
        var child;
        child = jasmine.createSpyObj('input', ['clear']);
        this.form.children.add(child);
        this.form.clear();
        return expect(child.clear).toHaveBeenCalled();
      });
      return it("handles children which do not support clear", function() {
        this.form.children.add({});
        return this.form.clear();
      });
    });
    describe("#commit", function() {
      it("commits each child", function() {
        var child;
        child = jasmine.createSpyObj('input', ['commit']);
        this.form.children.add(child);
        this.form.commit();
        return expect(child.commit).toHaveBeenCalled();
      });
      return it("handles children which do not support commit", function() {
        this.form.children.add({});
        return this.form.commit();
      });
    });
    return describe("#reset", function() {
      it("reset each child", function() {
        var child;
        child = jasmine.createSpyObj('input', ['reset']);
        this.form.children.add(child);
        this.form.reset();
        return expect(child.reset).toHaveBeenCalled();
      });
      return it("handles children which do not support resetting", function() {
        this.form.children.add({});
        return this.form.reset();
      });
    });
  });

}).call(this);
