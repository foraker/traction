class Traction.Forms.TextArea extends Traction.Forms.Field
  labelTemplate: _.template """
    <label for="<%= options.id %>">
      <% if(options.required) { %><i>*</i><% } %> <%= options.label %>
    </label>
  """

  inputTemplate: _.template """
    <textarea id="<%= options.id %>" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """

  events:
    "change textarea": "applyAutoCommit"

  # Private

  _input: ->
    @input ||= @$("textarea")
