Traction.TemplateHelpers.Formatting = {
  downcase: (string) ->
    string.toLowerCase()

  upcase: (string) ->
    string.toUpperCase()

  append: (string, append) ->
    string + append

  prepend: (string, append) ->
    string + append

  nonBreaking: (string) ->
    if string then string.replace(/\s/g, "&nbsp;") else "&nbsp;"

  datetime: (datetime, format = "L h:mm a") ->
    datetime = moment(datetime || null)
    if datetime then datetime.format(format) else ""

  currency: (decimal, symbol = "$") ->
    return "" unless decimal
    symbol + _.string.numberFormat(parseFloat(decimal), 2)
}
