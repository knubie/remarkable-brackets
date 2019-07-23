var Remarkable = require('remarkable');
var brackets = require('../index.js');
var assert = require('assert');

var md = new Remarkable('full');
md.use(brackets({name: 'foo', opener: '{', closer: '}'}));


describe("Tests", function () {
  var test1 = '{{foo}}';
  var expected_output = 

  it(test1 + " should produce <foo>foo</foo>", function () {
    assert.strictEqual(
      md.render(test1),
      '<p><foo>foo</foo></p>\n'
    );
  });

});
