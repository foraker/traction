class Traction.Forms.TextField extends Traction.Forms.Field
  inputTemplate: _.template """
    <input id="<%= options.id %>" type="text" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """

  events:
    "change input": "applyAutoCommit"
