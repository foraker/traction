class Traction.Bindings.Binding
  bindTo: (model) ->
    @model = model
    @model.on("change:#{@property}", @update, @)
    @update()