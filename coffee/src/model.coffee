class Traction.Model extends Backbone.Model
  _.extend(@prototype, Traction.ComputedAttributes)

  associations: {}

  constructor: ->
    super
    @_assignComputedAttributes()

  toggle: (attribute) ->
    @set attribute, !@get(attribute)

  set: (key, value, options) ->
    if typeof key == "object"
      newAttributes = _.clone key
      options       = value
    else
      newAttributes      = {}
      newAttributes[key] = value

    @_setAssociations(newAttributes, options || {})
    super(newAttributes, options)

  url: ->
    @get("url") || super

  # Private

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
