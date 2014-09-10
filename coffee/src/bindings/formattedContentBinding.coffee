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
    [formatter, args...] = @_extractArgs(formatter)

    if formattingFunction = @_formatters()[formatter]
      (content) ->
        formattingFunction.apply(@, [content].concat(args))
    else
      throw("Can't find formatter: #{formatter}")

  _extractArgs: (formatter) ->
    reversed = _.str.reverse(formatter)
      .split(/:(?!\\)/)
      .reverse()

    _.map reversed, (substring) ->
      _.str.reverse(substring).replace(/\\:/g, ':')

  _formatters: ->
    _.extend(Traction.TemplateHelpers.Formatting, Traction.config.formatters)
