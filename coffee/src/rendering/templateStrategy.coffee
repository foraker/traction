class Traction.Rendering.TemplateStrategy extends Traction.Rendering.NodeStrategy
  constructor: (options) ->
    @setElement(options.renderWithin)
    @template = @findTemplate(options.template)
    super

  findTemplate: (name) ->
    templatePath = "templates"
    JST["#{templatePath}/#{name}"] || throw("Missing template: #{name}")

  call: (options = {}) ->
    @$el.empty()
    @el.innerHTML = @_template()
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