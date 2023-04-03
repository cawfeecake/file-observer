## Would like to figure out...

how do I set it up where I can chain 2 node scripts together w/ pipes?

`cat input.txt | ./node1.js | ./node2.js` at the moment throws an error due to (I assume) how stdin is being read.
__will most likely need to look into NodeJS libraries like process.stdin to read data__
