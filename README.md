# remarkable-furigana

## This plugin for remarkable allows you to add furigana characters to your markdown documents.


For example, writing something like this in your document: ``ご｛機嫌｝（きげん）よ``   will end up looking like   "ご<ruby>機嫌<rt>きげん</rt></ruby>よ".

If you're on NPM that last line won't render correctly. What it should do for ruby tags is place the hiragana over the kanji, but for some reason NPM doesn't want this. If you need convincing that something has actually occured here is what the unrendered html output looks like ご&lt;ruby&gt;機嫌&lt;rt&gt;きげん&lt;/rt&gt;&lt;/ruby&gt;よ.


### multiple syntaxes
The 'fat' brackets you type with your IME will work｛本｝（ほん） => <ruby>本<rt>ほん</rt></ruby>
The 'skinny' ascii brackets work as well  {本}(hon) => <ruby>本<rt>hon</rt></ruby>

It is important that you consistently use the same kind of bracket though.
If you use a 'fat bracket' and close it with a 'skinny one' like so "（ ) " the plugin will not work and you'll have a bad time.


#### single character syntax
You can enable a short single character syntax that's just ```字（じ）```.
The character before the parenthesis must be a Kanji character. The same rules apply as before for the parens.
To enable single syntax pass ```{'single': true}``` when you call ```.use```.
#### curly bracket syntax
Curly bracket syntax is enabled by default and it works by enclosing the kanji in curly brackets and the ruby in parenthesis. Like so {漢字}(かんじ). (notice that I used ascii brackets consistently).
You may also disable the curly bracket syntax by passing in ```'bracket': false``` with your options to md.use

See [remarkable](https://github.com/jonschlinkert/remarkable) for more documentation on initializing remarkable.

### try it out
To try it on your own machine run ```npm install``` then ``node example.js``

To run tests use ```npm test```

To run tests in your browser run ```npm run browser_test``` then navigate to where the nice http-server tells you to in whichever browser and hopefully you'll see your browser pass all of the tests.



If you are impatient and would like to try it in your browser right now on [runkit](https://npm.runkit.com/remarkable-furigana), then follow that url and copy and paste the code below into the site.
```javascript
var remarkableFurigana = require("remarkable-furigana")
var remarkable = require("remarkable")

var md = new remarkable()

md.use(remarkableFurigana, {'single': true, 'bracket': true})

console.log(md.render("利（り）にまどふは、すぐれて愚（おろ）かなる人（ひと）なり"))
console.log(md.render("{古文練習}(こぶんれんしゅう)"))

```






