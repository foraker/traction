class Traction.Forms.TextArea extends Traction.Forms.Field
  inputTemplate: _.template """
    <textarea id="<%= options.id %>" name="<%= options.name %>" placeholder="<%= options.placeholder %>"/>
  """

  inputSelector: "textarea"

  events:
    "change textarea": "applyAutoCommit"

