# TextStatWatch

A command-line tool to continuously display the number of matches for given regexes in a given file.

## Usage

First, run `yarn; yarn build` to install dependencies and run the Typescript compiler. This need only be done once.

Then, to use this command-line tool, run `node out/index.js <file> <regex> <regex>...`, with the file you want to watch and the regexes you want to watch for.

## Examples

Monitor current word- and line-count:
`node out/index.js foo.txt "\w+" "\n"`

Monitor current word-, line-, and sentence-count:
`node out/index.js foo.txt "\w+" "\n" "[.?\!]\s"`

How many TODO comments are there in this file?
`node out/index.js index.js "TODO`

How often am I mentioning each of the main characters in this story?
`node out/index.js draft_1.txt "Alice" "Bob"`

How many sentences are there, and how many contain dialogue?
`node out/index.js draft_1.txt "[.?!]\s" "[\"“][^\"“”]+[\"”]"`

I've been accused of overusing dashes and semicolons. Let's keep an eye on that:
`node out/index.js draft_1.txt ";" " [-–] "`
