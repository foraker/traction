class Traction.View extends Backbone.View
  constructor: (options) ->
    @_initializeCallbacks()

    @invokeCallbacks("before:initialize")
    @children = new Traction.ViewCollection()
    options.model = @buildDecorator(options.model) if @decorator
    super
    @renderer = @buildRenderer(options || {})
    @invokeCallbacks("after:initialize")

  setElement: ->
    super
    @renderer = @buildRenderer(el: @el)

  buildRenderer: (options) ->
    if @template
      new Traction.Rendering.TemplateStrategy({template: @template, renderWithin: @el})
    else if options.el
      new Traction.Rendering.PrerenderedStrategy({renderWithin: @el})
    else
      new Traction.Rendering.AppendStrategy({renderWithin: @el})

  buildDecorator: (decorated) ->
    if _.isFunction(@decorator)
      new @decorator(decorated)
    else
      klass = Traction.Decorator.extend(@decorator)
      new klass(decorated)

  proxyEvent: (target, event, newEvent) ->
    callback = =>
      args = Array.prototype.slice.call(arguments)
      args.unshift(newEvent || event)
      @trigger.apply(@, args)

    @listenTo target, event, callback

  render: ->
    @invokeCallbacks("before:render")
    @children.render()
    @renderer.call(bindTo: @model, children: @children)
    @invokeCallbacks("after:render")
    @

  delegateEvents: ->
    super
    @children.each (child) -> child.delegateEvents()

  remove: ->
    @invokeCallbacks("before:remove")
    super
    @renderer.destroy?()
    @children.each (child) -> child.remove()
    @invokeCallbacks("after:remove")

  invokeCallbacks: (event) ->
    for callback in @_callbacks[event]
      @[callback]()

  # Private

  _initializeCallbacks: ->
    @_callbacks = {
      "before:initialize": []
      "after:initialize": []
      "before:render":     []
      "after:render":     []
      "before:remove":     []
      "after:remove":     []
    }

    for event, callbacks of (@callbacks || {})
      @_callbacks[event] = callbacks.split(" ")

Traction.View.mixin = (object) ->
  _.extend(@prototype, object)

Traction.View.extends = (klass) ->
 @mixin(klass.prototype)
