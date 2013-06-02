jasmine.SharedExamples = {}
`JST = {}`

jasmine.itShouldBehaveLike = (sharedExampleGroupName, options) ->
  if sharedExampleGroup = jasmine.SharedExamples[sharedExampleGroupName]
    sharedExampleGroup(options)
  else
    throw("Can't find shared example group '#{sharedExampleGroupName}")

jasmine.sharedExamplesFor = (sharedExampleGroupName, examples) ->
  jasmine.SharedExamples[sharedExampleGroupName] = examples

jasmine.Matchers.prototype.toBeInstanceOf = (expected) ->
  @actual instanceof expected

