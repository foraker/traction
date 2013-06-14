class Traction.Bindings.FormattedContentBinding extends Traction.Bindings.Binding
  constructor: (@el, @specification) ->
    [@property, @formatters...] = @specification.split("|")
    @formattingFunctions = _.map @formatters, (formatter) => @_callFormattingFunction(formatter)

  update: (options) ->
    @el.innerHTML = _.reduce(
      @formattingFunctions,
      ((memo, formattingFunction) -> formattingFunction(memo)),
      @model.get(@property)
    )

  # Private

  _callFormattingFunction: (formatter) ->
    [formatter, args...] = formatter.split(":")

    if formattingFunction = Traction.TemplateHelpers.Formatting[formatter]
      (content) ->  formattingFunction(content, args)
    else
      throw("Can't find formatter: #{formatter}")