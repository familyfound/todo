
build: components index.js todo.css template.js
	@component build --dev

template.js: template.html
	@component convert $<

template.html: template.jade
	@jade -P $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
