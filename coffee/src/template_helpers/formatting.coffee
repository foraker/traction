Traction.TemplateHelpers.Formatting = {
  downcase: (string) ->
    string.toLowerCase()

  upcase: (string) ->
    string.toUpperCase()

  append: (string, append) ->
    string + append

  nonBreaking: (string) ->
    if string then string.replace(/\s/g, "&nbsp;") else "&nbsp;"
}