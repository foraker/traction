class Traction.Rails.Collection extends Backbone.Collection
  model: Traction.Rails.Model

  build: (attributes = {}) ->
    model = new @model(attributes)
    model.urlRoot = @url
    model
