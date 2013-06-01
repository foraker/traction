jasmine.SharedExamples = {}
`JST = {}`

jasmine.itShouldBehaveLike = (sharedExampleGroupName, options) ->
  if sharedExampleGroup = jasmine.SharedExamples[sharedExampleGroupName]
    sharedExampleGroup(options)
  else
    throw("Can't find shared example group '#{sharedExamplesName}")

jasmine.sharedExamplesFor = (sharedExampleGroupName, examples) ->
  jasmine.SharedExamples[sharedExampleGroupName] = examples

