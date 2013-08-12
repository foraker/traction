describe "view collection", ->
  beforeEach ->
    @collection = new Traction.ViewCollection()
    @view = {}

  describe "adding and retrieving a member", ->
    it "accepts a name and a view", ->
      @collection.add("name", @view)
      expect(@collection.get("name")).toBe @view

    it "generates a unique ID when a name is not present", ->
      spyOn(_, "uniqueId").andReturn("ABC123")
      @collection.add(@view)
      expect(@collection.get("ABC123")).toBe @view

  describe "event proxying", ->
    it "proxies child events and arguments", ->
      callback = jasmine.createSpy("callback")
      eventable_child = new Backbone.View()
      @collection.add(eventable_child)
      @collection.on("event", callback)
      eventable_child.trigger("event", "arg 1", "arg 2")
      expect(callback).toHaveBeenCalledWith(eventable_child, "arg 1", "arg 2")

  describe "#broadcastOn", ->
    child1 = new Backbone.View()
    child2 = new Backbone.View()

    beforeEach ->
      @callback = jasmine.createSpy("callback")
      @collection.add(child1)
      @collection.add(child2)
      @collection.broadcastOn("event", @callback)
      child1.trigger("event")

    it "call a callback with each child", ->
      expect(@callback).toHaveBeenCalledWith(child2)

    it "does not call the call with the child which triggered the event", ->
      expect(@callback).not.toHaveBeenCalledWith(child1)

  describe "#destroy", ->
    remove = jasmine.createSpy()
    child  = {remove: remove}

    beforeEach ->
      @collection.add(child)

    it "removes each child", ->
      @collection.destroy()
      expect(remove).toHaveBeenCalled()

    it "empties the collection", ->
      @collection.destroy()
      expect(@collection.map ->).toEqual([])

  describe "#each", ->
    it "passes each member to a callback", ->
      callback = jasmine.createSpy()
      @collection.add("child", @view)
      @collection.each(callback)
      expect(callback).toHaveBeenCalledWith(@view, "child")

  describe "#map", ->
    beforeEach ->
      @collection.add("child", @view)
      @callback = jasmine.createSpy().andReturn("result")

    it "calls the callback for each member", ->
      @collection.map(@callback)
      expect(@callback).toHaveBeenCalledWith(@view, "child")

    it "maps each member to the result of a callback", ->
      expect(@collection.map(@callback)).toEqual ["result"]

  describe "#render", ->
    beforeEach ->
      @view = {}
      @view.render = -> @
      @view.delegateEvents = -> @

      @collection.add(@view)

    it "renders each member", ->
      spyOn(@view, "render").andCallThrough()
      @collection.render()
      expect(@view.render).toHaveBeenCalled()

    it "re-delegates events on each member", ->
      spyOn(@view, "delegateEvents")
      @collection.render()
      expect(@view.delegateEvents).toHaveBeenCalled()

    it "returns itself", ->
      expect(@collection.render()).toBe @collection

  describe "#els", ->
    it "maps member to its el", ->
      view = {el: "an element"}
      @collection.add(view)
      expect(@collection.els()).toEqual ["an element"]