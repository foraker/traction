class Traction.Model extends Backbone.Model
  _.extend(@prototype, Traction.ComputedAttributes)

  constructor: ->
    super
    @_assignComputedAttributes()
