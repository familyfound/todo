
default: build
	@:

build: index.js todo.css template.js
	@component build --dev

template.js: template.html
	@component convert $<

template.html: template.jade
	@jade -P $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

# open browser correctly in mac or linux
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
		open := google-chrome
endif
ifeq ($(UNAME_S),Darwin)
		open := open
endif

example: build
	@${open} test/example.html

.PHONY: clean
