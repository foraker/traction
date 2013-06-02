class Traction.Rendering.NodeStrategy extends Backbone.View
  events:
    "click :not(form)[data-emit]": "_emit"
    "submit form[data-emit]": "_emit"

  constructor: ->
    super
    @bindings = []

  destroy: ->
    _.each @bindings, (binding) -> binding.destroy()

  # Private

  _outlet: (children) ->
    @$("script[data-outlet]").each (index, el) =>
      if name = $(el).data("outlet")
        $(el).replaceWith(children[name].el)
      else
        childEls = _.map children, (child, name) -> child.el
        $(el).replaceWith childEls

  _applyBindings: (binding) ->
    @$("[data-bind]").each (index, el) =>
      for specification in $(el).data("bind").split(" ")
        @bindings.push Traction.Bindings.Factory(el, specification).bindTo(binding)

  _emit: (event) ->
    eventNames = event.currentTarget.getAttribute("data-emit").split(" ")
    @$el.trigger(eventName) for eventName in eventNames
