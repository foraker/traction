// Generated by CoffeeScript 1.8.0
(function() {
  Traction.TemplateHelpers.Formatting = {
    downcase: function(string) {
      return string.toLowerCase();
    },
    upcase: function(string) {
      return string.toUpperCase();
    },
    append: function(string, append) {
      return string + append;
    },
    nonBreaking: function(string) {
      if (string) {
        return string.replace(/\s/g, "&nbsp;");
      } else {
        return "&nbsp;";
      }
    },
    datetime: function(datetime, format) {
      if (format == null) {
        format = "L h:mm a";
      }
      datetime = moment(datetime || null);
      if (datetime) {
        return datetime.format(format);
      } else {
        return "";
      }
    },
    currency: function(decimal, symbol) {
      if (symbol == null) {
        symbol = "$";
      }
      if (!decimal) {
        return "";
      }
      return symbol + _.string.numberFormat(parseFloat(decimal), 2);
    }
  };

}).call(this);
