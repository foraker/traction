class Traction.Forms.TextField extends Traction.Forms.Field
  labelTemplate: _.template """
    <label>
      <% if(options.required) { %><i>*</i><% } %> <%= options.label %>
    </label>
  """

  inputTemplate: _.template """
    <input type="text" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """
