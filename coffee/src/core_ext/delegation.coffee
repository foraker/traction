Object.prototype.delegate = () ->
  args = Array.prototype.slice.call(arguments);
  [methods, options] = [args[0..(args.length - 2)], args[(args.length - 1)]]

  for method in methods
    delegation = (method, delegatedMethod) ->
      @[method] = ->
        target    = @[options.to]
        target    = if _.isFunction(target) then target.apply(@) else target
        attribute = target[delegatedMethod]
        if _.isFunction(attribute) then attribute.apply(target, arguments) else attribute

    if options.prefix
      prefixedMethod = options.prefix + method.substr(0, 1).toUpperCase() + method.substr(1)

    delegation.call(@prototype, prefixedMethod || method, method)
