1. add workflow that updates file[, repo ] data
1. trigger that workflow from outside repos' events when tracked files are changed

## nice to know...

context: when running `cat input.txt | ./node1.js | ./node2.js`, an error is thrown due to, I'm assuming,
how `process.stdin` is being read

so, how can I set up a NodeJS script to be able to be chained with pipes?
