"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);
var _handlebars = require("handlebars");var hbs = _interopRequireWildcard(_handlebars);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}


var registerBuiltInHelpers = Symbol();var _class = function () {








  function _class() {_classCallCheck(this, _class);
    this[registerBuiltInHelpers]();
  }_createClass(_class, [{ key:




    registerBuiltInHelpers, value: function value() {
      this.registerHelper("and", function () {
        var res;


        res = false;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

          for (var _iterator = args.slice(0, args.length - 1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var value = _step.value;
            res = !!value;
            if (!res) break;
          }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


        return res;
      });

      this.registerHelper("or", function () {
        var res;


        res = false;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

          for (var _iterator2 = args.slice(0, args.length - 1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var value = _step2.value;
            res = !!value;
            if (res) break;
          }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}


        return res;
      });

      this.registerHelper("like", function (value, pattern) {
        if (!(pattern instanceof RegExp)) pattern = new RegExp(pattern);
        return pattern.test(value);
      });

      this.registerHelper("length", function (coll) {
        return coll.length;
      });

      this.registerHelper("contain", function (coll, item) {
        var res = false;
        if (coll) res = coll.indexOf(item) >= 0;
        return res;
      });

      this.registerHelper("esc", function (text) {
        return text;
      });

      this.registerHelper("lowercase", function (text) {
        return text ? text.toString().toLowerCase() : "";
      });

      this.registerHelper("uppercase", function (text) {
        return text ? text.toString().toUpperCase() : "";
      });

      this.registerHelper("capitalize", function (text) {
        return text ? text[0].toUpperCase() + text.slice(1) : "";
      });

      this.registerHelper("decapitalize", function (text) {
        return text ? text[0].toLowerCase() + text.slice(1) : "";
      });

      this.registerHelper("concat", function () {for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
        return args.slice(0, args.length - 1).join("");
      });

      this.registerHelper("replace", function () {for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
        return args[0].replace(args[1], typeof args[2] == "string" ? args[2] : "");
      });

      this.registerHelper("http", function (url) {
        if (!url) return "";else
        if (/^http[s]?:/.test(url)) return url;else
        return "http://" + url;
      });

      this.registerHelper("true", function (x) {
        return [true, "true", "yes"].indexOf(x) >= 0;
      });

      this.registerHelper("false", function (x) {
        return [false, "false", "no"].indexOf(x) >= 0;
      });

      this.registerHelper("eq", function (x, y) {
        return x == y;
      });

      this.registerHelper("ne", function (x, y) {
        return x != y;
      });

      this.registerHelper("lt", function (x, y) {
        return x < y;
      });

      this.registerHelper("le", function (x, y) {
        return x <= y;
      });

      this.registerHelper("gt", function (x, y) {
        return x > y;
      });

      this.registerHelper("ge", function (x, y) {
        return x >= y;
      });

      this.registerHelper("in", function (value) {
        var coll;for (var _len5 = arguments.length, rest = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {rest[_key5 - 1] = arguments[_key5];}


        if (rest.length == 2) coll = rest[0];else
        coll = rest.slice(0, -1);


        return coll.indexOf(value) >= 0;
      });

      this.registerHelper("nin", function (value) {
        var coll;for (var _len6 = arguments.length, rest = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {rest[_key6 - 1] = arguments[_key6];}


        if (rest.length == 2) coll = rest[0];else
        coll = rest.slice(0, -1);


        return coll.indexOf(value) < 0;
      });

      this.registerHelper("iif", function (cond, tr, fls) {
        return cond ? tr : fls;
      });

      this.registerHelper("coalesce", function (args) {
        var res;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {


          for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var arg = _step3.value;
            if (arg !== undefined && arg !== null) {
              res = arg;
              break;
            }
          }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}


        return res;
      });
    } }, { key: "renderFile", value: function renderFile(










    file, data, opts) {

      file = new fs.File(file);
      if (!file.exists()) throw new Error("The '" + file.path + "' file doesn't exist.");


      return this.renderString(file.text, data, opts);
    } }, { key: "renderString", value: function renderString(










    text, data, opts) {
      var tmpl, res;


      if (!opts) opts = {};



      if (opts.helpers) {
        for (var hlpr in opts.helpers) {this.registerHelper(hlpr, opts.helpers[hlpr]);}
      }

      if (opts.partials) {
        for (var prtl in opts.partials) {this.registerPartial(prtl, opts.partials[prtl]);}
      }


      tmpl = hbs.compile(text, opts);
      res = tmpl(data);


      if (opts.helpers) {
        for (var _hlpr in opts.helpers) {this.unregisterHelper(_hlpr);}
      }

      if (opts.partials) {
        for (var _prtl in opts.partials) {this.unregisterPartial(_prtl);}
      }


      return res;
    } }, { key: "registerHelper", value: function registerHelper()







    {
      hbs.registerHelper.apply(hbs, arguments);
    } }, { key: "hasHelper", value: function hasHelper(







    name) {
      return !!hbs.helpers[name];
    } }, { key: "unregisterHelper", value: function unregisterHelper(






    name) {
      hbs.unregisterHelper(name);
    } }, { key: "registerPartial", value: function registerPartial()







    {
      hbs.registerPartial.apply(hbs, arguments);
    } }, { key: "registerPartialFromFile", value: function registerPartialFromFile(







    name, file) {
      this.registerPartial(name, new fs.File(file).text);
    } }, { key: "hasPartial", value: function hasPartial(







    name) {
      return !!hbs.partials[name];
    } }, { key: "unregisterPartial", value: function unregisterPartial(






    name) {
      hbs.unregisterPartial(name);
    } }]);return _class;}();exports.default = _class;