class Traction.Rails.Model extends Backbone.Model
  associations: {}

  initialize: ->
    @paramRoot ||= @_inferParamRoot() unless @_isBaseClass()
    @on("error", @parseErrors, @)

  set: (key, value, options) ->
    unless typeof key == "object"
      newAttributes = {}
      newAttributes[key] = value
    else
      newAttributes = key

    for associationName, klass of @associations
      if @get(associationName)
        continue unless associationName of newAttributes
        @_updateExistingAssociation(associationName, klass, newAttributes[associationName])
      else
        @_createNewAssociation(associationName, klass, newAttributes[associationName])

      delete newAttributes[associationName]

      if urlRoot = newAttributes["#{associationName}_url"]
        @get(associationName).url = urlRoot

    super(newAttributes, options)

  parseErrors: (self, response) ->
    @errors = $.parseJSON(response.responseText)?.errors

  toggle: (attribute) ->
    @set attribute, !@get(attribute)

  url: ->
    @get("url") || super

  toJSON: ->
    if @persists
      json = {}
      json[attribute] = @get(attribute) for attribute in @persists
      json
    else
      super

  # Private

  _inferParamRoot: ->
    _.string.underscored @_className()

  _className: ->
    @constructor.toString().match(/function\s(.*?)\(/)[1].toString()

  _isBaseClass: ->
    @constructor == Traction.Rails.Model

  _updateExistingAssociation: (associationName, klass, associated) ->
    if associated instanceof klass or _.isUndefined(associated)
      @attributes[associationName] = associated
    else
      @get(associationName).reset?(associated)
      @get(associationName).set?(associated)

  _createNewAssociation: (associationName, klass, associated) ->
    if associated instanceof klass
      @attributes[associationName] = associated
    else
      @attributes[associationName] = new klass(associated)
