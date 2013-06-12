class Traction.Forms.TextField extends Traction.Forms.Field
  labelTemplate: _.template """
    <label for="<%= options.id %>">
      <% if(options.required) { %><i>*</i><% } %> <%= options.label %>
    </label>
  """

  inputTemplate: _.template """
    <input id="<%= options.id %>" type="text" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """

  events:
    "change input": "applyAutoCommit"
