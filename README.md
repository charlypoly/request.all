Request.All
=================

the script is NOT ready for use for now, it's just a non-working prototype..
Some working updates will come soon.

meanwhile i advice you to look at this snippet : https://gist.github.com/wittydeveloper/5618929

=================

Mootools Request Watcher



Examples @todo

```
Request.all(function(json) {
  if (json.error) {
    this.preventDefault();
		console.error('Server error')
  }
})
```

- [ ] Request.filter(filter, callback)
- [ ] Request.block(filter)
- [ ] Request.redirect(filter, uri)
