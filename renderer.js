module.exports = {
  opener: function(name) { return function () { return '<'  + name + '>'; }; },
  closer: function(name) { return function () { return '</' + name + '>'; }; },
  block:  function(name) {
    return function (tokens, idx, options, env, instance) {
      var token = tokens[idx];

      return '<' + name + '>'
        + token.content
        + '</' + name + '>';
    };
  },
};
