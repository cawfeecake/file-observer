build:
	mkdir _site
	cp index.html _site/
	cp styles.css _site/
	cat templates/files.html | ./generate_files_html.rb template_data.json > _site/random.html
.PHONY: build

clean:
	rm -rf _site
.PHONY: clean
