class Traction.Forms.Checkbox extends Traction.Forms.Field
  inputTemplate: _.template """
    <input type="checkbox" id="<%= options.id %>" name="<%= options.name %>">
  """

  events:
    "change input": "applyAutoCommit"

  get: ->
    if @_input().is(":checked") then @options.checkedValue else @options.uncheckedValue

  set: (val) ->
    @_input().prop("checked", @_checkedTest(val))

  clear: ->
    @set(@options.uncheckedValue)
    @clearErrors()

  # Private

  _defaults: ->
    _.extend(super, {
      checkedValue: true,
      uncheckedValue: null
      checkedTest: (val) -> val == @options.checkedValue
    })

  _checkedTest: (val) ->
    @options.checkedTest.call(@, val)
