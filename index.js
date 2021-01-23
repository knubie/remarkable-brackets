var make_parser = require("./parser.js");
var make_block_parser = require("./block_parser.js");
var renderer = require("./renderer.js");

module.exports = function custom_bracket_rule(opts) {
  var name   = opts.name;
  var opener = opts.opener;
  var closer = opts.closer;
  var allowSpace = opts.allowSpace;

  return function(md, _opts) {
    md.inline.ruler.push(name, make_parser(opts), {});
    md.block.ruler.before('fences', name, make_block_parser(opts), {});

    md.renderer.rules[name + '_open']  = renderer.opener(name);
    md.renderer.rules[name + '_close'] = renderer.closer(name);
  }
}
