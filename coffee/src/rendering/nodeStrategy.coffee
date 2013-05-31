class Traction.Rendering.NodeStrategy extends Backbone.View

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
        Traction.Bindings.Factory(el, specification).bindTo(binding)
