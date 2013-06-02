describe "Rails collection" , ->
  describe "#build", ->
    class TestModel extends Backbone.Model

    class TestCollection extends Traction.Rails.Collection
      model: TestModel

    beforeEach ->
      @collection = new TestCollection()

    it "returns an instance of the collection's model", ->
      expect(@collection.build()).toBeInstanceOf TestModel

    it "does not add the model to the collection", ->
      @collection.build()
      expect(@collection.length).toBe 0

    it "assigns the urlRoot property", ->
      @collection.url = "/index"
      expect(@collection.build().urlRoot).toBe "/index"
