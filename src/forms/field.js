// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Traction.Forms.Field = (function(_super) {
    __extends(Field, _super);

    function Field() {
      return Field.__super__.constructor.apply(this, arguments);
    }

    Field.prototype.labelTemplate = _.template("<label for=\"<%= options.id %>\">\n  <% if(options.required) { %><i>*</i><% } %> <%= options.label %>\n</label>");

    Field.prototype.className = "field";

    Field.prototype.initialize = function() {
      this.options = _.extend(this._defaults(), this.options);
      if (this.model) {
        return this._bind();
      }
    };

    Field.prototype.setModel = function(model) {
      this._unbind();
      this.model = model;
      this._bind();
      return this;
    };

    Field.prototype.render = function() {
      this._empty();
      this._renderLabel();
      this._renderInput();
      if (this.options.required) {
        this._designateAsRequired();
      }
      this.reset();
      if (this.disabled) {
        this.disable();
      }
      return this;
    };

    Field.prototype.renderErrors = function(messages) {
      return this.$el.addClass("error").append("<span class=\"inline-errors\">" + (messages.join(", ")) + "</span>");
    };

    Field.prototype.disable = function() {
      this.disabled = true;
      return this._input().attr("disabled", "disabled");
    };

    Field.prototype.isDisabled = function() {
      return this._input().is(":disabled");
    };

    Field.prototype.enable = function() {
      this.disabled = false;
      return this._input().removeAttr("disabled");
    };

    Field.prototype.get = function() {
      return this._input().val();
    };

    Field.prototype.set = function(val) {
      return this._input().val(val);
    };

    Field.prototype.clear = function() {
      this.set("");
      return this.clearErrors();
    };

    Field.prototype.clearErrors = function() {
      this.$el.removeClass("error");
      return this.$(".inline-errors").remove();
    };

    Field.prototype.rerenderErrors = function(messages) {
      this.clearErrors();
      return this.renderErrors(messages);
    };

    Field.prototype.reset = function() {
      return this.set(this.model.get(this.options.attribute));
    };

    Field.prototype.commit = function() {
      return this.model.set(this.options.attribute, this.get());
    };

    Field.prototype.applyAutoCommit = function() {
      if (this.options.autoCommit) {
        return this.commit();
      }
    };

    Field.prototype._bind = function() {
      return this.listenTo(this.model, "change:" + this.options.attribute, this.reset);
    };

    Field.prototype._unbind = function() {
      return this.stopListening(this.model);
    };

    Field.prototype._input = function() {
      return this.input || (this.input = this.$("input"));
    };

    Field.prototype._empty = function() {
      this.$el.empty();
      return this.input = null;
    };

    Field.prototype._renderLabel = function() {
      return this.$el.append(this.labelTemplate({
        options: this.options
      }));
    };

    Field.prototype._renderInput = function() {
      return this.$el.append(this.inputTemplate({
        options: this.options
      }));
    };

    Field.prototype._designateAsRequired = function() {
      return this.$el.addClass("required");
    };

    Field.prototype._defaults = function() {
      return {
        id: this.cid,
        placeholder: this.options.label,
        autoCommit: true,
        required: false
      };
    };

    return Field;

  })(Backbone.View);

}).call(this);
