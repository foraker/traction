class Traction.Rendering.PrerenderedStrategy extends Traction.Rendering.NodeStrategy
  constructor: (options) ->
    @setElement(options.renderWithin)
    super

  call: (options = {}) ->
    @_applyBindings(options.bindTo)
    @_outlet(options.children)
