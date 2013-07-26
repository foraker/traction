class TestClass extends Traction.Model
  computedAttributes: {
    fullName: -> [@get("firstName"), @get("lastName")].join(" ")
  }

describe "computed attributes", ->
  beforeEach ->
    @model = new TestClass({firstName: "first", lastName: "last"})

  it "should accurately compute the property", ->
    expect(@model.get("fullName")).toBe("first last")

  it "updates the when a dependency changes", ->
    @model.set(firstName: "updated first name")
    expect(@model.get("fullName")).toBe("updated first name last")

  it "emits change events", ->
    spy = jasmine.createSpy()
    @model.on("change:fullName", spy)
    @model.set(firstName: "updated first name")
    expect(spy).toHaveBeenCalled()