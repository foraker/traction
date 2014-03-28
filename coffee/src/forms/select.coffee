class Traction.Forms.Select extends Traction.Forms.Field
  inputTemplate: _.template """
    <select id="<%= options.id %>" name="<%= options.name %>" <%= options.multiple %> >
      <% if(options.includeBlank) { %><option value=""><%= options.includeBlank %></option><% } %>
      <% _.each(options.options, function(value, label){ %>
        <option value="<%= value %>"><%= label %></option>
      <% }) %>
    </select>
  """

  events:
    "change select": "applyAutoCommit"

  initialize: (options = {}) ->
    options.multiple = if options.multiple then "multiple" else ""
    super

  clear: ->
    @_input().val(@_firstOptionValue())
    @clearErrors()

  setOptions: (options) ->
    @options.options = options
    @render()

  # Private

  _firstOptionValue: ->
    @$("option:first").attr("value")

  _input: ->
    @input ||= @$("select")

  _renderInput: ->
    @$el.append @inputTemplate({options: @options})
