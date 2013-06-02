describe "prerendered element rendering strategy", ->
  createInstance = (options = {}) ->
    new Traction.Rendering.PrerenderedStrategy(options)

  describe "shared behavior", ->
    jasmine.itShouldBehaveLike("a node rendering strategy", {createInstance: createInstance})

  it "assigns its element", ->
    element = $("<div></div>")[0]
    renderer = createInstance({renderWithin: element})
    expect(renderer.el).toEqual element

  describe "#call", ->
    rendererWithContent = (content) ->
      element = $("<div>#{content}</div>")
      renderer = createInstance({renderWithin: element})

    describe "bindings", ->
      beforeEach ->
        @binding = {bindTo: -> @}
        spyOn(Traction.Bindings, "Factory").andReturn(@binding)

      it "creates bindings for data-bind attributes", ->
        renderer = rendererWithContent("<p data-bind='attribute'></p>")
        renderer.call()

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(renderer.$("p")[0], "attribute")

      it "registers the binding", ->
        renderer = rendererWithContent("<p data-bind='attribute'></p>")
        renderer.call()

        expect(renderer.bindings).toEqual [@binding]

      it "creates multiple bindings for multiple tag", ->
        renderer = rendererWithContent("""
          <p id='first' data-bind='attribute-one'></p>
          <p id='second' data-bind='attribute-two'></p>
        """)
        renderer.call()

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(renderer.$("p#first")[0], "attribute-one")
        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(renderer.$("p#second")[0], "attribute-two")

      it "creates multiple bindings for a single tag", ->
        renderer = rendererWithContent("<p data-bind='attribute-one attribute-two'></p>")
        renderer.call()

        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(renderer.$("p")[0], "attribute-one")
        expect(Traction.Bindings.Factory).toHaveBeenCalledWith(renderer.$("p")[0], "attribute-two")

      it "binds the factoried binding to the bindTo option", ->
        spyOn(@binding, "bindTo")
        renderer = rendererWithContent("<p data-bind='attribute'></p>")
        model = {}
        renderer.call(bindTo: model)
        expect(@binding.bindTo).toHaveBeenCalledWith(model)

    describe "outletting", ->
      it "outlets all children", ->
        renderer = rendererWithContent("<script data-outlet=''></script>")
        child = {el: "<p>child content</p>"}
        renderer.call(children: {childName: child})
        expect(renderer.el.innerHTML).toEqual "<p>child content</p>"

      it "can outlet specific children", ->
        renderer = rendererWithContent("""
          <script data-outlet='child1'></script>
          <span><script data-outlet='child2'></script></span>
        """)

        child1 = {el: "<p>Child 1 Content</p>"}
        child2 = {el: "<p>Child 2 Content</p>"}

        renderer.call(children: {child1: child1, child2: child2})
        expect(renderer.el.innerHTML).toEqual("""
          <p>Child 1 Content</p>
          <span><p>Child 2 Content</p></span>
        """)
