class Traction.Forms.Field extends Backbone.View
  labelTemplate: _.template """
    <label for="<%= options.id %>">
      <% if(options.required) { %><i class='required-icon'>*</i><% } %> <%= options.label %>
    </label>
  """

  className: -> Traction.config.fieldClassName

  initialize: (options) ->
    @options = _.extend(
      @_defaults()
      placeholder: options.label || ''
      options
    )

    @classConfig = {
      errorWrapper: Traction.config.fieldWithErrorsClass
      inlineErrors: Traction.config.inlineErrorsClass
    }

    @_bind() if @model

  setModel: (model) ->
    @_unbind()
    @model = model
    @_bind()
    @

  render: ->
    @_empty()
    @_renderLabel() unless @options.label is false
    @_renderInput()
    @_designateAsRequired() if @options.required
    @reset()
    @disable() if @options.disabled
    @

  renderErrors: (messages) ->
    @$el.addClass(@classConfig.errorWrapper)
      .append("<span class=\"#{@classConfig.inlineErrors}\">#{messages.join(", ")}</span>")

  disable: ->
    @options.disabled = true
    @_input().attr("disabled", "disabled")

  isDisabled: ->
    @_input().is(":disabled")

  enable: ->
    @options.disabled = false
    @_input().removeAttr("disabled")

  get: ->
    @_input().val()

  set: (val) ->
    @_input().val(val)

  clear: ->
    @set("")
    @clearErrors()

  clearErrors: ->
    @$el.removeClass(@classConfig.errorWrapper)
    @$(".#{@classConfig.inlineErrors}").remove()

  rerenderErrors: (messages) ->
    @clearErrors()
    @renderErrors(messages)

  reset: ->
    @set(@model.get(@options.attribute))

  commit: (options = {}) ->
    @model.set(@options.attribute, @get())
    @trigger("commit", @model) unless options?.silent

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

  _defaults: (options) ->
    {
      id:          @cid,
      autoCommit:  true
      required:    false
    }
