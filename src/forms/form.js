// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Form = (function() {
    function Form() {}

    Form.prototype.addInput = function(options) {
      var klass, name;
      options = _.extend(this._defaults(options), options);
      (name = options.name) && delete options.name;
      (klass = options.type) && delete options.type;
      return this.children.add(name, new klass(options));
    };

    Form.prototype.addInputs = function(schema) {
      var attribute, options, _results;
      _results = [];
      for (attribute in schema) {
        options = schema[attribute];
        options.attribute = attribute;
        _results.push(this.addInput(options));
      }
      return _results;
    };

    Form.prototype.serialize = function() {
      var serialized;
      serialized = {};
      this.children.each(function(input) {
        return serialized[input.attribute] = input.val();
      });
      return serialized;
    };

    Form.prototype.renderErrors = function() {
      return this.children.each((function(_this) {
        return function(child, attribute) {
          var errors, _ref;
          if (errors = (_ref = _this.model.errors) != null ? _ref[attribute] : void 0) {
            return typeof child.rerenderErrors === "function" ? child.rerenderErrors(errors) : void 0;
          } else {
            return typeof child.clearErrors === "function" ? child.clearErrors() : void 0;
          }
        };
      })(this));
    };

    Form.prototype.clearErrors = function() {
      return this.children.each(function(input) {
        return typeof input.clearErrors === "function" ? input.clearErrors() : void 0;
      });
    };

    Form.prototype.clear = function() {
      return this.children.each(function(input) {
        return typeof input.clear === "function" ? input.clear() : void 0;
      });
    };

    Form.prototype.commit = function() {
      return this.children.each(function(input) {
        return typeof input.commit === "function" ? input.commit() : void 0;
      });
    };

    Form.prototype.reset = function() {
      return this.children.each(function(input) {
        return typeof input.reset === "function" ? input.reset() : void 0;
      });
    };

    Form.prototype._defaults = function(options) {
      return {
        name: options.attribute,
        label: this._generateLabel(options.attribute),
        type: Traction.Forms.TextField,
        model: this.model
      };
    };

    Form.prototype._generateLabel = function(attribute) {
      return _.str.capitalize(_.str.humanize(attribute));
    };

    return Form;

  })();

  Traction.Forms.FormView = (function(_super) {
    __extends(FormView, _super);

    function FormView() {
      return FormView.__super__.constructor.apply(this, arguments);
    }

    FormView["extends"](Traction.Forms.Form);

    return FormView;

  })(Traction.View);

}).call(this);
