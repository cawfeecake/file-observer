#!/usr/bin/env ruby

# note about passing env vars...
# HELLO='["a","b"]' ruby tmp.rb ... ENV["HELLO"]

require 'json'
# the 1st script argument is the JSON data file
file = File.read("./#{ARGV[0]}")
template_hash = JSON.parse(file)

require 'mustache'
# template is fed in thru a pipe from STDIN
input_template = $stdin.read
puts Mustache.render(input_template, template_hash)
