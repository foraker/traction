class Traction.Rails.Collection extends Backbone.Collection
  model: Traction.Rails.Model

  build: ->
    model = new @model
    model.urlRoot = @url
    model
