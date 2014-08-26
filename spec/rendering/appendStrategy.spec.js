// Generated by CoffeeScript 1.8.0
(function() {
  describe("append rendering strategy", function() {
    return describe("rendering", function() {
      var el, renderer;
      el = $("<p>content</p>");
      renderer = new Traction.Rendering.AppendStrategy({
        renderWithin: el
      });
      it("empties the element", function() {
        renderer.call();
        return expect(el.html()).toBe("");
      });
      return it("appends the children els", function() {
        var children;
        children = {
          els: function() {
            return "child content";
          }
        };
        renderer.call({
          children: children
        });
        return expect(el.html()).toBe("child content");
      });
    });
  });

}).call(this);
