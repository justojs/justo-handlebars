//imports
const justo = require("justo");
const init = justo.init;
const fin = justo.fin;
const suite = justo.suite;
const test = justo.test;
const Handlebars = require("../../../dist/es5/nodejs/justo-handlebars").Handlebars;

//suite
suite("Handlebars", function() {
  var hbs;
  const DATA = "test/unit/data/";

  init("*", function() {
    hbs = new Handlebars();
  });

  suite("#renderFile()", function() {
    test("renderFile(file, data)", function() {
      JSON.parse(hbs.renderFile(DATA + "/file.json", {scope: {version: "1.0.0"}})).must.be.eq({
        name: "",
        version: "1.0.0",
        author: "Justo Labs",
        homepage: ""
      });
    });
  });

  suite("Helpers", function() {
    test("#registerHelper()", function() {
      hbs.registerHelper("myhelper", function(x, y) {
        return (x == y);
      });

      hbs.renderFile(DATA + "/helpers/myhelper.hbs", {scope: {x: 1, y: 1}}).must.be.eq("OK\n");
      hbs.renderFile(DATA + "/helpers/myhelper.hbs", {scope: {x: 1, y: 2}}).must.be.eq("\n");
    });

    test("#unregisterHelper()", function() {
      hbs.registerHelper("myhelper", function(x, y) {
        return (x == y);
      });

      hbs.renderFile(DATA + "/helpers/myhelper.hbs", {scope: {x: 1, y: 1}}).must.be.eq("OK\n");

      hbs.unregisterHelper("myhelper");
      hbs.renderFile.bind(hbs).must.raise(Error, ["/helpers/myhelper.hbs", {scope: {x: 1, y: 1}}]);
    });

    test("#renderFile(file, data, {helpers})", function() {
      hbs.renderFile(
        DATA + "/helpers/custom.hbs",
        {scope: {x: 1, y: 1}},
        {helpers: {test: function(x, y) { return (x == y); }}}
      ).must.be.eq("OK\n");

      hbs.hasHelper("test").must.be.eq(false);
    });

    suite("replace", function() {
      test("replace one two", function() {
        hbs.renderFile(
          DATA + "/helpers/replace2.hbs",
          {scope: {x: "justo-plugin-test", y: "justo-plugin-"}}
        ).must.be.eq("test\n");
      });

      test("replace one two three", function() {
        hbs.renderFile(
          DATA + "/helpers/replace3.hbs",
          {scope: {x: "justo-plugin-test", y: "justo-plugin-", z: "JUSTO-PLUGIN-"}}
        ).must.be.eq("JUSTO-PLUGIN-test\n");
      });
    });

    suite("concat", function() {
      test("concat one two", function() {
        hbs.renderFile(
          DATA + "/helpers/concat2.hbs",
          {scope: {x: "one", y: "two"}}
        ).must.be.eq("onetwo\n");
      });

      test("concat one two three", function() {
        hbs.renderFile(
          DATA + "/helpers/concat3.hbs",
          {scope: {x: "one", y: "two", z: "three"}}
        ).must.be.eq("onetwothree\n");
      });
    });

    suite("http", function() {
      test("http none", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {}}
        ).must.be.eq("\n");
      });

      test("http starting with http:", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {url: "http://justojs.org"}}
        ).must.be.eq("http://justojs.org\n");
      });

      test("http starting with http without :", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {url: "httpjustojs.org"}}
        ).must.be.eq("http://httpjustojs.org\n");
      });

      test("http starting with https:", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {url: "https://justojs.org"}}
        ).must.be.eq("https://justojs.org\n");
      });

      test("http starting with https without :", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {url: "httpsjustojs.org"}}
        ).must.be.eq("http://httpsjustojs.org\n");
      });

      test("http not starting with http[s]:", function() {
        hbs.renderFile(
          DATA + "/helpers/http.hbs",
          {scope: {url: "justojs.org"}}
        ).must.be.eq("http://justojs.org\n");
      });
    });

    suite("true", function() {
      test("true true", function() {
        hbs.renderFile(
          DATA + "/helpers/true.hbs",
          {scope: {x: true}}
        ).must.be.eq("OK\n");
      });

      test("true 'true'", function() {
        hbs.renderFile(
          DATA + "/helpers/true.hbs",
          {scope: {x: "true"}}
        ).must.be.eq("OK\n");
      });

      test("true 'yes'", function() {
        hbs.renderFile(
          DATA + "/helpers/true.hbs",
          {scope: {x: "yes"}}
        ).must.be.eq("OK\n");
      });

      test("true false", function() {
        hbs.renderFile(
          DATA + "/helpers/true.hbs",
          {scope: {x: false}}
        ).must.be.eq("\n");
      });
    });

    suite("false", function() {
      test("false false", function() {
        hbs.renderFile(
          DATA + "/helpers/false.hbs",
          {scope: {x: false}}
        ).must.be.eq("OK\n");
      });

      test("false 'false'", function() {
        hbs.renderFile(
          DATA + "/helpers/false.hbs",
          {scope: {x: "false"}}
        ).must.be.eq("OK\n");
      });

      test("false 'no'", function() {
        hbs.renderFile(
          DATA + "/helpers/false.hbs",
          {scope: {x: "no"}}
        ).must.be.eq("OK\n");
      });

      test("false true", function() {
        hbs.renderFile(
          DATA + "/helpers/false.hbs",
          {scope: {x: true}}
        ).must.be.eq("\n");
      });
    });

    suite("in", function() {
      test("in val array : true", function() {
        hbs.renderFile(
          DATA + "/helpers/in.hbs",
          {scope: {x: 2, y: [1, 2, 3]}}
        ).must.be.eq("OK\n");
      });

      test("in x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/in.hbs",
          {scope: {x: 0, y: [3, 2, 1]}}
        ).must.be.eq("\n");
      });
    });

    suite("nin", function() {
      test("in val array : true", function() {
        hbs.renderFile(
          DATA + "/helpers/nin.hbs",
          {scope: {x: 0, y: [1, 2, 3]}}
        ).must.be.eq("OK\n");
      });

      test("in x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/nin.hbs",
          {scope: {x: 2, y: [3, 2, 1]}}
        ).must.be.eq("\n");
      });
    });

    suite("eq", function() {
      test("eq x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/eq.hbs",
          {scope: {x: 1, y: 1}}
        ).must.be.eq("OK\n");
      });

      test("eq x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/eq.hbs",
          {scope: {x: 1, y: 2}}
        ).must.be.eq("\n");
      });
    });

    suite("ne", function() {
      test("ne x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/ne.hbs",
          {scope: {x: 1, y: 2}}
        ).must.be.eq("OK\n");
      });

      test("ne x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/ne.hbs",
          {scope: {x: 1, y: 1}}
        ).must.be.eq("\n");
      });
    });

    suite("lt", function() {
      test("lt x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/lt.hbs",
          {scope: {x: 1, y: 2}}
        ).must.be.eq("OK\n");
      });

      test("lt x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/lt.hbs",
          {scope: {x: 1, y: 1}}
        ).must.be.eq("\n");
      });
    });

    suite("le", function() {
      test("lt x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/le.hbs",
          {scope: {x: 1, y: 2}}
        ).must.be.eq("OK\n");
      });

      test("le x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/le.hbs",
          {scope: {x: 1, y: 0}}
        ).must.be.eq("\n");
      });
    });

    suite("gt", function() {
      test("gt x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/gt.hbs",
          {scope: {x: 1, y: 0}}
        ).must.be.eq("OK\n");
      });

      test("gt x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/gt.hbs",
          {scope: {x: 1, y: 1}}
        ).must.be.eq("\n");
      });
    });

    suite("ge", function() {
      test("ge x y : true", function() {
        hbs.renderFile(
          DATA + "/helpers/ge.hbs",
          {scope: {x: 1, y: 1}}
        ).must.be.eq("OK\n");
      });

      test("ge x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/ge.hbs",
          {scope: {x: 1, y: 2}}
        ).must.be.eq("\n");
      });
    });

    suite("iif", function() {
      test("iif true x y", function() {
        hbs.renderFile(
          DATA + "/helpers/iif.hbs",
          {scope: {cond: true}}
        ).must.be.eq("TRUE\n");
      });

      test("iif false x y", function() {
        hbs.renderFile(
          DATA + "/helpers/iif.hbs",
          {scope: {cond: false}}
        ).must.be.eq("FALSE\n");
      });
    });

    suite("coalesce", function() {
      test("coalesce array", function() {
        hbs.renderFile(
          DATA + "/helpers/coalesce.hbs",
          {scope: {values: [undefined, null, "VALUE1", "VALUE2"]}}
        ).must.be.eq("VALUE1\n");
      });
    });
  });

  suite("Partials", function() {
    test("#registerPartial()", function() {
      hbs.registerPartial("mypartial", "<b>{{msg}}</b>");
      hbs.renderFile(
        DATA + "/partials/partial.hbs",
        {scope: {msg: "OK"}}
      ).must.be.eq("<b>OK</b>");

      hbs.unregisterPartial("mypartial");
    });

    test("#registerPartialFromFile()", function() {
      hbs.registerPartialFromFile("mypartial", DATA + "/partials/mypartial.hbs");
      hbs.renderFile(
        DATA + "/partials/partial.hbs",
        {scope: {msg: "OK"}}
      ).must.be.eq("<b>OK</b>\n");
    });

    test("#unregisterPartial()", function() {
      hbs.registerPartial("mypartial", "<b>{{msg}}</b>");
      hbs.hasPartial("mypartial").must.be.eq(true);

      hbs.renderFile(
        DATA + "/partials/partial.hbs",
        {scope: {msg: "OK"}}
      ).must.be.eq("<b>OK</b>");

      hbs.unregisterPartial("mypartial");
      hbs.hasPartial("mypartial").must.be.eq(false);
    });

    test("#renderFile(file, data, {partials})", function() {
      hbs.renderFile(
        DATA + "/partials/custom.hbs",
        {scope: {msg: "OK"}},
        {partials: {test: "<b>{{msg}}</b>"}}
      ).must.be.eq("<b>OK</b>");
      hbs.hasPartial("test").must.be.eq(false);
    });
  });
})();
