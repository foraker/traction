class Traction.Forms.Select extends Traction.Forms.Field
  inputTemplate: _.template """
    <select id="input-<%= options.id %>" name="<%= options.name %>">
      <% if(options.includeBlank) { %><option><%= options.includeBlank %></option><% } %>
      <% _.each(options.options, function(value, label){ %>
        <option value="<%= value %>"><%= label %></option>
      <% }) %>
    </select>
  """

  events:
    "change select": "applyAutoCommit"

  clear: ->
    @_input().val(@_firstOptionValue())
    @clearErrors()

  # Private

  _firstOptionValue: ->
    @$("option:first").attr("value")

  _input: ->
    @input ||= @$("select")

  _renderInput: ->
    @$el.append @inputTemplate({options: @options})
