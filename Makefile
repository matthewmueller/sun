
test: browser
	@./node_modules/.bin/mocha \
		--reporter spec \
		test/sun.js

browser:
	@./node_modules/.bin/devtool node_modules/mocha/bin/_mocha -qc -- -b test/browser.js

.PHONY: test
