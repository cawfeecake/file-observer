SHELL := /bin/bash

build: clean
	mkdir -p _site
	# first, generate index HTML
	jq '[ .files[].filepath ] | to_entries | map({filepath: .value, index: .key}) | { files: . }' input-files.json \
		| npx mustache - index.html.mustache > _site/index.html
	cp styles.css _site/
	# then, generate HTML for diffs of files
	for i in {0..$(shell jq '.files | length - 1' input-files.json)}; do \
	  tmp_json=$$(mktemp); \
	  jq --argjson i "$$i" '.files[$$i]' input-files.json | ./generate_file_diffs_json.js \
	      | jq --argjson defaults "$$(< input-template.json)" '$$defaults * .' \
	      | npx mustache - templates/diffs.html.mustache > _site/diffs_$$i.html; \
	done;
.PHONY: build

clean:
	rm -rf _site
	rm -rf __tmp_*/
.PHONY: clean

cleanclean: clean
	rm -rf node_modules
.PHONY: cleanclean
