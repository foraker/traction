// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Bindings.ContentBinding = (function(_super) {
    __extends(ContentBinding, _super);

    function ContentBinding(el, specification) {
      this.el = el;
      this.specification = specification;
      this.property = this.specification;
    }

    ContentBinding.prototype.update = function(options) {
      return this.el.innerHTML = this.model.get(this.property) || "";
    };

    return ContentBinding;

  })(Traction.Bindings.Binding);

}).call(this);
