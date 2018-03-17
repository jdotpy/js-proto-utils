var assert = require('assert');

const utils = require('../index');

function extendTests(attr) {
  it('Should set the prototype of the target', function() {
    const BaseClass = {};
    const Class = BaseClass[attr]();
    assert.strictEqual(Object.getPrototypeOf(Class), BaseClass);
  });
  it('No params result is an empty object', function() {
    const Class = Object[attr]();
    assert.deepEqual({}, Class);
  });
  it('Any given params should be included in target', function() {
    const Class = Object[attr]({ foo: 'bar' });
    assert.deepEqual({ foo: 'bar' }, Class);
  });
}

describe('{}.extend()', function() {
  extendTests('extend');
});

describe('{}.new()', function() {
  describe('Should do all the things extend does...', function() {
    extendTests('new');
  });

  it('Should call __init__ after construction', function() {
    const BaseClass = Object.extend({
      __init__() {
        this.foo = 1;
      },
    });
    const SubClass = Object.extend(BaseClass);
    const instance = SubClass.new();
    assert.equal(instance.foo, 1);
  });
});

describe('{}.super(f)', function() {
  it('Should return pre-bound parent of function', function() {
    const BaseClass = Object.extend({
      __init__() {
        this.foo = 1;
      },
    });
    const SubClass = BaseClass.extend({
      __init__: function __init__() {
        this.super(__init__)();
        this.bar = 2;
      },
    });
    const instance = SubClass.new();
    assert.equal(instance.foo, 1);
    assert.equal(instance.bar, 2);
  });
  it('Should optionally return noop if super does not exist', function() {
    const Class = Object.extend({
      foobar: function foobar() {

        const superDefault = this.super(foobar);
        assert.doesNotThrow(
          () => superDefault(),
          TypeError,
          'Should have been a noop'
        );

        const superNoop = this.super(foobar, 'foobar', true);
        assert.doesNotThrow(
          () => superNoop(),
          TypeError,
          'Should have been a noop'
        );

        const superNoopOff = this.super(foobar, 'foobar', false);
        assert.equal(superNoopOff, null);
      },
    });

    Class.foobar();
  });
});
