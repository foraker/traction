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
      @testView = new Traction.View()
      @testView.renderer = {render: -> @}
      @testView.children = {render: ->}

      it "renders via the renderer with the proper binding", ->
        spyOn(@testView.renderer, "render")
        @testView.render()
        expect(@testView.renderer.render).toHaveBeenCalledWith(binding: @testView.binding)

      it "renders its children", ->
        spyOn(@testView.children, "render")
        @testView.render()
        expect(@testView.children.render).toHaveBeenCalled()

      it "outlets its children to the renderer", ->
        spyOn(@testView.renderer, "outlet")
        @testView.render()
        expect(@testView.renderer.outlet).toHaveBeenCalledWith(@testView.children)

      it "returns itself", ->
        expect(@testView.render()).toBe @testView
