// Generated by CoffeeScript 1.3.3
(function() {

  jasmine.SharedExamples = {};

  JST = {};


  jasmine.itShouldBehaveLike = function(sharedExampleGroupName, options) {
    var sharedExampleGroup;
    if (sharedExampleGroup = jasmine.SharedExamples[sharedExampleGroupName]) {
      return sharedExampleGroup(options);
    } else {
      throw "Can't find shared example group '" + sharedExamplesName;
    }
  };

  jasmine.sharedExamplesFor = function(sharedExampleGroupName, examples) {
    return jasmine.SharedExamples[sharedExampleGroupName] = examples;
  };

}).call(this);
