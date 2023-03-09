#!/usr/bin/env ruby

# note about passing env vars...
# HELLO='["a","b"]' ruby tmp.rb ... ENV["HELLO"]

require 'json'
# the 1st script argument is the JSON data file
file = File.read("./#{ARGV[0]}")
template_hash = JSON.parse(file)

# decode the base64 file content
require 'base64'
items_decoded = template_hash['items'].map { |item| { content: Base64.decode64(item['content']), repos: item['repos'] } }

template_hash['items'] = items_decoded

require 'mustache'
# template is fed in thru a pipe from STDIN
input_template = $stdin.read
puts Mustache.render(input_template, template_hash)
