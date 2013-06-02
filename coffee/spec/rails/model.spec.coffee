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

  describe "#set", ->
    class User extends Traction.Rails.Model
      associations: {
        comments: Backbone.Collection
        profile: Backbone.Model
      }

    beforeEach ->
      @user = new User({
        name: "Test User"
        comments: [{content: "comment 1"}]
        comments_url: "/comments"
      })

    describe "creating associations", ->
      it "assigns attributes", ->
        expect(@user.get("name")).toBe "Test User"

      it "maps the associated attribute to the correct class", ->
        expect(@user.get("comments")).toBeInstanceOf Backbone.Collection

      it "assigns the correct attributes to the association", ->
        expect(@user.get("comments").first().get("content")).toBe "comment 1"

      it "assign a URL when present", ->
        expect(@user.get("comments").url).toBe "/comments"

      it "handles multiple associations", ->
        user = new User(profile: {})
        expect(user.get("profile")).toBeInstanceOf Backbone.Model

    describe "updating associations", ->
      it "sets non-association attributes", ->
        @user.set({name: "new name"})
        expect(@user.get("name")).toBe "new name"

      it "resets resetable (collection) associations", ->
        commentsCollection = @user.get("comments")
        spyOn(commentsCollection, "reset")
        @user.set({comments: []})
        expect(commentsCollection.reset).toHaveBeenCalledWith([])

      it "retains the updated association", ->
        @user.set({comments: []})
        expect(@user.get("comments")).toBeInstanceOf Backbone.Collection

      it "does not remove associations when the attribute has not been specified", ->
        originalCollection = @user.get("comments")
        @user.set()
        expect(@user.get("comments")).toBe originalCollection

      it "removes associations when the attribute is undefined", ->
        @user.set(comments: undefined)
        expect(@user.get("comments")).toBe undefined

      it "sets setable (model) associations", ->
        @user.set({profile: {type: "admin"}})
        expect(@user.get("profile").get("type")).toBe "admin"

    it "handles attr, val style setting", ->
      @user.set("name", "Timothy")
      expect(@user.get("name")).toBe "Timothy"

  describe "#url", ->
    it "returns the 'url' attribute", ->
      model = new Traction.Rails.Model(url: "/items")
      expect(model.url()).toBe "/items"

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

  describe "#toggle", ->
    it "inverts an attribute", ->
      model = new Traction.Rails.Model(admin: true)
      model.toggle('admin')
      expect(model.get("admin")).toBe false

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
