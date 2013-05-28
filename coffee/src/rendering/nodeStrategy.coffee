class Traction.Rendering.NodeStrategy extends Backbone.View
  # outlet: (children) ->
  #   @$("output[data-outlet]").each (index, el) =>
  #     if name = $(el).data("outlet")
  #       $(el).replaceWith(children[name].el)
  #     else
  #       childEls = _.map children, (child, name) -> child.el
  #       $(el).replaceWith childEls
  #
  # applyBindings: (model) ->
  #   @$("[data-bind]").each (index, el) =>
  #     # for specification in $(el).data("bind").split(" ")
  #       # DiamondFreight.BindingFactory.build(el, specification).bindTo(model)
