//imports
import * as fs from "justo-fs";
import * as hbs from "handlebars";

//private members
const registerBuiltInHelpers = Symbol();

/**
 * Handlebars template engine.
 */
export default class {
  /**
   * Constructor.
   */
  constructor() {
    this[registerBuiltInHelpers]();
  }

  /**
   * Register the built-in helpers.
   */
  [registerBuiltInHelpers]() {
    this.registerHelper("like", function(value, pattern) {
      if (!(pattern instanceof RegExp)) pattern = new RegExp(pattern);
      return pattern.test(value);
    });

    this.registerHelper("length", function(coll) {
      return coll.length;
    });

    this.registerHelper("contain", function(coll, item) {
      var res = false;
      if (coll) res = (coll.indexOf(item) >= 0);
      return res;
    });

    this.registerHelper("esc", function(text) {
      return text;
    });

    this.registerHelper("lowercase", function(text) {
      return (text ? text.toString().toLowerCase() : "");
    });

    this.registerHelper("uppercase", function(text) {
      return (text ? text.toString().toUpperCase() : "");
    });

    this.registerHelper("capitalize", function(text) {
      return (text ? text[0].toUpperCase() + text.slice(1) : "");
    });

    this.registerHelper("decapitalize", function(text) {
      return (text ? text[0].toLowerCase() + text.slice(1) : "");
    });

    this.registerHelper("concat", function(...args) {
      return args.slice(0, args.length-1).join("");
    });

    this.registerHelper("replace", function(...args) {
      return args[0].replace(args[1], (typeof(args[2]) == "string" ? args[2] : ""));
    });

    this.registerHelper("http", function(url) {
      if (!url) return "";
      else if (/^http[s]?:/.test(url)) return url;
      else return "http://" + url;
    });

    this.registerHelper("true", function(x) {
      return ([true, "true", "yes"].indexOf(x) >= 0);
    });

    this.registerHelper("false", function(x) {
      return ([false, "false", "no"].indexOf(x) >= 0);
    });

    this.registerHelper("eq", function(x, y) {
      return (x == y);
    });

    this.registerHelper("ne", function(x, y) {
      return (x != y);
    });

    this.registerHelper("lt", function(x, y) {
      return (x < y);
    });

    this.registerHelper("le", function(x, y) {
      return (x <= y);
    });

    this.registerHelper("gt", function(x, y) {
      return (x > y);
    });

    this.registerHelper("ge", function(x, y) {
      return (x >= y);
    });

    this.registerHelper("in", function(value, ...rest) {
      var coll;

      //(1) get collection
      if (rest.length == 2) coll = rest[0];
      else coll = rest.slice(0, -1);

      //(2) check
      return coll.indexOf(value) >= 0;
    });

    this.registerHelper("nin", function(value, ...rest) {
      var coll;

      //(1) get collection
      if (rest.length == 2) coll = rest[0];
      else coll = rest.slice(0, -1);

      //(2) check
      return coll.indexOf(value) < 0;
    });

    this.registerHelper("iif", function(cond, tr, fls) {
      return cond ? tr : fls;
    });

    this.registerHelper("coalesce", function(args) {
      var res;

      //(1) check
      for (let arg of args) {
        if (arg !== undefined && arg !== null) {
          res = arg;
          break;
        }
      }

      //(2) return
      return res;
    });
  }

  /**
   * Render a file.
   *
   * @param file:string   The template file path.
   * @param data:object   The data.
   * @param [opts]:object The render options: helpers (object) and partials (object).
   *
   * @return string
   */
  renderFile(file, data, opts) {
    //(1) check if existing
    file = new fs.File(file);
    if (!file.exists()) throw new Error(`The '${file.path}' file doesn't exist.`);

    //(2) render
    return this.renderString(file.text, data, opts);
  }

  /**
   * Render a text.
   *
   * @param text:string   The template text.
   * @param data:object   The data.
   * @param [opts]:object The render options: helpers (object) and partials (object).
   *
   * @return string
   */
  renderString(text, data, opts) {
    var tmpl, res;

    //(1) params
    if (!opts) opts = {};

    //(2) render
    //add partials and helpers
    if (opts.helpers) {
      for (let hlpr in opts.helpers) this.registerHelper(hlpr, opts.helpers[hlpr]);
    }

    if (opts.partials) {
      for (let prtl in opts.partials) this.registerPartial(prtl, opts.partials[prtl]);
    }

    //render
    tmpl = hbs.compile(text, opts);
    res = tmpl(data);

    //remove partials and helpers
    if (opts.helpers) {
      for (let hlpr in opts.helpers) this.unregisterHelper(hlpr);
    }

    if (opts.partials) {
      for (let prtl in opts.partials) this.unregisterPartial(prtl);
    }

    //(3) return
    return res;
  }

    /**
   * Register a helper.
   *
   * @param name:string     The helper name.
   * @param helper:function The helper function.
   */
  registerHelper(...args) {
    hbs.registerHelper(...args);
  }

  /**
   * Check whether the helper exist.
   *
   * @param name:string The helper name.
   * @return boolean
   */
  hasHelper(name) {
    return !!hbs.helpers[name];
  }

  /**
   * Unregister a helper.
   *
   * @param name:string The helper name.
   */
  unregisterHelper(name) {
    hbs.unregisterHelper(name);
  }

  /**
   * Register a partial.
   *
   * @param name:string The partial name.
   * @param tmp:string  The partial content.
   */
  registerPartial(...args) {
    hbs.registerPartial(...args);
  }

  /**
   * Reads a partial from a file and register it.
   *
   * @param name:string The partial name.
   * @param file:string The file path.
   */
  registerPartialFromFile(name, file) {
    this.registerPartial(name, new fs.File(file).text);
  }

  /**
   * Check whether the partial exists.
   *
   * @param name:string The partial name.
   * @return boolean
   */
  hasPartial(name) {
    return !!hbs.partials[name];
  }

  /**
   * Unregister a partial.
   *
   * @param name:string The partial name.
   */
  unregisterPartial(name) {
    hbs.unregisterPartial(name);
  }
}
