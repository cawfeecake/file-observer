#!/usr/bin/env node

const { execSync } = require('child_process')
const { readFileSync } = require('fs')

const Mustache = require('mustache')


const fileDiffJson = JSON.parse(
    readFileSync(process.stdin.fd, 'utf-8')
)
const defaultTemplateInput = require('./input-template.json')
const inputJson = {
  ...defaultTemplateInput,
  ...fileDiffJson,
}

const template = readFileSync('./templates/diffs.html', 'utf-8')
const output = Mustache.render(template, inputJson)
console.log(output)
/**
 * template expects shape of "inputJson" to be:
 *
 * {
 *   "title": "",
 *   "filepath": "",
 *   "diffs": [
 *     {
 *       "repos": ["", ...],
 *       "content": "",
 *     }, ...
 *   ]
 * }
 *
 */
