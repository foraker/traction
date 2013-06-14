class Traction.View extends Backbone.View
  constructor: (options) ->
    @children = new Traction.ViewCollection()
    super
    @renderer = @buildRenderer()

  buildRenderer: ->
    if @template
      new Traction.Rendering.TemplateStrategy({source: @template, renderWithin: @el})
    else if @options.el
      new Traction.Rendering.PrerenderedStrategy({renderWithin: @el})
    else
      new Traction.Rendering.AppendStrategy({renderWithin: @el})

  proxyEvent: (target, event, newEvent) ->
    callback = =>
      args = Array.prototype.slice.call(arguments)
      args.unshift(newEvent || event)
      @trigger.apply(@, args)

    @listenTo target, event, callback

  render: ->
    @children.render()
    @renderer.call(bindTo: @model, children: @children)
    @

  remove: ->
    super
    @renderer.destroy?()
    @children.each (child) -> child.remove()

Traction.View.extend = (klass) -> _.extend(@prototype, klass.prototype)