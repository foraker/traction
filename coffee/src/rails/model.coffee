class Traction.Rails.Model extends Traction.Model
  initialize: ->
    @paramRoot ||= @_inferParamRoot() unless @_isBaseClass()
    @on("error", @parseErrors, @)

  parseErrors: (self, response) ->
    @errors = $.parseJSON(response.responseText)?.errors

  patch: ->
    if @paramRoot
      attrs = {}
      attrs[@paramRoot] = @changedAttributes()
    else
      attrs = @changedAttributes()

    @sync('update', @, attrs: attrs)

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
