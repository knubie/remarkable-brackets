'use strict';

module.exports = function make_block_parser(opts) {
  var name = opts.name;
  var opener = opts.opener;
  var closer = opts.closer;
  var allowSpace = opts.allowSpace;
  var openerCharCode = opener.charCodeAt(0);
  var closerCharCode = closer.charCodeAt(0);

  return function parser(state, startLine, endLine, silent) {
    var marker, len, params, nextLine, mem,
        haveEndMarker = false,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // If the line length is shorter than the opener.
    if (pos + opener.length > max) { return false; }

    marker = state.src.charCodeAt(pos);

    if (marker !== openerCharCode) {
      return false;
    }

    // scan marker length
    mem = pos;
    pos = state.skipChars(pos, marker);

    len = pos - mem;

    if (len < opener.length) { return false; }

    params = state.src.slice(pos, max).trim();

    if (params.indexOf(closer) >= 0) { return false; }

    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }

    // search end of block
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (state.src.charCodeAt(pos) !== closerCharCode) { continue; }

      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      pos = state.skipChars(pos, closerCharCode);

      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) { continue; }

      // make sure tail has spaces only
      pos = state.skipSpaces(pos);

      if (pos < max) { continue; }

      haveEndMarker = true;
      // found!
      break;
    }

    // If a fence has heading spaces, they should be removed from its inner block
    len = state.tShift[startLine];

    state.line = nextLine + (haveEndMarker ? 1 : 0);

    state.tokens.push({
      type: name + '_open',
      lines: [ startLine, state.line ],
      level: state.level
    });
    state.tokens.push({
      type: 'inline',
      content: state.getLines(startLine + 1, nextLine, len, false),
      level: state.level + 1,
      lines: [ startLine, nextLine ],
      children: []
    });
    state.tokens.push({
      type: name + '_close',
      level: state.level
    });

    return true;
  }
};
