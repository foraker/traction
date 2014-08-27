class Traction.ViewCollection
  _.extend(@prototype, Backbone.Events)

  constructor: ->
    @collection = {}

  add: (nameOrMember, member) ->
    unless member
      member = nameOrMember
      nameOrMember = _.uniqueId()

    @collection[nameOrMember] = member

    if member.on and member.off
      @listenTo member, "all", =>
        args = Array.prototype.slice.call(arguments)
        args = [args[0], member].concat(args[1..-1])
        @trigger.apply(@, args)

      @listenTo member, "remove", _.partial(@remove, nameOrMember)

  remove: (name) ->
    delete @collection[name]

  broadcastOn: (event, callback) ->
    @listenTo @, event, (triggerer) =>
      @each (child) ->
        callback(child) unless child is triggerer

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

  views: ->
    _.values(@collection)
