Traction.Bindings.Factory = (el, specification) ->
  if specification.indexOf("|") > 0
    new Traction.Bindings.FormattedContentBinding(el, specification)
  else if specification.indexOf(":") > 0
    new Traction.Bindings.AttributeBinding(el, specification)
  else
    new Traction.Bindings.ContentBinding(el, specification)
