GIT ?= git
ZIP ?= zip

all: twitter-icon-notifier.zip

clean:
	rm -f twitter-icon-notifier.zip

twitter-icon-notifier.zip: background.js extension-icon-128.png manifest.json notify.js
	$(ZIP) $@ $^

# vim: set noet ts=8 sw=8:
