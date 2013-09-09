class Traction.Rendering.PrerenderedStrategy extends Traction.Rendering.NodeStrategy
  constructor: (options) ->
    @setElement(options.renderWithin)
    super

