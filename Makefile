SHELL := /bin/bash

build: clean
	mkdir -p _site
	# TODO have index.html ref all htmls for each *file* of *files*
	# note: order after ./generate_files_html.js call?
	cp index.html _site/
	cp styles.css _site/
	for i in {0..$(shell jq '.files | length - 1' input-files.json)}; do \
	  tmp_json=$$(mktemp); \
	  jq --argjson i "$$i" '.files[$$i]' input-files.json | ./generate_file_diff_json.js > $$tmp_json; \
	  cat $$tmp_json | ./generate_file_diff_html.js > _site/diffs_$$i.html; \
	done;
.PHONY: build

clean:
	rm -rf _site
	rm -rf __tmp_*/
.PHONY: clean
