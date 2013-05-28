// Generated by CoffeeScript 1.3.3
(function() {

  describe("append rendering strategy", function() {
    describe("rendering", function() {
      return it("empties the element", function() {
        var el, renderer;
        el = $("<p>content</p>");
        renderer = new Traction.Rendering.AppendStrategy({
          renderWithin: el
        });
        renderer.render();
        return expect(el.html()).toBe("");
      });
    });
    return describe("outletting", function() {
      return it("appends the children els", function() {
        var children, el, renderer;
        el = $("<p></p>");
        renderer = new Traction.Rendering.AppendStrategy({
          renderWithin: el
        });
        children = {
          els: function() {
            return "child content";
          }
        };
        renderer.outlet(children);
        return expect(el.html()).toBe("child content");
      });
    });
  });

}).call(this);
