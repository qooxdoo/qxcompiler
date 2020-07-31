function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Runtime": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "runtime.name": {
          "className": "qx.bom.client.Runtime"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Richard Sternagel (rsternagel)
  
     ======================================================================
  
     This class contains code from:
  
     * JSON 3 (v3.2.5)
  
       Code:
         https://github.com/bestiejs/json3
  
       Copyright:
         (c) 2012-2013, Kit Cambridge
  
       License:
         MIT: https://raw.github.com/bestiejs/json3/gh-pages/LICENSE
  
     ----------------------------------------------------------------------
  
      Copyright (c) 2012-2013 Kit Cambridge.
      http://kitcambridge.be/
  
      Permission is hereby granted, free of charge, to any person obtaining a copy of
      this software and associated documentation files (the "Software"), to deal in
      the Software without restriction, including without limitation the rights to
      use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
      of the Software, and to permit persons to whom the Software is furnished to do
      so, subject to the following conditions:
  
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
  
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
  
  ************************************************************************ */

  /**
   * Exposes (potentially polyfilled or patched) window.JSON to qooxdoo
   * (enabled by <a href="https://github.com/bestiejs/json3">JSON 3</a>).
   */
  qx.Bootstrap.define("qx.lang.Json", {
    statics: {
      /**
       * This method produces a JSON text from a JavaScript value.
       *
       * When an object value is found, if the object contains a toJSON
       * method, its toJSON method will be called and the result will be
       * stringified. A toJSON method does not serialize: it returns the
       * value represented by the name/value pair that should be serialized,
       * or undefined if nothing should be serialized. The toJSON method
       * will be passed the key associated with the value, and this will be
       * bound to the object holding the key.
       *
       * For example, this would serialize Dates as ISO strings.
       *
       * <pre class="javascript">
       *     Date.prototype.toJSON = function (key) {
       *         function f(n) {
       *             // Format integers to have at least two digits.
       *             return n < 10 ? '0' + n : n;
       *         }
       *
       *         return this.getUTCFullYear()   + '-' +
       *              f(this.getUTCMonth() + 1) + '-' +
       *              f(this.getUTCDate())      + 'T' +
       *              f(this.getUTCHours())     + ':' +
       *              f(this.getUTCMinutes())   + ':' +
       *              f(this.getUTCSeconds())   + 'Z';
       *     };
       * </pre>
       *
       * You can provide an optional replacer method. It will be passed the
       * key and value of each member, with this bound to the containing
       * object. The value that is returned from your method will be
       * serialized. If your method returns undefined, then the member will
       * be excluded from the serialization.
       *
       * If the replacer parameter is an array of strings, then it will be
       * used to select the members to be serialized. It filters the results
       * such that only members with keys listed in the replacer array are
       * stringified.
       *
       * Values that do not have JSON representations, such as undefined or
       * functions, will not be serialized. Such values in objects will be
       * dropped; in arrays they will be replaced with null. You can use
       * a replacer function to replace those with JSON values.
       * JSON.stringify(undefined) returns undefined.
       *
       * The optional space parameter produces a stringification of the
       * value that is filled with line breaks and indentation to make it
       * easier to read.
       *
       * If the space parameter is a non-empty string, then that string will
       * be used for indentation. If the space parameter is a number, then
       * the indentation will be that many spaces.
       *
       * Example:
       *
       * <pre class="javascript">
       * text = JSON.stringify(['e', {pluribus: 'unum'}]);
       * // text is '["e",{"pluribus":"unum"}]'
       *
       *
       * text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
       * // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
       *
       * text = JSON.stringify([new Date()], function (key, value) {
       *     return this[key] instanceof Date ?
       *         'Date(' + this[key] + ')' : value;
       * });
       * // text is '["Date(---current time---)"]'
       * </pre>
       *
       * @signature function(value, replacer, space)
       *
       * @param value {var} any JavaScript value, usually an object or array.
       *
       * @param replacer {Function?} an optional parameter that determines how
       *    object values are stringified for objects. It can be a function or an
       *    array of strings.
       *
       * @param space {String?} an optional parameter that specifies the
       *    indentation of nested structures. If it is omitted, the text will
       *    be packed without extra whitespace. If it is a number, it will specify
       *    the number of spaces to indent at each level. If it is a string
       *    (such as '\t' or '&nbsp;'), it contains the characters used to indent
       *    at each level.
       *
       * @return {String} The JSON string of the value
       */
      stringify: null,
      // will be set after the polyfill

      /**
       * This method parses a JSON text to produce an object or array.
       * It can throw a SyntaxError exception.
       *
       * The optional reviver parameter is a function that can filter and
       * transform the results. It receives each of the keys and values,
       * and its return value is used instead of the original value.
       * If it returns what it received, then the structure is not modified.
       * If it returns undefined then the member is deleted.
       *
       * Example:
       *
       * <pre class="javascript">
       * // Parse the text. Values that look like ISO date strings will
       * // be converted to Date objects.
       *
       * myData = JSON.parse(text, function (key, value)
       * {
       *   if (typeof value === 'string')
       *   {
       *     var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
       *     if (a) {
       *       return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
       *     }
       *   }
       *   return value;
       * });
       *
       * myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
       *     var d;
       *     if (typeof value === 'string' &&
       *             value.slice(0, 5) === 'Date(' &&
       *             value.slice(-1) === ')') {
       *         d = new Date(value.slice(5, -1));
       *         if (d) {
       *             return d;
       *         }
       *     }
       *     return value;
       * });
       * </pre>
       *
       * @signature function(text, reviver)
       *
       * @param text {String} JSON string to parse
       *
       * @param reviver {Function?} Optional reviver function to filter and
       *    transform the results
       *
       * @return {Object} The parsed JSON object
       */
      parse: null // will be set after the polyfill

    }
  });
  /**
   * @ignore(define.*, exports)
   * @lint ignoreUnused(JSON3)
   * @lint ignoreNoLoopBlock()
   */

  (function () {
    // define JSON3 object
    var JSON3; // prevent using CommonJS exports object,
    // by shadowing global exports object

    var exports; // prevent using AMD compatible loader,
    // by shadowing global define function

    var define;
    /*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */

    (function (window) {
      // This polyfill does not work under Rhino because it cannot convert POJO to object (it tries
      //  to serialize the class)
      if (qx.core.Environment.get("runtime.name") === "rhino" || qx.core.Environment.get("runtime.name") === undefined) return; // Convenience aliases.

      var getClass = {}.toString,
          _isProperty,
          forEach,
          undef; // Detect the `define` function exposed by asynchronous module loaders. The
      // strict `define` check is necessary for compatibility with `r.js`.


      var isLoader = typeof define === "function" && define.amd,
          JSON3 = _typeof(exports) === "object" && exports;

      if (JSON3 || isLoader) {
        if ((typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === "object" && JSON) {
          // Delegate to the native `stringify` and `parse` implementations in
          // asynchronous module loaders and CommonJS environments.
          if (JSON3) {
            JSON3.stringify = JSON.stringify;
            JSON3.parse = JSON.parse;
          } else {
            JSON3 = JSON;
          }
        } else if (isLoader) {
          JSON3 = window.JSON = {};
        }
      } else {
        // Export for web browsers and JavaScript engines.
        JSON3 = window.JSON || (window.JSON = {});
      } // Test the `Date#getUTC*` methods. Based on work by @Yaffle.


      var isExtended = new Date(-3509827334573292);

      try {
        // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
        // results for certain dates in Opera >= 10.53.
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      } catch (exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
      // implementations are spec-compliant. Based on work by Ken Snyder.


      function has(name) {
        if (name === "bug-string-char-index") {
          // IE <= 7 doesn't support accessing string characters using square
          // bracket notation. IE 8 only supports this for primitives.
          return "a"[0] != "a";
        }

        var value,
            serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}",
            isAll = name === "json";

        if (isAll || name === "json-stringify" || name === "json-parse") {
          // Test `JSON.stringify`.
          if (name == "json-stringify" || isAll) {
            var stringify = JSON3.stringify,
                stringifySupported = typeof stringify === "function" && isExtended;

            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function value() {
                return 1;
              }).toJSON = value;

              try {
                stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" && stringify(new String()) === '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef && // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" && stringify([value]) === "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) === "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) === "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
                // of Firefox also allow trailing commas in JSON objects and arrays.
                // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) === "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({
                  "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" && stringify([1, 2], null, 1) === "[\n 1,\n 2\n]" && // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) === '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) === '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) === '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) === '"1969-12-31T23:59:59.999Z"';
              } catch (exception) {
                stringifySupported = false;
              }
            }

            if (!isAll) {
              return stringifySupported;
            }
          } // Test `JSON.parse`.


          if (name === "json-parse" || isAll) {
            var parse = JSON3.parse;

            if (typeof parse === "function") {
              try {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  var parseSupported = value["a"].length == 5 && value["a"][0] === 1;

                  if (parseSupported) {
                    try {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    } catch (exception) {}

                    if (parseSupported) {
                      try {
                        // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                        // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                        // allow certain octal literals.
                        parseSupported = parse("01") !== 1;
                      } catch (exception) {}
                    }
                  }
                }
              } catch (exception) {
                parseSupported = false;
              }
            }

            if (!isAll) {
              return parseSupported;
            }
          }

          return stringifySupported && parseSupported;
        }
      }

      if (!has("json")) {
        // Common `[[Class]]` name aliases.
        var functionClass = "[object Function]";
        var dateClass = "[object Date]";
        var numberClass = "[object Number]";
        var stringClass = "[object String]";
        var arrayClass = "[object Array]";
        var booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.

        var charIndexBuggy = has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.

        if (!isExtended) {
          var floor = Math.floor; // A mapping between the months of the year and the number of days between
          // January 1st and the first of the respective month.

          var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; // Internal: Calculates the number of days between the Unix epoch and the
          // first day of the given month.

          var getDay = function getDay(year, month) {
            return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
          };
        } // Internal: Determines if a property is a direct property of the given
        // object. Delegates to the native `Object#hasOwnProperty` method.


        if (!(_isProperty = {}.hasOwnProperty)) {
          _isProperty = function isProperty(property) {
            var members = {},
                constructor;

            if ((members.__proto__ = null, members.__proto__ = {
              // The *proto* property cannot be set multiple times in recent
              // versions of Firefox and SeaMonkey.
              "toString": 1
            }, members).toString != getClass) {
              // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
              // supports the mutable *proto* property.
              _isProperty = function isProperty(property) {
                // Capture and break the object's prototype chain (see section 8.6.2
                // of the ES 5.1 spec). The parenthesized expression prevents an
                // unsafe transformation by the Closure Compiler.
                var original = this.__proto__,
                    result = (property in (this.__proto__ = null, this)); // Restore the original prototype chain.

                this.__proto__ = original;
                return result;
              };
            } else {
              // Capture a reference to the top-level `Object` constructor.
              constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
              // other environments.

              _isProperty = function isProperty(property) {
                var parent = (this.constructor || constructor).prototype;
                return property in this && !(property in parent && this[property] === parent[property]);
              };
            }

            members = null;
            return _isProperty.call(this, property);
          };
        } // Internal: A set of primitive types used by `isHostType`.


        var PrimitiveTypes = {
          'boolean': 1,
          'number': 1,
          'string': 1,
          'undefined': 1
        }; // Internal: Determines if the given object `property` value is a
        // non-primitive.

        var isHostType = function isHostType(object, property) {
          var type = _typeof(object[property]);

          return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
        }; // Internal: Normalizes the `for...in` iteration algorithm across
        // environments. Each enumerated key is yielded to a `callback` function.


        forEach = function forEach(object, callback) {
          var size = 0,
              Properties,
              members,
              property,
              forEach; // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.

          (Properties = function Properties() {
            this.valueOf = 0;
          }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.

          members = new Properties();

          for (property in members) {
            // Ignore all properties inherited from `Object.prototype`.
            if (_isProperty.call(members, property)) {
              size++;
            }
          }

          Properties = members = null; // Normalize the iteration algorithm.

          if (!size) {
            // A list of non-enumerable properties inherited from `Object.prototype`.
            members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
            // properties.

            forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  length;
              var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : _isProperty;

              for (property in object) {
                // Gecko <= 1.0 enumerates the `prototype` property of functions under
                // certain conditions; IE does not.
                if (!(isFunction && property === "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              } // Manually invoke the callback for each non-enumerable property.


              for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {
                ;
              }
            };
          } else if (size == 2) {
            // Safari <= 2.0.4 enumerates shadowed properties twice.
            forEach = function forEach(object, callback) {
              // Create a set of iterated properties.
              var members = {},
                  isFunction = getClass.call(object) == functionClass,
                  property;

              for (property in object) {
                // Store each property name to prevent double enumeration. The
                // `prototype` property of functions is not enumerated due to cross-
                // environment inconsistencies.
                if (!(isFunction && property === "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            // No bugs detected; use the standard `for...in` algorithm.
            forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  isConstructor;

              for (property in object) {
                if (!(isFunction && property === "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              } // Manually invoke the callback for the `constructor` property due to
              // cross-environment inconsistencies.


              if (isConstructor || _isProperty.call(object, property = "constructor")) {
                callback(property);
              }
            };
          }

          return forEach(object, callback);
        }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
        // `filter` argument may specify either a function that alters how object and
        // array members are serialized, or an array of strings and numbers that
        // indicates which properties should be serialized. The optional `width`
        // argument may be either a string or number that specifies the indentation
        // level of the output.


        if (!has("json-stringify")) {
          // Internal: A map of control characters and their escaped equivalents.
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          }; // Internal: Converts `value` into a zero-padded string such that its
          // length is at least equal to `width`. The `width` must be <= 6.

          var leadingZeroes = "000000";

          var toPaddedString = function toPaddedString(width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          }; // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.


          var unicodePrefix = "\\u00";

          var quote = function quote(value) {
            var result = '"',
                index = 0,
                length = value.length,
                isLarge = length > 10 && charIndexBuggy,
                symbols;

            if (isLarge) {
              symbols = value.split("");
            }

            for (; index < length; index++) {
              var charCode = value.charCodeAt(index); // If the character is a control character, append its Unicode or
              // shorthand escape sequence; otherwise, append the character as-is.

              switch (charCode) {
                case 8:
                case 9:
                case 10:
                case 12:
                case 13:
                case 34:
                case 92:
                  result += Escapes[charCode];
                  break;

                default:
                  if (charCode < 32) {
                    result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                    break;
                  }

                  result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
              }
            }

            return result + '"';
          }; // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.


          var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
            var value = object[property],
                className,
                year,
                month,
                date,
                time,
                hours,
                minutes,
                seconds,
                milliseconds,
                results,
                element,
                index,
                length,
                prefix,
                hasMembers,
                result;

            try {
              // Necessary for host object support.
              value = object[property];
            } catch (exception) {}

            if (_typeof(value) === "object" && value) {
              className = getClass.call(value);

              if (className == dateClass && !_isProperty.call(value, "toJSON")) {
                if (value > -1 / 0 && value < Infinity) {
                  // Dates are serialized according to the `Date#toJSON` method
                  // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                  // for the ISO 8601 date time string format.
                  if (getDay) {
                    // Manually compute the year, month, date, hours, minutes,
                    // seconds, and milliseconds if the `getUTC*` methods are
                    // buggy. Adapted from @Yaffle's `date-shim` project.
                    date = floor(value / 864e5);

                    for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {
                      ;
                    }

                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {
                      ;
                    }

                    date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                    // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                    // to compute `A modulo B`, as the `%` operator does not
                    // correspond to the `modulo` operation for negative numbers.

                    time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                    // decomposing the time within the day. See section 15.9.1.10.

                    hours = floor(time / 36e5) % 24;
                    minutes = floor(time / 6e4) % 60;
                    seconds = floor(time / 1e3) % 60;
                    milliseconds = time % 1e3;
                  } else {
                    year = value.getUTCFullYear();
                    month = value.getUTCMonth();
                    date = value.getUTCDate();
                    hours = value.getUTCHours();
                    minutes = value.getUTCMinutes();
                    seconds = value.getUTCSeconds();
                    milliseconds = value.getUTCMilliseconds();
                  } // Serialize extended years correctly.


                  value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
                } else {
                  value = null;
                }
              } else if (typeof value.toJSON === "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
                // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                // ignores all `toJSON` methods on these objects unless they are
                // defined directly on an instance.
                value = value.toJSON(property);
              }
            }

            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }

            if (value === null) {
              return "null";
            }

            className = getClass.call(value);

            if (className == booleanClass) {
              // Booleans are represented literally.
              return "" + value;
            } else if (className == numberClass) {
              // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
              // `"null"`.
              return value > -1 / 0 && value < Infinity ? "" + value : "null";
            } else if (className == stringClass) {
              // Strings are double-quoted and escaped.
              return quote("" + value);
            } // Recursively serialize objects and arrays.


            if (_typeof(value) === "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              } // Add the object to the stack of traversed objects.


              stack.push(value);
              results = []; // Save the current indentation level and indent one additional level.

              prefix = indentation;
              indentation += whitespace;

              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; hasMembers || (hasMembers = true), index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undef ? "null" : element);
                }

                result = hasMembers ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forEach(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);

                  if (element !== undef) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }

                  hasMembers || (hasMembers = true);
                });
                result = hasMembers ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
              } // Remove the object from the traversed object stack.


              stack.pop();
              return result;
            }
          }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.


          JSON3.stringify = function (source, filter, width) {
            var whitespace, callback, properties;

            if (typeof filter === "function" || _typeof(filter) === "object" && filter) {
              if (getClass.call(filter) == functionClass) {
                callback = filter;
              } else if (getClass.call(filter) == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};

                for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (getClass.call(value) == stringClass || getClass.call(value) == numberClass) && (properties[value] = 1)) {
                  ;
                }
              }
            }

            if (width) {
              if (getClass.call(width) == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {
                    ;
                  }
                }
              } else if (getClass.call(width) == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            } // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).


            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        } // Public: Parses a JSON source string.


        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
          // equivalents.

          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          }; // Internal: Stores the parser state.

          var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.

          var abort = function abort() {
            Index = Source = null;
            throw SyntaxError();
          }; // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.


          var lex = function lex() {
            var source = Source,
                length = source.length,
                value,
                begin,
                position,
                isSigned,
                charCode;

            while (Index < length) {
              charCode = source.charCodeAt(Index);

              switch (charCode) {
                case 9:
                case 10:
                case 13:
                case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;

                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                  // the current position.
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;

                case 34:
                  // `"` delimits a JSON string; advance to the next character and
                  // begin parsing the string. String tokens are prefixed with the
                  // sentinel `@` character to distinguish them from punctuators and
                  // end-of-string tokens.
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);

                    if (charCode < 32) {
                      // Unescaped ASCII control characters (those with a code unit
                      // less than the space character) are not permitted.
                      abort();
                    } else if (charCode == 92) {
                      // A reverse solidus (`\`) marks the beginning of an escaped
                      // control character (including `"`, `\`, and `/`) or Unicode
                      // escape sequence.
                      charCode = source.charCodeAt(++Index);

                      switch (charCode) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          // Revive escaped control characters.
                          value += Unescapes[charCode];
                          Index++;
                          break;

                        case 117:
                          // `\u` marks the beginning of a Unicode escape sequence.
                          // Advance to the first character and validate the
                          // four-digit code point.
                          begin = ++Index;

                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.

                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              // Invalid Unicode escape sequence.
                              abort();
                            }
                          } // Revive the escaped character.


                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;

                        default:
                          // Invalid escape sequence.
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        // An unescaped double-quote character marks the end of the
                        // string.
                        break;
                      }

                      charCode = source.charCodeAt(Index);
                      begin = Index; // Optimize for the common case where a string is valid.

                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      } // Append the string as-is.


                      value += source.slice(begin, Index);
                    }
                  }

                  if (source.charCodeAt(Index) == 34) {
                    // Advance to the next character and return the revived string.
                    Index++;
                    return value;
                  } // Unterminated string.


                  abort();

                default:
                  // Parse numbers and literals.
                  begin = Index; // Advance past the negative sign, if one is specified.

                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  } // Parse an integer or floating-point value.


                  if (charCode >= 48 && charCode <= 57) {
                    // Leading zeroes are interpreted as octal literals.
                    if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                      // Illegal octal literal.
                      abort();
                    }

                    isSigned = false; // Parse the integer component.

                    for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {
                      ;
                    } // Floats cannot contain a leading decimal point; however, this
                    // case is already accounted for by the parser.


                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index; // Parse the decimal component.

                      for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {
                        ;
                      }

                      if (position == Index) {
                        // Illegal trailing decimal.
                        abort();
                      }

                      Index = position;
                    } // Parse exponents. The `e` denoting the exponent is
                    // case-insensitive.


                    charCode = source.charCodeAt(Index);

                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                      // specified.

                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      } // Parse the exponential component.


                      for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {
                        ;
                      }

                      if (position == Index) {
                        // Illegal empty exponent.
                        abort();
                      }

                      Index = position;
                    } // Coerce the parsed value to a JavaScript number.


                    return +source.slice(begin, Index);
                  } // A negative sign may only precede numbers.


                  if (isSigned) {
                    abort();
                  } // `true`, `false`, and `null` literals.


                  if (source.slice(Index, Index + 4) === "true") {
                    Index += 4;
                    return true;
                  } else if (source.slice(Index, Index + 5) === "false") {
                    Index += 5;
                    return false;
                  } else if (source.slice(Index, Index + 4) === "null") {
                    Index += 4;
                    return null;
                  } // Unrecognized token.


                  abort();
              }
            } // Return the sentinel `$` character if the parser has reached the end
            // of the source string.


            return "$";
          }; // Internal: Parses a JSON `value` token.


          var get = function get(value) {
            var results, hasMembers;

            if (value === "$") {
              // Unexpected end of input.
              abort();
            }

            if (typeof value === "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) === "@") {
                // Remove the sentinel `@` character.
                return value.slice(1);
              } // Parse object and array literals.


              if (value === "[") {
                // Parses a JSON array, returning a new JavaScript array.
                results = [];

                for (;; hasMembers || (hasMembers = true)) {
                  value = lex(); // A closing square bracket marks the end of the array literal.

                  if (value === "]") {
                    break;
                  } // If the array literal contains elements, the current token
                  // should be a comma separating the previous element from the
                  // next.


                  if (hasMembers) {
                    if (value === ",") {
                      value = lex();

                      if (value === "]") {
                        // Unexpected trailing `,` in array literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each array element.
                      abort();
                    }
                  } // Elisions and leading commas are not permitted.


                  if (value === ",") {
                    abort();
                  }

                  results.push(get(value));
                }

                return results;
              } else if (value === "{") {
                // Parses a JSON object, returning a new JavaScript object.
                results = {};

                for (;; hasMembers || (hasMembers = true)) {
                  value = lex(); // A closing curly brace marks the end of the object literal.

                  if (value == "}") {
                    break;
                  } // If the object literal contains members, the current token
                  // should be a comma separator.


                  if (hasMembers) {
                    if (value === ",") {
                      value = lex();

                      if (value === "}") {
                        // Unexpected trailing `,` in object literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each object member.
                      abort();
                    }
                  } // Leading commas are not permitted, object property names must be
                  // double-quoted strings, and a `:` must separate each property
                  // name and value.


                  if (value === "," || typeof value !== "string" || (charIndexBuggy ? value.charAt(0) : value[0]) !== "@" || lex() !== ":") {
                    abort();
                  }

                  results[value.slice(1)] = get(lex());
                }

                return results;
              } // Unexpected token encountered.


              abort();
            }

            return value;
          }; // Internal: Updates a traversed object member.


          var update = function update(source, property, callback) {
            var element = walk(source, property, callback);

            if (element === undef) {
              delete source[property];
            } else {
              source[property] = element;
            }
          }; // Internal: Recursively traverses a parsed JSON object, invoking the
          // `callback` function for each value. This is an implementation of the
          // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.


          var walk = function walk(source, property, callback) {
            var value = source[property],
                length;

            if (_typeof(value) === "object" && value) {
              // `forEach` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(value, length, callback);
                }
              } else {
                forEach(value, function (property) {
                  update(value, property, callback);
                });
              }
            }

            return callback.call(source, property, value);
          }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.


          JSON3.parse = function (source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.

            if (lex() != "$") {
              abort();
            } // Reset the parser state.


            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      } // Export for asynchronous module loaders.


      if (isLoader) {
        define(function () {
          return JSON3;
        });
      }
    })(this || window); // End of original code.

  })(); // Finally expose (polyfilled) window.JSON as qx.lang.Json.JSON


  qx.lang.Json.stringify = window.JSON.stringify;
  qx.lang.Json.parse = window.JSON.parse;
  qx.lang.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1596228846723