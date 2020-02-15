// Process ++inserted text++

'use strict';

module.exports = function make_parser(opts) {
  var name = opts.name;
  var opener = opts.opener;
  var closer = opts.closer;
  var allowSpace = opts.allowSpace;
  var openerCharCode = opener.charCodeAt(0);
  var closerCharCode = closer.charCodeAt(0);

  return function parser(state, silent) {
    var found,
        pos,
        stack,
        max = state.posMax,
        start = state.pos,
        lastChar,
        nextChar;

    if (state.src.charCodeAt(start) !== openerCharCode) { return false; }
    if (silent) { return false; } // don't run any pairs in validation mode
    if (start + 4 >= max) { return false; }
    if (state.src.charCodeAt(start + 1) !== openerCharCode) { return false; }
    if (state.level >= state.options.maxNesting) { return false; }

    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);

    // if (lastChar === openerCharCode) { return false; }
    // if (nextChar === openerCharCode) { return false; }
    // 0x20 is a space, I don't think this should matter.
    if ((!allowSpace && nextChar === 0x20) || nextChar === 0x0A) { return false; }

    pos = start + 2;
    // while (pos < max && state.src.charCodeAt(pos) === openerCharCode) { pos++; }
    // if (pos !== start + 2) {
    //   // sequence of 3+ markers taking as literal, same as in a emphasis
    //   state.pos += pos - start;
    //   if (!silent) { state.pending += state.src.slice(start, pos); }
    //   return true;
    // }

    state.pos = start + 2;
    stack = 1;

    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === closerCharCode) {
        if (state.src.charCodeAt(state.pos + 1) === closerCharCode) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== openerCharCode && lastChar !== openerCharCode) {
            // if (lastChar !== 0x0A) {
            if ((allowSpace || lastChar !== 0x20) && lastChar !== 0x0A) {
              // closing '++'
              stack--;
            // } else if (nextChar !== 0x0A) {
            } else if ((allowSpace || nextChar !== 0x20) && nextChar !== 0x0A) {
              // opening '++'
              stack++;
            } // else {
              //  // standalone ' ++ ' indented with spaces
              // }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }

      state.parser.skipToken(state);
    }

    if (!found) {
      // parser failed to find ending tag, so it's not valid emphasis
      state.pos = start;
      return false;
    }

    // found!
    state.posMax = state.pos;
    state.pos = start + 2;

    if (!silent) {
      state.push({ type: name + '_open', level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: name + '_close', level: --state.level });
    }

    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  };
};
