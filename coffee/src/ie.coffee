Traction.IE = {
  supportsInnerHTMLForTag: (tagName) ->
    tagName.toUpperCase() in ["COL", "COLGROUP", "FRAMESET", "HEAD", "HTML", "STYLE", "TABLE", "TBODY", "TFOOT", "THEAD", "TITLE", "TR"]
}