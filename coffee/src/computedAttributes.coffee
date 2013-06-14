class Traction.Model extends Backbone.Model
  constructor: ->
    super
    @computedAttributes ||= {}
    @_assignComputedAttributes()

  _assignComputedAttributes: ->
    for attribute, computation of @computedAttributes
      new ComputedAttribute(attribute, computation).bindTo(@)

class ComputedAttribute
  constructor: (@attribute, @computation) ->

  bindTo: (model) ->
    @model = model
    @model.on("change:#{dependency}", @_assign, @) for dependency in @_dependencies()
    @_assign()

  _dependencies: ->
    _.map @_getterCalls(), (match) -> match.replace(/this\.get\("/, "").replace(/\W/g, "")

  _getterCalls: ->
    @computation.toString().match(/this\.get\(.*?\)/g)

  _assign: ->
    @model.set(@attribute, @computation.apply(@model))