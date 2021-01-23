module.exports = {
  opener: function(name) { return function () { return '<'  + name + '>'; }; },
  closer: function(name) { return function () { return '</' + name + '>'; }; },
};
