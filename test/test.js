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


  var test2 = '{{{foo}(bar){bizz}(bazz)}}';

  it(test2 + " should produce <foo>{foo}(bar){bizz}(bazz)</foo>", function () {
    assert.strictEqual(
      md.render(test2),
      '<p><foo>{foo}(bar){bizz}(bazz)</foo></p>\n'
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


//   var test7 = '{{two}}{{in a row}}';

//   it(test7 + " should produce <foo>two</foo><foo>in a row</foo>", function () {
//     assert.strictEqual(
//       md.render(test7),
//       '<p><foo>two</foo><foo>in a row</foo></p>\n'
//     );
//   });

  var test5 = '{{\nwith a\nline break\n}}';

  it("{{with a line break}} should produce <foo>with a \\n line break</foo>", function () {
    assert.strictEqual(
      md.render('{{\nwith a\nline break\n\nand two paragraphs\n}}'),
      '<foo><p>with a\nline break</p>\n<p>and two paragraphs</p>\n</foo>'
    );
  });

  it("renders inner markdown in block form", function () {
    assert.strictEqual(
      md.render('{{\n_with emphasis_\n}}'),
      '<foo><p><em>with emphasis</em></p>\n</foo>'
    );
  });

  it("foo bar", function () {
    assert.strictEqual(
      md.render('{{\n$$\n\\LaTeX\n$$\n}}'),
      // md.render('$$\n\\LaTeX\n$$'),
      '<foo><p>$$\n\\LaTeX\n$$</p>\n</foo>'
      // '<p>$$\n\\LaTeX\n$$</p>\n'
    );
  });

  var test6 = '```\ncode\nfences\n```';

  it("code fences should still work", function () {
    assert.strictEqual(
      md.render(test6),
      '<pre><code>code\nfences\n</code></pre>\n'
    );
  });

});
