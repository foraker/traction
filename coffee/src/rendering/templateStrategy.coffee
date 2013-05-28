class Traction.Rendering.TemplateStrategy extends Traction.Rendering.NodeStrategy
  # templatePath: "templates"
  # source: ""
  #
  # constructor: (options) ->
  #   @setElement(options.renderWithin)
  #   @source = JST["#{@templatePath}/#{options.source}"]
  #   super
  #
  # render: (options) ->
  #   @$el.empty()
  #   @template.applyBindings(@model)
  #   @$el.append @template(options)
  #
  #
  # template: (options) ->
  #   @source(
  #     _.extend(options || {}, {
  #       context: @context
  #       # helper: DiamondFreight.TemplateHelper
  #       outlet: @_constructOutlet
  #     })
  #   )
  #
  # # Private
  #
  # _constructOutlet: (outletName)->
  #   outletName ||= ""
  #   "<output data-outlet='#{outletName}'></output>"
