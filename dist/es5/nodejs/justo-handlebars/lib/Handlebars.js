"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _justoFs = require("justo-fs");var 
fs = _interopRequireWildcard(_justoFs);var _handlebars = require("handlebars");var 
hbs = _interopRequireWildcard(_handlebars);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}


var registerBuiltInHelpers = Symbol();var _class = function () {








  function _class() {_classCallCheck(this, _class);
    this[registerBuiltInHelpers]();}_createClass(_class, [{ key: 





    registerBuiltInHelpers, value: function value() {
      this.registerHelper("concat", function () {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        return args.slice(0, args.length - 1).join("");});


      this.registerHelper("http", function (url) {
        if (/^http[s]?:/.test(url)) return url;else 
        return "http://" + url;});


      this.registerHelper("true", function (x) {
        return [true, "true", "yes"].indexOf(x) >= 0;});


      this.registerHelper("false", function (x) {
        return [false, "false", "no"].indexOf(x) >= 0;});


      this.registerHelper("eq", function (x, y) {
        return x == y;});


      this.registerHelper("ne", function (x, y) {
        return x != y;});


      this.registerHelper("lt", function (x, y) {
        return x < y;});


      this.registerHelper("le", function (x, y) {
        return x <= y;});


      this.registerHelper("gt", function (x, y) {
        return x > y;});


      this.registerHelper("ge", function (x, y) {
        return x >= y;});


      this.registerHelper("in", function (value, coll) {
        return coll.indexOf(value) >= 0;});


      this.registerHelper("nin", function (value, coll) {
        return coll.indexOf(value) < 0;});


      this.registerHelper("iif", function (cond, tr, fls) {
        return cond ? tr : fls;});


      this.registerHelper("coalesce", function (args) {
        var res;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


          for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var arg = _step.value;
            if (arg !== undefined && arg !== null) {
              res = arg;
              break;}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




        return res;});} }, { key: "renderFile", value: function renderFile(












    file, data, opts) {

      file = new fs.File(file);
      if (!file.exists()) throw new Error("The '" + file.path + "' file doesn't exist.");


      return this.renderString(file.text, data, opts);} }, { key: "renderString", value: function renderString(











    text, data, opts) {
      var tmpl, res;


      if (!opts) opts = {};



      if (opts.helpers) {
        for (var hlpr in opts.helpers) {this.registerHelper(hlpr, opts.helpers[hlpr]);}}


      if (opts.partials) {
        for (var prtl in opts.partials) {this.registerPartial(prtl, opts.partials[prtl]);}}



      tmpl = hbs.compile(text, opts);
      res = tmpl(data);


      if (opts.helpers) {
        for (var hlpr in opts.helpers) {this.unregisterHelper(hlpr);}}


      if (opts.partials) {
        for (var prtl in opts.partials) {this.unregisterPartial(prtl);}}



      return res;} }, { key: "registerHelper", value: function registerHelper() 








    {
      hbs.registerHelper.apply(hbs, arguments);} }, { key: "hasHelper", value: function hasHelper(








    name) {
      return !!hbs.helpers[name];} }, { key: "unregisterHelper", value: function unregisterHelper(







    name) {
      hbs.unregisterHelper(name);} }, { key: "registerPartial", value: function registerPartial() 








    {
      hbs.registerPartial.apply(hbs, arguments);} }, { key: "registerPartialFromFile", value: function registerPartialFromFile(








    name, file) {
      this.registerPartial(name, new fs.File(file).text);} }, { key: "hasPartial", value: function hasPartial(








    name) {
      return !!hbs.partials[name];} }, { key: "unregisterPartial", value: function unregisterPartial(







    name) {
      hbs.unregisterPartial(name);} }]);return _class;}();exports.default = _class;