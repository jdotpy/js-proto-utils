Object.prototype.super = function(f, attr, noop=true) {
  // Default to the function's name for the attribute that it
  // is (and presumably its super) is accessed by
  if (!attr) {
    attr = f.name;
  }

  //const parent = this;
  let chain = [];
  let superF = null;
  let found = false;
  let current = this;
  while (true) {
    const matches = current[attr] === f;
    /*
     * If this obj's attr does not refer to our function f but one
     * has previously then we know that the previous obj was the one
     * that originated the reference rather than inherited it.
     */
    if (!matches && found) {
      superF = current[attr];
      break;
    }
    /* Track whether or not we've found an object yet that refers
     * to our function `f`
     */
    if (matches) {
      found = true;
    }

    const proto = Object.getPrototypeOf(current);
    if (proto === null || chain.includes(proto)) {
      break; 
    }
    chain.push(proto);
    current = proto;
  }
  
  // Noop
  if (!superF) {
    if (noop) {
      return () => {};
    }
    return null;
  }
  return superF.bind(this);
}

Object.prototype.extend = function(properties) {
  const newObj = Object.create(this);
  if (properties) {
    Object.assign(newObj, properties);
  }
  return newObj;
}

Object.prototype.new = function(properties) {
  const instance = this.extend(properties);
  if (instance.__init__) {
    instance.__init__(); 
  }
  return instance;
}
