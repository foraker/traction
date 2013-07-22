class Traction.ViewCollection
  constructor: ->
    @collection = {}

  add: (nameOrMember, member) ->
    if member
      @collection[nameOrMember] = member
    else
      @collection[_.uniqueId()] = nameOrMember

  destroy: ->
    @each (child) -> child.remove()
    @collection = {}

  get: (name) ->
    @collection[name]

  each: (callback) ->
    callback(member, name) for name, member of @collection

  map: (callback) ->
    _.map(@collection, (member, name) -> callback(member, name))

  render: ->
    @each (member) -> member.render().delegateEvents()
    @

  els: ->
    @map (member) -> member.el
