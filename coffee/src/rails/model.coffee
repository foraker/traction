class Traction.Rails.Model extends Traction.Model
  associations: {}

  initialize: ->
    @paramRoot ||= @_inferParamRoot() unless @_isBaseClass()
    @on("error", @parseErrors, @)

  set: (key, value, options) ->
    if typeof key == "object"
      newAttributes = _.clone key
      options       = value
    else
      newAttributes      = {}
      newAttributes[key] = value

    @_setAssociations(newAttributes, options || {})
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

  _setAssociations: (attributes, options) ->
    for associationName, klass of @associations
      newValue = attributes[associationName]

      if previousValue = @get(associationName)
        continue unless associationName of attributes
        isDirty = @_updateAssociation(klass, associationName, newValue)
        if isDirty and !options.silent
          @trigger("change:#{associationName}", previousValue)
      else
        @_createAssociation(klass, associationName, newValue)

      delete attributes[associationName]

      if urlRoot = attributes["#{associationName}_url"]
        @get(associationName).url = urlRoot

  _createAssociation: (klass, name, newValue) ->
    if newValue instanceof klass
      @attributes[name] = newValue
    else
      newValue = new klass(newValue)
      @attributes[name] = newValue

  _updateAssociation: (klass, name, newValue) ->
    isDirty = false
    dirtyCheck = (cb) =>
      callback = -> isDirty = true
      @get(name).on("change add remove", callback)
      cb()
      @get(name).off("change add remove", callback)

    if newValue instanceof klass or !newValue
      if @_isCollection(@get(name)) and @_isCollection(newValue)
        dirtyCheck => @attributes[name].set(newValue.models)
      else
        isDirty = newValue != @get(name)
        @attributes[name] = newValue
    else
      dirtyCheck => @get(name).set(newValue)

    return isDirty

  _isCollection: (collection) ->
    collection?.models

