Traction.Bindings.Factory = (el, specification) ->
  if specification.indexOf(":") > 0
    new Traction.Bindings.AttributeBinding(el, specification)
  else if specification.indexOf("|") > 0
    new Traction.Bindings.FormattedPropertyBinding(el, specification)
  else
    new Traction.Bindings.PropertyBinding(el, specification)
