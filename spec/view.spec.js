// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe("view", function() {
    describe("renderer registraion", function() {
      describe("when a template is specified", function() {
        var TestView;
        TestView = (function(_super) {

          __extends(TestView, _super);

          function TestView() {
            return TestView.__super__.constructor.apply(this, arguments);
          }

          TestView.prototype.template = "path/to/template";

          return TestView;

        })(Traction.View);
        beforeEach(function() {
          this.templateStrategy = {};
          spyOn(Traction.Rendering, "TemplateStrategy").andReturn(this.templateStrategy);
          return this.view = new TestView();
        });
        it("instantiates an Template rendering strategy", function() {
          return expect(Traction.Rendering.TemplateStrategy).toHaveBeenCalledWith({
            template: "path/to/template",
            renderWithin: this.view.el
          });
        });
        return it("assigns the Template rendering strategy", function() {
          return expect(this.view.renderer).toBe(this.templateStrategy);
        });
      });
      describe("when an element is supplied to the view", function() {
        beforeEach(function() {
          this.prerenderedStrategy = {};
          spyOn(Traction.Rendering, "PrerenderedStrategy").andReturn(this.prerenderedStrategy);
          return this.view = new Traction.View({
            el: jQuery("<div></div>")
          });
        });
        it("instantiates an Prerendered element rendering strategy", function() {
          return expect(Traction.Rendering.PrerenderedStrategy).toHaveBeenCalledWith({
            renderWithin: this.view.el
          });
        });
        return it("assigns the Prerendered element rendering strategy", function() {
          return expect(this.view.renderer).toBe(this.prerenderedStrategy);
        });
      });
      return describe("when no element is supplied", function() {
        beforeEach(function() {
          this.appendStrategy = {};
          spyOn(Traction.Rendering, "AppendStrategy").andReturn(this.appendStrategy);
          return this.view = new Traction.View();
        });
        it("instantiates an Append rendering strategy", function() {
          return expect(Traction.Rendering.AppendStrategy).toHaveBeenCalledWith({
            renderWithin: this.view.el
          });
        });
        return it("assigns the Append rendering strategy", function() {
          return expect(this.view.renderer).toBe(this.appendStrategy);
        });
      });
    });
    describe("#proxyEvent", function() {
      beforeEach(function() {
        this.parent = new Traction.View();
        return this.child = new Traction.View();
      });
      it("should pass along the event and arguments", function() {
        this.parent.proxyEvent(this.child, "child-event");
        spyOn(this.parent, "trigger");
        this.child.trigger("child-event", "child-arg-1", "child-arg-2");
        return expect(this.parent.trigger).toHaveBeenCalledWith("child-event", "child-arg-1", "child-arg-2");
      });
      return it("can rename the event", function() {
        this.parent.proxyEvent(this.child, "child-event", "renamed-child-event");
        spyOn(this.parent, "trigger");
        this.child.trigger("child-event", "child-arg-1", "child-arg-2");
        return expect(this.parent.trigger).toHaveBeenCalledWith("renamed-child-event", "child-arg-1", "child-arg-2");
      });
    });
    describe("#render", function() {
      return beforeEach(function() {
        this.view = new Traction.View();
        this.children = {
          render: function() {}
        };
        this.view.renderer = {
          call: function() {
            return this;
          }
        };
        this.view.children = this.children;
        it("renders its children", function() {
          spyOn(this.view.children, "render");
          this.view.render();
          return expect(this.view.children.render).toHaveBeenCalled();
        });
        it("calls the renderer", function() {
          spyOn(this.view.renderer, "call");
          this.view.render();
          return expect(this.view.renderer.call).toHaveBeenCalledWith({
            bindTo: this.view.binding,
            children: this.children
          });
        });
        return it("returns itself", function() {
          return expect(this.view.render()).toBe(this.view);
        });
      });
    });
    return describe("#remove", function() {
      beforeEach(function() {
        return this.view = new Traction.View();
      });
      it("destroys the renderer", function() {
        this.view.renderer.destroy = jasmine.createSpy();
        this.view.remove();
        return expect(this.view.renderer.destroy).toHaveBeenCalled();
      });
      it("handles renderers lacking a destroy method", function() {
        this.view.renderer.destroy = void 0;
        return this.view.remove();
      });
      return it("removes each child", function() {
        var child;
        child = {
          remove: function() {}
        };
        this.view.children.add(child);
        spyOn(child, "remove");
        this.view.remove();
        return expect(child.remove).toHaveBeenCalled();
      });
    });
  });

}).call(this);
