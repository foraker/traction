class Traction.Rendering.AppendStrategy extends Backbone.View
  initialize: (options) ->
    @setElement options.renderWithin

  call: (options = {})->
    @$el.empty()
    if options.children?
      @$el.append options.children.els()
