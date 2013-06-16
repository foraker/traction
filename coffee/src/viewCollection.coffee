class Traction.ViewCollection
  constructor: ->
    @collection = {}

  add: (nameOrMember, member) ->
    if member
      @collection[nameOrMember] = member
    else
      @collection[_.uniqueId()] = nameOrMember

  get: (name) ->
    @collection[name]

  each: (callback) ->
    callback(member) for name, member of @collection

  map: (callback) ->
    _.map(@collection, (child, name) -> callback(child, name))

  render: ->
    @each (member) -> member.render().delegateEvents()
    @

  els: ->
    @map (member) -> member.el
