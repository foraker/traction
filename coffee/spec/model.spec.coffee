class TestClass extends Traction.Model
  computedAttributes: {
    fullName: -> [@get("firstName"), @get("lastName")].join(" ")
  }

describe "Traction.Model", ->
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

  describe "#url", ->
    it "returns the 'url' attribute", ->
      model = new Traction.Rails.Model(url: "/items")
      expect(model.url()).toBe "/items"

  describe "#toggle", ->
    it "inverts an attribute", ->
      model = new Traction.Rails.Model(admin: true)
      model.toggle('admin')
      expect(model.get("admin")).toBe false

  describe "#set", ->
    class User extends Traction.Model
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
      it "sets associated model attributes", ->
        @user.set({name: "new name"})
        expect(@user.get("name")).toBe "new name"

      it "sets associated collection contents", ->
        @user.set({comments: []})
        expect(@user.get("comments").models).toEqual []

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

      it "emits a change event", ->
        callback = jasmine.createSpy()
        @user.on("change:comments", callback)
        @user.set({comments: []})
        expect(callback).toHaveBeenCalled()

      it "emits a change event when the association is removed", ->
        callback = jasmine.createSpy()
        @user.on("change:comments", callback)
        @user.set({comments: null})
        expect(callback).toHaveBeenCalled()

      it "does not emit a change event when silent: true is passed", ->
        callback = jasmine.createSpy()
        @user.on("change:comments", callback)
        @user.set({comments: []}, {silent: true})
        expect(callback).not.toHaveBeenCalled()

      it "does not emit a change event when the association is unchanged", ->
        @user.set({profile: {type: "admin"}})
        callback = jasmine.createSpy()
        @user.on("change:profile", callback)
        @user.set({profile: {type: "admin"}})
        expect(callback).not.toHaveBeenCalled()

      it "does not emit a change event when the lack of an association is unchanged", ->
        @user.set({profile: null})
        callback = jasmine.createSpy()
        @user.on("change:profile", callback)
        @user.set({profile: null})
        expect(callback).not.toHaveBeenCalled()

      describe "updating a nested association", ->
        class Fees extends Traction.Rails.Collection

        class Leg extends Traction.Rails.Model
          associations: {
            fees: Fees
          }
        class Legs extends Traction.Rails.Collection
          model: Leg

        class Move extends Traction.Rails.Model
          associations: {
            legs: Legs
          }

        beforeEach ->
          fee = {id: 1}
          leg = {id: 1, fees: [fee]}
          @move = new Move(legs: [leg])

        it "retains nested references", ->
          fees = @move.get("legs").first().get("fees")
          fee  = {id: 1}
          leg  = {id: 1, fees: [fee]}
          @move.set(legs: [leg])

          expect(@move.get("legs").first().get("fees")).toBe fees

        it "does not fire change events when the nested models are the same", ->
          callback = jasmine.createSpy()
          leg = @move.get("legs").first()
          leg.on("change:fees", callback)
          fee  = {id: 1}
          leg  = {id: 1, fees: [fee]}
          @move.set(legs: [leg])

          expect(callback).not.toHaveBeenCalled()

        it "retains references when values change", ->
          fees = @move.get("legs").first().get("fees")
          fee  = {id: 2}
          leg  = {id: 1, fees: [fee]}
          @move.set(legs: [leg])

          expect(@move.get("legs").first().get("fees")).toBe fees

        it "fires change events when the nested models are the same", ->
          callback = jasmine.createSpy()
          leg = @move.get("legs").first()
          leg.on("change:fees", callback)
          fee  = {id: 2}
          leg  = {id: 1, fees: [fee]}
          @move.set(legs: [leg])

          expect(callback).toHaveBeenCalled()

    it "handles attr, val style setting", ->
      @user.set("name", "Timothy")
      expect(@user.get("name")).toBe "Timothy"

    it "does not mutate the attributes", ->
      orignalAttributes = {comments: []}
      @user.set(orignalAttributes)
      expect(orignalAttributes).toEqual {comments: []}
