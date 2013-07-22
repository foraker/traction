Traction.TemplateHelpers.Formatting = {
  downcase: (string) ->
    string.toLowerCase()

  upcase: (string) ->
    string.toUpperCase()

  append: (string, append) ->
    string + append

  nonBreaking: (string) ->
    string || "&nbsp;"
}