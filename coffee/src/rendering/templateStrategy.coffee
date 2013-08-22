class Traction.Rendering.TemplateStrategy extends Traction.Rendering.NodeStrategy
  defaultTemplateFinder: (name) ->
    path = "#{Traction.config.templatePath}/#{name}"
    JST[path] || throw("Missing template: #{path}")

  constructor: (options) ->
    @setElement(options.renderWithin)
    @template = @findTemplate(options.template)
    super

  findTemplate: (name) ->
    (Traction.config.findTemplate || @defaultTemplateFinder)(name) || throw("Missing template: #{path}")

  call: (options = {}) ->
    @el.innerHTML = @_template(context: options.bindTo)
    @_applyBindings(options.bindTo)
    @_outlet(options.children)

  buildOutlet: (outletName)->
    outletName ||= ""
    "<script data-outlet='#{outletName}'></script>"

  # Private

  _template: (options) ->
    @template _.extend(options || {}, @_defaultTemplateOptions())

  _defaultTemplateOptions: ->
    {outlet: @buildOutlet}
