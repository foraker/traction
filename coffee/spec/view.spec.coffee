describe "view", ->
  describe "renderer registraion", ->
    describe "when a template is specified", ->
      class TestView extends Traction.View
        template: "path/to/template"

      beforeEach ->
        @templateStrategy = {}
        spyOn(Traction.Rendering, "TemplateStrategy").andReturn(@templateStrategy)
        @view = new TestView()

      it "instantiates an Template rendering strategy", ->
        expect(Traction.Rendering.TemplateStrategy).toHaveBeenCalledWith({
          source: "path/to/template"
          renderWithin: @view.el
        })

      it "assigns the Template rendering strategy", ->
        expect(@view.renderer).toBe @templateStrategy

    describe "when an element is supplied to the view", ->
      beforeEach ->
        @prerenderedStrategy = {}
        spyOn(Traction.Rendering, "PrerenderedStrategy").andReturn(@prerenderedStrategy)
        @view = new Traction.View(el: jQuery("<div></div>"))

      it "instantiates an Prerendered element rendering strategy", ->
        expect(Traction.Rendering.PrerenderedStrategy).toHaveBeenCalledWith({
          renderWithin: @view.el
        })

      it "assigns the Prerendered element rendering strategy", ->
        expect(@view.renderer).toBe @prerenderedStrategy

    describe "when no element is supplied", ->
      beforeEach ->
        @appendStrategy = {}
        spyOn(Traction.Rendering, "AppendStrategy").andReturn(@appendStrategy)
        @view = new Traction.View()

      it "instantiates an Append rendering strategy", ->
        expect(Traction.Rendering.AppendStrategy).toHaveBeenCalledWith({
          renderWithin: @view.el
        })

      it "assigns the Append rendering strategy", ->
        expect(@view.renderer).toBe @appendStrategy

  describe "#proxyEvent", ->
    beforeEach ->
      @parent = new Traction.View()
      @child  = new Traction.View()

    it "should pass along the event and arguments", ->
      @parent.proxyEvent(@child, "child-event")
      spyOn(@parent, "trigger")
      @child.trigger("child-event", "child-arg-1", "child-arg-2")
      expect(@parent.trigger).toHaveBeenCalledWith("child-event", "child-arg-1", "child-arg-2")

    it "can rename the event", ->
      @parent.proxyEvent(@child, "child-event", "renamed-child-event")
      spyOn(@parent, "trigger")
      @child.trigger("child-event", "child-arg-1", "child-arg-2")
      expect(@parent.trigger).toHaveBeenCalledWith("renamed-child-event", "child-arg-1", "child-arg-2")

  describe "#render", ->
    beforeEach ->
      @view = new Traction.View()
      @view.renderer = {render: -> @}
      @view.children = {render: ->}

      it "renders via the renderer with the proper binding", ->
        spyOn(@view.renderer, "render")
        @view.render()
        expect(@view.renderer.render).toHaveBeenCalledWith(binding: @view.binding)

      it "renders its children", ->
        spyOn(@view.children, "render")
        @view.render()
        expect(@view.children.render).toHaveBeenCalled()

      it "outlets its children to the renderer", ->
        spyOn(@view.renderer, "outlet")
        @view.render()
        expect(@view.renderer.outlet).toHaveBeenCalledWith(@view.children)

      it "returns itself", ->
        expect(@view.render()).toBe @view

  describe "#remove", ->
    it "removes each child", ->
      view = new Traction.View()
      child = {remove: ->}
      view.children.add(child)
      spyOn(child, "remove")
      view.remove()
      expect(child.remove).toHaveBeenCalled()

