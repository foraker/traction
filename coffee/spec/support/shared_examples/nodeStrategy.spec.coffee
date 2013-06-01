jasmine.sharedExamplesFor "a node rendering strategy", (options) ->
  it "triggers events on the rendered element when clicked", ->
    element  = $("<div><a data-emit='delete:user'></a></div>")
    renderer = options.createInstance({renderWithin: element})
    callback = jasmine.createSpy()

    element.on("delete:user", callback)
    element.find("a").click()

    expect(callback).toHaveBeenCalled()

  it "can trigger multiple events", ->
    element = $("<div><a data-emit='delete:user delete:account'></a></div>")
    renderer = options.createInstance({renderWithin: element})

    callback1 = jasmine.createSpy()
    callback2 = jasmine.createSpy()

    element.on("delete:user", callback1)
    element.on("delete:account", callback2)
    element.find("a").click()

    expect(callback1).toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()

  describe "forms", ->
    beforeEach ->
      @element  = $("<div><form data-emit='create:user'></form></div>")
      @renderer = options.createInstance({renderWithin: @element})
      @callback = jasmine.createSpy()
      @element.on("create:user", @callback)

    it "does not trigger events on click", ->
      @element.find("form").click()
      expect(@callback).not.toHaveBeenCalled()

    it "triggers events on submission", ->
      @element.find("form").submit()
      expect(@callback).toHaveBeenCalled()
