class Traction.Rendering.TemplateStrategy extends Traction.Rendering.NodeStrategy
  defaultTemplateFinder: (name) ->
    path = "#{Traction.config.templatePath}/#{name}"
    JST[path]

  constructor: (options) ->
    @setElement(options.renderWithin)
    @template = @findTemplate(options.template)
    super

  findTemplate: (name) ->
    (Traction.config.findTemplate || @defaultTemplateFinder)(name) || throw("Missing template: #{name}")

  call: (options = {}) ->
    @insert @_template(context: options.bindTo)
    super(options)

  buildOutlet: (outletName)->
    outletName ||= ""
    "<script data-outlet='#{outletName}'></script>"

  insert: (content) ->
    if Traction.config.supportIE and Traction.IE.supportsInnerHTMLForTag(@el.tagName)
      # Does not supported nested children
      @$el.html(content)
    else
      @el.innerHTML = content

  # Private

  _template: (options) ->
    @template _.extend(options || {}, @_defaultTemplateOptions())

  _defaultTemplateOptions: ->
    _.extend {outlet: @buildOutlet}, Traction.config.templateHelpers
