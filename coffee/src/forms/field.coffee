class Traction.Forms.Field extends Backbone.View
  labelTemplate: _.template """
    <label for="<%= options.id %>">
      <% if(options.required) { %><i>*</i><% } %> <%= options.label %>
    </label>
  """

  className: "field"

  initialize: ->
    @options = _.extend(@_defaults(), @options)
    @_bind() if @model

  setModel: (model) ->
    @_unbind()
    @model = model
    @_bind()
    @

  render: ->
    @_empty()
    @_renderLabel()
    @_renderInput()
    @_designateAsRequired() if @options.required
    @reset()
    @disable() if @disabled
    @

  renderErrors: (messages) ->
    @$el.addClass("error")
      .append("<span class=\"inline-errors\">#{messages.join(", ")}</span>")

  disable: ->
    @disabled = true
    @_input().attr("disabled", "disabled")

  isDisabled: ->
    @_input().is(":disabled")

  enable: ->
    @disabled = false
    @_input().removeAttr("disabled")

  get: ->
    @_input().val()

  set: (val) ->
    @_input().val(val)

  clear: ->
    @set("")
    @clearErrors()

  clearErrors: ->
    @$el.removeClass("error")
    @$(".inline-errors").remove()

  rerenderErrors: (messages) ->
    @clearErrors()
    @renderErrors(messages)

  reset: ->
    @set(@model.get(@options.attribute))

  commit: ->
    @model.set(@options.attribute, @get())

  applyAutoCommit: ->
    @commit() if @options.autoCommit

  # Private

  _bind: ->
    @listenTo(@model, "change:#{@options.attribute}", @reset)

  _unbind: ->
    @stopListening(@model)

  _input: ->
    @input ||= @$("input")

  _empty: ->
    @$el.empty()
    @input = null

  _renderLabel: ->
    @$el.append @labelTemplate({options: @options})

  _renderInput: ->
    @$el.append @inputTemplate({options: @options})

  _designateAsRequired: ->
    @$el.addClass("required")

  _defaults: ->
    {
      id:          @cid,
      placeholder: @options.label,
      autoCommit:  true
      required:    false
    }