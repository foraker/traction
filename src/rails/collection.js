// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Rails.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Traction.Rails.Model;

    Collection.prototype.build = function(attributes) {
      var model;
      if (attributes == null) {
        attributes = {};
      }
      model = new this.model(attributes);
      model.urlRoot = this.url;
      return model;
    };

    return Collection;

  })(Backbone.Collection);

}).call(this);
