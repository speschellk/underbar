(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = (val) => {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) => {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => {
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) { 
        result = index; 
      };
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = (collection, test) => {
    const passes = [];

    _.each(collection, (item) => {
      if (test(item)) { 
        passes.push(item); 
      }
    });

    return passes;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    const rejects = [];

    _.each(collection, function(item) {
      if (!_.filter(collection, test).includes(item)) {
        rejects.push(item);
      }
    });

    return rejects;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = (array) => {
    const uniques = [];

    _.each(array, function(item) {
      if (!uniques.includes(item)) {
        uniques.push(item);
      }
    });

    return uniques;
  };


  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const results = [];

    _.each(collection, (item) => {
      results.push(iterator(item));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = (collection, iterator, accumulator) => {
    if (accumulator === undefined) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }
    _.each(collection, (item) => {
      accumulator = iterator(accumulator, item);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => {
    return _.reduce(collection, (wasFound, item) => {
      if (wasFound) { return true; }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  /*_.every = function(collection, target) {
    if (collection = []) {
      return true;
    } else {
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    };
  };*/

  _.every = (collection, iterator) => {
    iterator === undefined ? iterator = _.identity : iterator = iterator;

    return !!_.reduce(collection, (test, item) => {
      return test && iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator) => {
    // TIP: There's a very clever way to re-use every() here.
    iterator === undefined ? iterator = _.identity : iterator = iterator;

    return !!_.reduce(collection, (test, item) => {
      return test || iterator(item);
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), (object) => {
      _.each(object, (value, key) => {
        obj[key] = value;
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(Array.prototype.slice.call(arguments, 1), (object) => {
      _.each(object, (value, key) => {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = (func) => {
    let calledBefore = false;
    let result;

    return function() {
      if (!calledBefore) {
        result = func.apply(this, arguments);
        calledBefore = true;
      }
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = (func) => {
    const results = {};

    return function() {
      const args = JSON.stringify(arguments);
      if (results[args] === undefined) {
        results[args] = func.apply(this, arguments);
      }

      return results[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    const a = arguments[2];
    const b = arguments[3];

    setTimeout(function() {
      func(a, b);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = (array) => {
    const shuffled = [];
    const copy = array.slice(0);
    let randIndex;

    _.each(array, (value, index) => {
      // generate a random index
      randIndex = Math.floor(Math.random() * copy.length);
      shuffled.push(copy[randIndex]);
      copy.splice(randIndex, 1);
    });

    return shuffled;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = (collection, functionOrKey, args) => {
    return _.map(collection, (value) => {
      let func = typeof functionOrKey === "string" ? value[functionOrKey] : functionOrKey;

      return func.apply(value, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = (collection, iterator) => {
    if (typeof iterator === "string") {
      let iter = iterator;
      iterator = (item) => {
        return item[iter];
      };
    }

    return collection.sort((a, b) => {
      return iterator(a) - iterator(b);
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(array) {
    const args = Array.prototype.slice.call(arguments, 1);
    let index;

    return _.map(array, (el) => {
      el = [el];
      index = index || 0;

      _.each(args, (array) => {
        el.push(array[index]);
      });

      index++;
      return el;
    });
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray, result) => {
    return _.reduce(nestedArray, (arr, el) => {
      return arr.concat(Array.isArray(el) ? _.flatten(el) : [el]);
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(array) {
    const args = Array.prototype.slice.call(arguments, 1);

    return _.filter(array, (el) => {
      return _.every(args, (arr) => { 
        return _.indexOf(arr, el) !== -1; 
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    const diffs = [];
    const args = Array.prototype.slice.call(arguments, 1);

    _.each(array, (el) => {
      let contains = false;

      _.each(args, (arr) => {
        if (_.indexOf(arr, el) !== -1) { contains = true; }
      });

      if (!contains) { diffs.push(el); }
    });

    return diffs;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let triggered = false;

    return function() {
      if (!triggered) {
        triggered = true;
        func.apply(Array.prototype.slice.apply(arguments));

        setTimeout(function() {
          triggered = false;
        }, wait);
      }
    };
  };
}());
