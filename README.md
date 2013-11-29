# Inview

jQuery plugin to run a function when an element is within the viewport

## Getting Started
Download the [minified version][min] or the [raw version][max].

[min]: https://raw.github.com/kevchapman/inView/master/dist/inView.min.js
[max]: https://raw.github.com/kevchapman/inView/master/dist/inView.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="src/inView.min.js"></script>
<script>
jQuery(function($) {
  $('jquery selector').inView({
  	namespace: 'mynamespace', // used to add a key to the eventstack so it can be removed once fired
  	callback: function(){
  		// code to be run when element is within the viewport
  	},
  	offset: 0 // used to reduce the V distance used when calculating the elements height (can use -n to increase the distance) 
  });
});
</script>
```

## Examples
see demo/index.html
