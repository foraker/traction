class Traction.Rendering.AppendStrategy extends Backbone.View
  initialize: ->
    @setElement @options.renderWithin

  render: ->
    @$el.empty()

  outlet: (children) ->
    @$el.append children.els()