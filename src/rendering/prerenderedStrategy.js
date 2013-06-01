// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rendering.PrerenderedStrategy = (function(_super) {

    __extends(PrerenderedStrategy, _super);

    function PrerenderedStrategy(options) {
      this.setElement(options.renderWithin);
      PrerenderedStrategy.__super__.constructor.apply(this, arguments);
    }

    PrerenderedStrategy.prototype.call = function(options) {
      if (options == null) {
        options = {};
      }
      this._applyBindings(options.bindTo);
      return this._outlet(options.children);
    };

    return PrerenderedStrategy;

  })(Traction.Rendering.NodeStrategy);

}).call(this);
