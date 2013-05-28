describe "append rendering strategy", ->
  describe "rendering", ->
    it "empties the element", ->
      el = $("<p>content</p>")
      renderer = new Traction.Rendering.AppendStrategy(renderWithin: el)
      renderer.render()
      expect(el.html()).toBe ""

  describe "outletting", ->
    it "appends the children els", ->
      el = $("<p></p>")
      renderer = new Traction.Rendering.AppendStrategy(renderWithin: el)
      children = {els: -> "child content"}
      renderer.outlet(children)
      expect(el.html()).toBe "child content"