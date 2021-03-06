// Generated by CoffeeScript 1.9.3
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Traction.Forms.Field = (function(superClass) {
    extend(Field, superClass);

    function Field() {
      return Field.__super__.constructor.apply(this, arguments);
    }

    Field.prototype.labelTemplate = _.template("<label for=\"<%= options.id %>\">\n  <% if(options.required) { %><i class='required-icon'>*</i><% } %> <%= options.label %>\n</label>");

    Field.prototype.inputSelector = "input";

    Field.prototype.className = function() {
      return Traction.config.fieldClassName;
    };

    Field.prototype.initialize = function(options) {
      this.options = _.extend(this._defaults(), {
        placeholder: options.label || ''
      }, options);
      this.classConfig = {
        errorWrapper: Traction.config.fieldWithErrorsClass,
        inlineErrors: Traction.config.inlineErrorsClass
      };
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
      if (this.options.label !== false) {
        this._renderLabel();
      }
      this._renderInput();
      if (this.options.required) {
        this._designateAsRequired();
      }
      this.reset();
      if (this.options.disabled) {
        this.disable();
      }
      return this;
    };

    Field.prototype.renderErrors = function(messages) {
      return this.$el.addClass(this.classConfig.errorWrapper).append("<span class=\"" + this.classConfig.inlineErrors + "\">" + (messages.join(", ")) + "</span>");
    };

    Field.prototype.disable = function() {
      this.options.disabled = true;
      return this._input().attr("disabled", "disabled");
    };

    Field.prototype.isDisabled = function() {
      return this._input().is(":disabled");
    };

    Field.prototype.enable = function() {
      this.options.disabled = false;
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
      this.$el.removeClass(this.classConfig.errorWrapper);
      return this.$("." + this.classConfig.inlineErrors).remove();
    };

    Field.prototype.rerenderErrors = function(messages) {
      this.clearErrors();
      return this.renderErrors(messages);
    };

    Field.prototype.reset = function() {
      return this.set(this.model.get(this.options.attribute));
    };

    Field.prototype.commit = function(options) {
      if (options == null) {
        options = {};
      }
      this.model.set(this.options.attribute, this.get());
      if (!(options != null ? options.silent : void 0)) {
        return this.trigger("commit", this.model);
      }
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
      if (this.options.cache) {
        return this.input || (this.input = this.$(this.inputSelector));
      } else {
        return this.$(this.inputSelector);
      }
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

    Field.prototype._defaults = function(options) {
      return {
        id: this.cid,
        autoCommit: true,
        required: false,
        cache: true
      };
    };

    return Field;

  })(Backbone.View);

}).call(this);
