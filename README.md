# js-proto-utils

Utilities for a javascript class pattern using only objects

## Usage

```js

  require('proto-utils');

  const BaseClass = {
    message: 'hi',

    __init__() {
      this.greetCount = 0;
    },

    greeting() {
      this.greetCount += 1;
      return this.message;
    },

    setMessage(newMessage) {
      this.message = newMessage;
    }
  }

  const SubClass = BaseClass.extend({
    name: 'friend',

    greeting: function greeting() {
      return `${this.super(greeting)()} ${this.name}`;
    },
  });

  const baseInstance = BaseClass.new();
  assert(baseInstance.greeting() === 'hi');
  assert(baseInstance.greetCount === 1);

  const plainSubInstance = SubClass.new();
  assert(plainSubInstance.greeting() === 'hi friend');
  assert(plainSubInstance.greetCount === 1);

  const namedSubInstance = SubClass.new({ name: 'Jim' });
  assert(namedSubInstance.greeting() === 'hi Jim');

  namedSubInstance.setMessage('hello');
  assert(namedSubInstance.greeting() === 'hello Jim');
  assert(namedSubInstance.greetCount === 2);

```
