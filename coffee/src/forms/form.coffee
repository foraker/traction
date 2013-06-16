class Traction.Forms.Form
  addInput: (options) ->
    options = _.extend(@_defaults(options), options)
    (name = options.name) and delete options.name
    (klass = options.type) and delete options.type

    @children.add name, new klass(options)

  serialize: ->
    serialized = {}
    @children.each (input) -> serialized[input.attribute] = input.val()
    serialized

  renderErrors: ->
    for attribute, input of @children
      if errors = @model.errors[attribute]
        input.rerenderErrors(errors)
      else
        input.clearErrors()

  clearErrors: ->
    @children.each (input) -> input.clearErrors?()

  clear: ->
    @children.each (input) -> input.clear?()

  commit: ->
    @children.each (input) -> input.commit?()

  reset: ->
    @children.each (input) -> input.reset?()

  # Private

  _defaults: (options) ->
    {
      name: options.attribute
      label: @_generateLabel(options.attribute)
      type: Traction.Forms.TextField
      model: @model
    }

  _generateLabel: (attribute) ->
    _.str.capitalize(_.str.humanize(attribute))

class Traction.Forms.FormView extends Traction.View
  @extends(Traction.Forms.Form)