// Generated by CoffeeScript 1.9.3
(function() {
  Traction.Bindings.Factory = function(el, specification) {
    if (specification.indexOf("|") > 0) {
      return new Traction.Bindings.FormattedContentBinding(el, specification);
    } else if (specification.indexOf(":") > 0) {
      return new Traction.Bindings.AttributeBinding(el, specification);
    } else {
      return new Traction.Bindings.ContentBinding(el, specification);
    }
  };

}).call(this);
