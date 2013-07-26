describe "Traction.Decorator", ->
  class TestObject
    constructor: (@state) ->
    method:     -> "Data"
    getState:   -> @state
    overridden: -> "Original"

  class TestDecorator extends Traction.Decorator
    computedAttributes: {
      fullName: -> [@get("firstName"), @get("lastName")].join(" ")
    }

    overridden: ->
      "Overridden"

  beforeEach ->
    decorated = new TestObject("test_state")
    @decorator = new TestDecorator(decorated)

  it "proxies methods back to the decorated instance", ->
    expect(@decorator.method()).toBe "Data"

  it "proxies state", ->
    expect(@decorator.getState()).toBe "test_state"

  it "overrides methods", ->
    expect(@decorator.overridden()).toBe "Overridden"

  describe "computed attributes", ->
    beforeEach ->
      model    = new Backbone.Model({firstName: "first", lastName: "last"})
      @decorator = new TestDecorator(model)

    it "should accurately compute the property", ->
      expect(@decorator.get("fullName")).toBe("first last")

    it "updates the when a dependency changes", ->
      @decorator.set(firstName: "updated first name")
      expect(@decorator.get("fullName")).toBe("updated first name last")

    it "emits change events", ->
      spy = jasmine.createSpy()
      @decorator.on("change:fullName", spy)
      @decorator.set(firstName: "updated first name")
      expect(spy).toHaveBeenCalled()