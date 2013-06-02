class Traction.Bindings.AttributeBinding extends Traction.Bindings.Binding
  constructor: (@el, @specification) ->
    [@attribute, @property, @trueValue, @falseValue] = @specification.split(":")

  update: (options) ->
    if @_hasBooleanSpecification() then @_booleanUpdate() else @_directUpdate()

  # Private

  _hasBooleanSpecification: ->
    @trueValue?

  _booleanUpdate: ->
    if @_currentValue()
      @_addValueToAttribute(@trueValue)
      @_removeValueFromAttribute(@falseValue) if @falseValue
    else
      @_removeValueFromAttribute(@trueValue)
      @_addValueToAttribute(@falseValue) if @falseValue

  _directUpdate: ->
    @_removeValueFromAttribute(@previousValue)
    @_addValueToAttribute(@_currentValue())
    @previousValue = @_currentValue()

  _addValueToAttribute: (value) ->
    @_setAttribute(_.union(@_existingValues(), [value]))

  _removeValueFromAttribute: (value) ->
    @_setAttribute(_.without(@_existingValues(), value))

  _existingValues: ->
    ($(@el).attr(@attribute) || "").split(" ")

  _setAttribute: (values) ->
    $(@el).attr(@attribute, _.string.clean(values.join(" ")))

  _currentValue: ->
    @model.get(@property)
