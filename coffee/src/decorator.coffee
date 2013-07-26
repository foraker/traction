class Traction.Decorator
  _.extend(@prototype, Traction.ComputedAttributes)

  constructor: (@decorated) ->
    _.defaults(@, @decorated)
    @_assignComputedAttributes() if @_attributesComputable()

  _attributesComputable: ->
    @on and @get and @set

Traction.Decorator.extend = Backbone.Model.extend
