var parser = require("./parser.js");
var renderer = require("./renderer.js");

module.exports = function custom_bracket_rule(opts) {
  var name   = opts.name;
  var opener = opts.opener;
  var closer = opts.closer;
  var allowSpace = opts.allowSpace;

  return function(md, _opts) {
    md.inline.ruler.push(name, parser(opts), {});

    md.renderer.rules[name + '_open']  = renderer.opener(name);
    md.renderer.rules[name + '_close'] = renderer.closer(name);
  }
}
