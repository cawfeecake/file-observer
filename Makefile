build: clean
	mkdir -p _site
	# TODO have index.html ref all htmls for each *file* of *files*
	# note: order after ./generate_files_html.js call?
	cp index.html _site/
	cp styles.css _site/
	#cat templates/diffs.html | ./generate_files_html.js > _site/diffs.html
	jq '.files[0]' input-files.json | ./generate_file_diff_json.js > /tmp/tmp.json
	cat /tmp/tmp.json | ./generate_file_diff_html.js > _site/diffs.html

.PHONY: build

clean:
	rm -rf _site
	rm -rf __tmp_*/
.PHONY: clean
