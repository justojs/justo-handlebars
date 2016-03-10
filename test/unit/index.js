//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const pkg = require("../../dist/es5/nodejs/justo-handlebars");

//suite
suite("API", function() {
  test("ObjectName", function() {
    pkg.must.have(["Handlebars"]);
  });
})();
