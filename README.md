# Any Aspect Ratio Carousel

Yet another Carousel! But this one has these features:

- Images of any aspect ratio can be viewed fully without specifying their size
- Low footprint, little JS to download and parse, no dependencies
- Adapts to any container's width
- Mobile friendly (swipe events, responsive)
- Fails gracefully on absence of JS (shows list of images)
- Only for `img` elements (may get support for `picture` element in the future)



## Install

### With [Browserify](http://browserify.org/)

```
npm install --save any-aspect-ratio-carousel
```

```
// main.js

import aarCarousel from 'any-aspect-ratio-carousel'

document.addEventListener('DOMContentLoaded', () => {
  aarCarousel({
    height: '88vh',
    slideTransitionDuration: 576, // milliseconds
  });
});
```

### With `script` element

Download [/dist/aarCarousel.min.js](https://raw.githubusercontent.com/DrummerHead/any-aspect-ratio-carousel/master/dist/aarCarousel.min.js) to your project and then

```
<!doctype html>
<html>
<head>
  [...]
</head>
<body>

  <div class='aar-carousel'>
    [...]
  </div>

  <script src='/my-script-location/aarCarousel.min.js'></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      aarCarousel({
        height: '88vh',
        slideTransitionDuration: 576, // miliseconds
      });
    });
  </script>
</body>
</html>
```



## Usage

The HTML required for the gallery is:

```
<div class='aar-carousel'>
  <ol>
    <li>
      <img src='alpha.jpg' alt='alpha'>
    </li>
    <li>
      <img src='bravo.png' alt='bravo'>
    </li>
    <li>
      <img src='and-so-forth.gif' alt='any amount of li with images'>
    </li>
  </ol>
</div>
```

There can be any amount of galleries in a page.

And to initialize the gallery:

```
aarCarousel({
  height: '88vh',
  slideTransitionDuration: 576,
  imagePanning: false,
});
```

With these possible settings:

**height** {string}  
The height of the carousel.  
Defaults to '88vh' if not specified.

**slideTransitionDuration** {number}  
How long the transition is between one image and the other, in milliseconds.  
Defaults to '576' if not specified.

**imagePanning** {boolean}  
Whether to use the panning effect or not.  
Defaults to `false` if not specified.

[See an example](http://mcdlr.com/any-aspect-ratio-carousel/#usage)


### Panning effect

If the `imagePanning` attribute is set to true, the images on the carousel will fill the available space and pan right/left or top/down to show all the image (depending on the ratio). Take notice that this effect does not work in Safari (Safari does not animate `object-position`).

```
aarCarousel({
  height: '88vh',
  slideTransitionDuration: 576, // milliseconds
  imagePanning: true,
});
```

[See an example](http://mcdlr.com/any-aspect-ratio-carousel/#panning_effect)


### Inline attributes

You can have as many galleries in a page as you want. With the initializing JS you can configure all of them.

However, if you'd like a particular gallery to have different settings, you can assign it inline attributes that will override the defaults set by you, like so:

```
<div class='aar-carousel' data-height='120em' data-slide-transition-duration='777' data-image-panning>
  <ol>
    <li>
      <img src='alpha.jpg' alt='alpha'>
    </li>
    <li>
      <img src='bravo.png' alt='bravo'>
    </li>
    <li>
      <img src='and-so-forth.gif' alt='any amount of li with images'>
    </li>
  </ol>
</div>
```

While `data-height` and `data-slide-transition-duration` need explicit values, `data-image-panning` only needs to be present to be true (and its absence means false, unless stated in the initializing JS)



## Compatibility

TODO: Test in different browsers. Spoiler alert: will not work on IE6.



## Development

The CSS for the final product is shipped with the JS iteslf via [insert-css](https://github.com/substack/insert-css), but for development we need to deal with the CSS uninjected. To do this:

1. On `src/javascript/main.js` comment out `import ins from './insert-css-dep';` and `ins();`
2. On `demo/index.html` uncomment `<link rel='stylesheet' href='tmp/stylesheets/main.css'>`

And after this dance, run:

```
gulp serve
```

To run a localhost server. If you have a better way to do this process, recommendations and forks accepted :)

After doing your changes, lint the code with:

```
gulp js-lint
```

Make any fixes if necessary and then

```
gulp scss-lint
```

Make any fixes if necessary and then you'll have to reverse the previous steps, namely:

1. On `src/javascript/main.js` uncomment `import ins from './insert-css-dep';` and `ins();`
2. On `demo/index.html` comment `<link rel='stylesheet' href='tmp/stylesheets/main.css'>`

And then run

```
gulp build-js
```

To generate the final bundle.
