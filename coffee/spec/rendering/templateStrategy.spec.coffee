describe "template rendering strategy", ->
  JST["templates/source/path"] = ->

  createInstance = (options = {}) ->
    new Traction.Rendering.TemplateStrategy(_.extend(options, {template: "source/path"}))

  describe "shared behavior", ->
    jasmine.itShouldBehaveLike("a node rendering strategy", {createInstance: createInstance})

  it "assigns its element", ->
    element = $("<div></div>")[0]
    renderer = createInstance({renderWithin: element})
    expect(renderer.el).toEqual element

  it "finds the JST template function source", ->
    templateFunction = ->
    JST["templates/source/path"] = templateFunction
    renderer = createInstance()
    expect(renderer.template).toBe templateFunction

  describe "#call", ->
    beforeEach ->
      @element = $("<div>original content</div>")[0]
      @renderer = createInstance({renderWithin: @element})
      @renderer.template = -> "templated content"

    it "empties the existing node contents", ->
      @renderer.call()
      expect(@element.innerHTML).not.toContain "original content"

    it "calls the template function with the correct options", ->
      binding = {}
      spyOn(@renderer, "template")
      @renderer.call({bindTo: binding})
      expect(@renderer.template).toHaveBeenCalledWith({
        outlet: @renderer.buildOutlet
        context: binding
      })

    it "appends the results of the template function", ->
      @renderer.call()
      expect(@element.innerHTML).toContain "templated content"

    describe "bindings", ->
      beforeEach ->
        @model   = {}
        @binding = {bindTo: -> @}
        spyOn(Traction.Bindings, "Factory").andReturn(@binding)

      it "creates bindings for data-bind attributes", ->
        @renderer.template = -> "<p data-bind='attribute'></p>"
        @renderer.call(bindTo: @model)

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(@renderer.$("p")[0], "attribute")

      it "registers the binding", ->
        @renderer.template = -> "<p data-bind='attribute'></p>"
        @renderer.call(bindTo: @model)

        expect(@renderer.bindings).toEqual [@binding]

      it "creates multiple bindings for multiple tag", ->
        @renderer.template = -> """
          <p id='first' data-bind='attribute-one'></p>
          <p id='second' data-bind='attribute-two'></p>
        """
        @renderer.call(bindTo: @model)

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(@renderer.$("p#first")[0], "attribute-one")
        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(@renderer.$("p#second")[0], "attribute-two")

      it "creates multiple bindings for a single tag", ->
        @renderer.template = -> """
          <p data-bind='attribute-one attribute-two'></p>
        """
        @renderer.call(bindTo: @model)

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(@renderer.$("p")[0], "attribute-one")
        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(@renderer.$("p")[0], "attribute-two")

      it "binds the factoried binding to the bindTo option", ->
        spyOn(@binding, "bindTo")
        @renderer.template = -> "<p data-bind='attribute'></p>"
        @renderer.call(bindTo: @model)
        expect(@binding.bindTo).toHaveBeenCalledWith(@model)

    describe "outletting", ->
      it "outlets all children els", ->
        @renderer.template = -> "<script data-outlet=''></script>"
        children = {els: -> ["<p>child content</p>"]}
        @renderer.call(children: children)
        expect(@renderer.el.innerHTML).toEqual "<p>child content</p>"

      it "can outlet specific children", ->
        @renderer.template = -> """
          <script data-outlet='child1'></script>
          <span><script data-outlet='child2'></script></span>
        """

        child1   = {el: "<p>Child 1 Content</p>"}
        child2   = {el: "<p>Child 2 Content</p>"}
        children = {
          get: (name) -> {child1: child1, child2: child2}[name]
        }

        @renderer.call(children: children)
        expect(@renderer.el.innerHTML).toEqual("""
          <p>Child 1 Content</p>
          <span><p>Child 2 Content</p></span>
        """)

  describe "#buildOutlet", ->
    renderer = createInstance()

    it "returns a script tag with the correct data attribute", ->
      markup = renderer.buildOutlet("child")
      expect(markup).toBe "<script data-outlet='child'></script>"

    it "default the name of the child to an empty string", ->
      markup = renderer.buildOutlet()
      expect(markup).toBe "<script data-outlet=''></script>"
