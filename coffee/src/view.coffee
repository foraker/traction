class Traction.View extends Backbone.View
  constructor: (options) ->
    @children = new Traction.ViewCollection()
    super
    @renderer = @buildRenderer()
    @model    = @buildDecorator(options.model) if @decorator

  buildRenderer: ->
    if @template
      new Traction.Rendering.TemplateStrategy({template: @template, renderWithin: @el})
    else if @options.el
      new Traction.Rendering.PrerenderedStrategy({renderWithin: @el})
    else
      new Traction.Rendering.AppendStrategy({renderWithin: @el})

  buildDecorator: (model) ->
    if _.isFunction(@decorator)
      new @decorator(model)
    else
      klass = Traction.Decorator.extend(@decorator)
      new klass(model)

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

Traction.View.mixin = (object) ->
  _.extend(@prototype, object)

Traction.View.extends = (klass) ->
 @mixin(klass.prototype)

