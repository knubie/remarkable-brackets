var Remarkable = require('remarkable');
var furi = require('./index.js');

// Create a new markdown object
var md = new Remarkable();

// register our plugin, using both syntaxes
md.use(furi, {'single': true, 'bracket': true});


// Here we use all fat bracket from my IME
console.log(md.render("｛我身｝（わがみ）の事（こと）、ありの侭（まま）に申（もう）すべし"));
// Here we yse all ascii 'skinny' brackets
console.log(md.render("{現代的}(げんだいてき)なさま"));

console.log(md.render("Here is how not to do it: ｛駄目}(だめ）"));
//                                                ^    ^^    ^
//                                                |    |     |
//                                              Fat   skinny  \
//                                                             fat again
//                                *Don't do this!

