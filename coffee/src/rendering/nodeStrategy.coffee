class Traction.Rendering.NodeStrategy extends Backbone.View
  events:
    "click [data-emit]:not(form)": "_emit"
    "submit form[data-emit]": "_emit"

  constructor: ->
    super
    @bindings = []

  destroy: ->
    _.each @bindings, (binding) -> binding.destroy()

  call: (options = {}) ->
    @_applyBindings(options.bindTo) if options.bindTo
    @_outlet(options.children) if options.children

  # Private

  _outlet: (children) ->
    @$("script[data-outlet]").each (index, el) =>
      if name = $(el).data("outlet")
        $(el).replaceWith(children.get(name).el)
      else
        $(el).replaceWith children.els()

  _applyBindings: (binding) ->
    existingBinding.destroy() for existingBinding in @bindings

    @$("[data-bind]").each (index, el) =>
      for specification in $(el).data("bind").split(" ")
        @bindings.push Traction.Bindings.Factory(el, specification).bindTo(binding)

  _emit: (event) ->
    eventNames = event.currentTarget.getAttribute("data-emit").split(" ")
    @$el.trigger(eventName) for eventName in eventNames
