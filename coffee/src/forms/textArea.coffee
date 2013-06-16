class Traction.Forms.TextArea extends Traction.Forms.Field
  inputTemplate: _.template """
    <textarea id="<%= options.id %>" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """

  events:
    "change textarea": "applyAutoCommit"

  # Private

  _input: ->
    @input ||= @$("textarea")
