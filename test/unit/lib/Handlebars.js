//imports
const justo = require("justo");
const init = justo.init;
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

    suite("set", function() {
      test("set var val", function() {
        hbs.renderFile(
          DATA + "/helpers/set-var-init.hbs",
          {scope: {}}
        ).must.be.eq("123\n");

        hbs.renderFile(
          DATA + "/helpers/set-var-fin.hbs",
          {}
        ).must.be.eq("\n");
      });

      test("set obj.prop val", function() {
        hbs.renderFile(
          DATA + "/helpers/set-obj-prop-init.hbs",
          {scope: {}}
        ).must.be.eq("123\n");

        hbs.renderFile(
          DATA + "/helpers/set-obj-prop-fin.hbs",
          {scope: {}}
        ).must.be.eq("\n");
      });
    });

    suite("and", function() {
      test("and true", function() {
        hbs.renderFile(
          DATA + "/helpers/and1.hbs",
          {scope: {one: true}}
        ).must.be.eq("true\n");
      });

      test("and false", function() {
        hbs.renderFile(
          DATA + "/helpers/and1.hbs",
          {scope: {one: false}}
        ).must.be.eq("false\n");
      });

      test("and undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/and1.hbs",
          {scope: {one: undefined}}
        ).must.be.eq("false\n");
      });

      test("and true true", function() {
        hbs.renderFile(
          DATA + "/helpers/and2.hbs",
          {scope: {one: true, two: true}}
        ).must.be.eq("true\n");
      });

      test("and true false", function() {
        hbs.renderFile(
          DATA + "/helpers/and2.hbs",
          {scope: {one: true, two: false}}
        ).must.be.eq("false\n");
      });

      test("and false true", function() {
        hbs.renderFile(
          DATA + "/helpers/and2.hbs",
          {scope: {one: false, two: true}}
        ).must.be.eq("false\n");
      });

      test("and false false", function() {
        hbs.renderFile(
          DATA + "/helpers/and2.hbs",
          {scope: {one: false, two: false}}
        ).must.be.eq("false\n");
      });

      test("and true true true", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: true, two: true, three: true}}
        ).must.be.eq("true\n");
      });

      test("and true true false", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: true, two: false, three: false}}
        ).must.be.eq("false\n");
      });

      test("and true false true", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: true, two: false, three: true}}
        ).must.be.eq("false\n");
      });

      test("and true false false", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: true, two: false, three: false}}
        ).must.be.eq("false\n");
      });

      test("and false true true", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: false, two: true, three: true}}
        ).must.be.eq("false\n");
      });

      test("and false true false", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: false, two: true, three: false}}
        ).must.be.eq("false\n");
      });

      test("and false false true", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: false, two: false, three: true}}
        ).must.be.eq("false\n");
      });

      test("and false false false", function() {
        hbs.renderFile(
          DATA + "/helpers/and3.hbs",
          {scope: {one: false, two: false, three: false}}
        ).must.be.eq("false\n");
      });
    });

    suite("or", function() {
      test("or true", function() {
        hbs.renderFile(
          DATA + "/helpers/or1.hbs",
          {scope: {one: true}}
        ).must.be.eq("true\n");
      });

      test("or false", function() {
        hbs.renderFile(
          DATA + "/helpers/or1.hbs",
          {scope: {one: false}}
        ).must.be.eq("false\n");
      });

      test("or undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/or1.hbs",
          {scope: {one: undefined}}
        ).must.be.eq("false\n");
      });

      test("or true true", function() {
        hbs.renderFile(
          DATA + "/helpers/or2.hbs",
          {scope: {one: true, two: true}}
        ).must.be.eq("true\n");
      });

      test("or true false", function() {
        hbs.renderFile(
          DATA + "/helpers/or2.hbs",
          {scope: {one: true, two: false}}
        ).must.be.eq("true\n");
      });

      test("or false false", function() {
        hbs.renderFile(
          DATA + "/helpers/or2.hbs",
          {scope: {one: false, two: false}}
        ).must.be.eq("false\n");
      });

      test("or false true", function() {
        hbs.renderFile(
          DATA + "/helpers/or2.hbs",
          {scope: {one: false, two: true}}
        ).must.be.eq("true\n");
      });

      test("or false false false", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: false, two: false, three: false}}
        ).must.be.eq("false\n");
      });

      test("or false false true", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: false, two: false, three: true}}
        ).must.be.eq("true\n");
      });

      test("or false true false", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: false, two: true, three: false}}
        ).must.be.eq("true\n");
      });

      test("or false true true", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: false, two: true, three: true}}
        ).must.be.eq("true\n");
      });

      test("or true false false", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: true, two: false, three: false}}
        ).must.be.eq("true\n");
      });

      test("or true false true", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: true, two: false, three: true}}
        ).must.be.eq("true\n");
      });

      test("or true true false", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: true, two: true, three: false}}
        ).must.be.eq("true\n");
      });

      test("or true true true", function() {
        hbs.renderFile(
          DATA + "/helpers/or3.hbs",
          {scope: {one: true, two: true, three: true}}
        ).must.be.eq("true\n");
      });
    });

    suite("like", function() {
      test("like value pattern:string : true", function() {
        hbs.renderFile(
          DATA + "/helpers/like.hbs",
          {scope: {value: "hola", pattern: ".*hola.*"}}
        ).must.be.eq("true\n");
      });

      test("like value pattern:RegExp : true", function() {
        hbs.renderFile(
          DATA + "/helpers/like.hbs",
          {scope: {value: "hola", pattern: /.*hola.*/}}
        ).must.be.eq("true\n");
      });

      test("like value pattern:string : false", function() {
        hbs.renderFile(
          DATA + "/helpers/like.hbs",
          {scope: {value: "hola", pattern: "adiós"}}
        ).must.be.eq("false\n");
      });

      test("like value pattern:RegExp : false", function() {
        hbs.renderFile(
          DATA + "/helpers/like.hbs",
          {scope: {value: "hola", pattern: /adiós/}}
        ).must.be.eq("false\n");
      });
    });

    suite("contain", function() {
      test("contain undefined item : false", function() {
        hbs.renderFile(
          DATA + "/helpers/contain.hbs",
          {scope: {coll: undefined, item: "buonasera"}}
        ).must.be.eq("\n");
      });

      test("contain null item : false", function() {
        hbs.renderFile(
          DATA + "/helpers/contain.hbs",
          {scope: {coll: null, item: "buonasera"}}
        ).must.be.eq("\n");
      });

      test("contain coll item : true", function() {
        hbs.renderFile(
          DATA + "/helpers/contain.hbs",
          {scope: {coll: ["buongiorno", "buonasera"], item: "buonasera"}}
        ).must.be.eq("TRUE\n");
      });

      test("contain coll item : false", function() {
        hbs.renderFile(
          DATA + "/helpers/contain.hbs",
          {scope: {coll: ["buongiorno", "buonasera"], item: "buona sera"}}
        ).must.be.eq("\n");
      });
    });

    suite("length", function() {
      test("length string", function() {
        hbs.renderFile(
          DATA + "/helpers/length.hbs",
          {scope: {coll: "buonasera"}}
        ).must.be.eq("9\n");
      });

      test("length array", function() {
        hbs.renderFile(
          DATA + "/helpers/length.hbs",
          {scope: {coll: ["b", "u", "o", "n"]}}
        ).must.be.eq("4\n");
      });
    });

    suite("esc", function() {
      test("esc }", function() {
        hbs.renderFile(
          DATA + "/helpers/esc.hbs",
          {scope: {text: "}"}}
        ).must.be.eq("}\n");
      });
    });

    suite("lowercase", function() {
      test("lowercase text", function() {
        hbs.renderFile(
          DATA + "/helpers/lowercase.hbs",
          {scope: {text: "hElLo"}}
        ).must.be.eq("hello\n");
      });

      test("lowercase ''", function() {
        hbs.renderFile(
          DATA + "/helpers/lowercase.hbs",
          {scope: {text: ""}}
        ).must.be.eq("\n");
      });

      test("lowercase undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/lowercase.hbs",
          {scope: {text: undefined}}
        ).must.be.eq("\n");
      });
    });

    suite("uppercase", function() {
      test("uppercase text", function() {
        hbs.renderFile(
          DATA + "/helpers/uppercase.hbs",
          {scope: {text: "hElLo"}}
        ).must.be.eq("HELLO\n");
      });

      test("uppercase ''", function() {
        hbs.renderFile(
          DATA + "/helpers/uppercase.hbs",
          {scope: {text: ""}}
        ).must.be.eq("\n");
      });

      test("uppercase undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/uppercase.hbs",
          {scope: {text: undefined}}
        ).must.be.eq("\n");
      });
    });

    suite("capitalize", function() {
      test("capitalize text", function() {
        hbs.renderFile(
          DATA + "/helpers/capitalize.hbs",
          {scope: {text: "hello"}}
        ).must.be.eq("Hello\n");
      });

      test("capitalize ''", function() {
        hbs.renderFile(
          DATA + "/helpers/capitalize.hbs",
          {scope: {text: ""}}
        ).must.be.eq("\n");
      });

      test("capitalize undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/capitalize.hbs",
          {scope: {text: undefined}}
        ).must.be.eq("\n");
      });
    });

    suite("decapitalize", function() {
      test("decapitalize text", function() {
        hbs.renderFile(
          DATA + "/helpers/decapitalize.hbs",
          {scope: {text: "HELLO"}}
        ).must.be.eq("hELLO\n");
      });

      test("decapitalize ''", function() {
        hbs.renderFile(
          DATA + "/helpers/decapitalize.hbs",
          {scope: {text: ""}}
        ).must.be.eq("\n");
      });

      test("decapitalize undefined", function() {
        hbs.renderFile(
          DATA + "/helpers/decapitalize.hbs",
          {scope: {text: undefined}}
        ).must.be.eq("\n");
      });
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

      test("in value item1 item2 item3 : true", function() {
        hbs.renderFile(
          DATA + "/helpers/in-list.hbs",
          {scope: {x: "one", y: "two", z: "three", value: "three"}}
        ).must.be.eq("OK\n");
      });

      test("in value item1 item2 item3 : false", function() {
        hbs.renderFile(
          DATA + "/helpers/in-list.hbs",
          {scope: {x: "one", y: "two", z: "three", value: "four"}}
        ).must.be.eq("\n");
      });
    });

    suite("nin", function() {
      test("nin val array : true", function() {
        hbs.renderFile(
          DATA + "/helpers/nin.hbs",
          {scope: {x: 0, y: [1, 2, 3]}}
        ).must.be.eq("OK\n");
      });

      test("nin x y : false", function() {
        hbs.renderFile(
          DATA + "/helpers/nin.hbs",
          {scope: {x: 2, y: [3, 2, 1]}}
        ).must.be.eq("\n");
      });

      test("nin value item1 item2 item3 : true", function() {
        hbs.renderFile(
          DATA + "/helpers/nin-list.hbs",
          {scope: {x: "one", y: "two", z: "three", value: "four"}}
        ).must.be.eq("OK\n");
      });

      test("nin value item1 item2 item3 : false", function() {
        hbs.renderFile(
          DATA + "/helpers/nin-list.hbs",
          {scope: {x: "one", y: "two", z: "three", value: "three"}}
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
