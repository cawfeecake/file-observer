#!/usr/bin/env node

const { execSync } = require('child_process')
const { mkdtempSync, readFileSync, writeFileSync } = require('fs')
const { basename } = require('path')

const AnsiConverter = require('ansi-to-html')


// usage: takes in JSON with the following properties:
// - "filepath": the path to a file relative to a repository's root
// - "repos": an array ([ ... ]) of names of the repos from which to get copies of the file
const { filepath, repos } = JSON.parse(
    readFileSync(process.stdin.fd, 'utf-8')
)

const reposByContent = new Map() // collects repos together that have equal content
const uniqRepos = [...new Set(repos)]
uniqRepos.map(repoName => {
  const getEncodedContentCmd = `gh api repos/cawfeecake/${repoName}/contents/${filepath} --jq '.content'`
  const encodedContent = execSync(getEncodedContentCmd, { shell: '/bin/bash' }).toString().replace(/\n/g, '')
  if (reposByContent.has(encodedContent)) {
    const reposWithSameContent = reposByContent.get(encodedContent)
    reposByContent.set(encodedContent, [...reposWithSameContent, repoName])
  } else {
    reposByContent.set(encodedContent, [repoName])
  }
})

// at this point, we have done all necessary calls to GitHub (w/o double requests)

const ansiConverter = new AnsiConverter()
const tmpDir = mkdtempSync(`__tmp_${basename(__filename)}`)
let count = 0
const filepathToCompareAgainst = `${tmpDir}/${count}`
const htmlTemplateInput = [...reposByContent.entries()].sort((a, b) => b[1].length - a[1].length).map(([content, repos]) => {
  // in order from most repos to lease
  const file = Buffer.from(content, 'base64').toString('ascii')
  const filepath = `${tmpDir}/${count}`
  writeFileSync(filepath, file)

  let diffContent
  if (count++ == 0) {
    diffContent = file
  } else { // count > 0
    try {
      execSync(`git diff --color=always --no-index ${filepathToCompareAgainst} ${filepath}`, { shell: '/bin/bash' })
    } catch (err) {
      // .status: cmd's exit code
      // .message: reason for the error
      // .stderr.toString(): ???
      // .stdout.toString(): what the cmd had sent to output before error
      diffContent = err.stdout.toString()
    }
    if (!diffContent) {
      throw new Error('`git diff ...` returned no differences which is unexpected!');
    }
  }

  return {
    repos,
    content: ansiConverter.toHtml(diffContent)
  }
})
console.log(JSON.stringify({
    filepath,
    diffs: htmlTemplateInput,
}))
