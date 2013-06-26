describe "append rendering strategy", ->
  describe "rendering", ->
    el = $("<p>content</p>")
    renderer = new Traction.Rendering.AppendStrategy(renderWithin: el)

    it "empties the element", ->
      renderer.call()
      expect(el.html()).toBe ""

    it "appends the children els", ->
      children = {els: -> "child content"}
      renderer.call(children: children)
      expect(el.html()).toBe "child content"