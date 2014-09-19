describe "Rails model", ->
  describe "initialization", ->
    it "allows the paramRoot to be specified", ->
      class TestModel extends Traction.Rails.Model
        paramRoot: "test"
      expect(new TestModel().paramRoot).toBe "test"

    it "infers the paramRoot when unspecified", ->
      Namespace = {}
      class Namespace.UserComment extends Traction.Rails.Model
      expect(new Namespace.UserComment().paramRoot).toBe "user_comment"

    it "does not infer the paramRoot when the model is a Traction.Rails.Model", ->
      expect(new Traction.Rails.Model().paramRoot).toBe undefined

  describe "error parsing", ->
    beforeEach ->
      @item = new Traction.Rails.Model

    it "parses the response errors", ->
      json = JSON.stringify({errors: {name: 'is invalid'}})
      @item.trigger("error", @item, {responseText: json})
      expect(@item.errors).toEqual {name: "is invalid"}

    it "handles responses without errors", ->
      # should not throw an exception
      @item.trigger("error", @item, {responseText: null})

  describe "#toJSON", ->
    it "returns model attributes", ->
      model = new Traction.Rails.Model(name: "name")
      expect(model.toJSON()).toEqual {name: "name"}

    describe "when persistable attributes are defined", ->
      it "only return specified attributes", ->
        class TestModel extends Traction.Rails.Model
          persists: ['name']

        model = new TestModel(name: "name", email: "email@example")
        expect(model.toJSON()).toEqual {name: "name"}

  describe "#patch", ->
    beforeEach ->
      @instance = new Traction.Rails.Model(first_name: "initial first", last_name: "initial last")
      @instance.changed = false
      spyOn(@instance, "sync")

    it "only persists changed attributes", ->
      @instance.set(last_name: "updated_last")
      @instance.patch()
      expect(@instance.sync).toHaveBeenCalledWith('update', @instance, attrs: {
        last_name: "updated_last"
      })

    it "respects a paramRoot", ->
      @instance.paramRoot = "user"
      @instance.set(last_name: "updated_last")
      @instance.patch()
      expect(@instance.sync).toHaveBeenCalledWith('update', @instance, attrs: {
        user: {
          last_name: "updated_last"
        }
      })
