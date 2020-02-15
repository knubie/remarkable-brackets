var Remarkable = require('remarkable');
var brackets = require('../index.js');
var assert = require('assert');

var md = new Remarkable('full');
md.use(brackets({name: 'foo', opener: '{', closer: '}', allowSpace: true}));


describe("Tests", function () {
  var test1 = '{{foo}}';

  it(test1 + " should produce <foo>foo</foo>", function () {
    assert.strictEqual(
      md.render(test1),
      '<p><foo>foo</foo></p>\n'
    );
  });


  var test2 = '{{{foo}(bar)}}';

  it(test2 + " should produce <foo>{foo}(bar)</foo>", function () {
    assert.strictEqual(
      md.render(test2),
      '<p><foo>{foo}(bar)</foo></p>\n'
    );
  });


  var test3 = '{{with a space }}';

  it(test3 + " should produce <foo>with a space </foo>", function () {
    assert.strictEqual(
      md.render(test3),
      '<p><foo>with a space </foo></p>\n'
    );
  });


  var test4 = '{{ with a space}}';

  it(test4 + " should produce <foo> with a space</foo>", function () {
    assert.strictEqual(
      md.render(test4),
      '<p><foo> with a space</foo></p>\n'
    );
  });

});
