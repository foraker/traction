class Traction.Bindings.ContentBinding extends Traction.Bindings.Binding
  constructor: (@el, @specification) ->
    @property = @specification

  update: (options) ->
    @el.innerHTML = @model.get(@property) || ""
