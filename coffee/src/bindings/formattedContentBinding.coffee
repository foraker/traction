class Traction.Bindings.FormattedContentBinding extends Traction.Bindings.Binding
  constructor: (@el, @specification) ->
    [@property, @formatters...] = @specification.split("|")
    @formattingFunctions = _.map @formatters, (formatter) => @_buildFormattingFunction(formatter)

  update: (options) ->
    @el.innerHTML = _.reduce(
      @formattingFunctions,
      ((memo, formattingFunction) -> formattingFunction(memo)),
      @model.get(@property)
    )

  # Private

  _buildFormattingFunction: (formatter) ->
    [formatter, args...] = formatter.split(":")
    formattingFunction = Traction.TemplateHelpers.Formatting[formatter]

    (string) ->
      formattingFunction.apply(string, args)
