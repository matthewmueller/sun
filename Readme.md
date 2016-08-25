
# sun

  Simple little virtual DOM node builder for Preact.

## Example

```js
let render = require('preact-render-to-string')
let { div, span, strong } = require('sun')

const App = ({ name }) => (
  div.class('App')(
    span('hello'),
    strong(name)
  )
)

render(App({ name: 'matt' }))
// <div class="App"><span>hello</span><strong>matt</strong></div>
```

## Features

- Functions for all valid HTML elements
- Functions for all valid HTML attributes on each element
- Supports custom attributes (e.g. `span({ custom: 'attribute' })('hi there!')`)
- Proudly built for [Preact](https://github.com/developit/preact)

## Installation

```bash
npm install sun
```

## High-Order Components

High-Order Components are a powerful technique for modifying
children on the fly. Here's how you can do it with sun.

```js
let render = require('preact-render-to-string')
let { component } = require('sun')

let styling = component(function ({ class: cls, children }) {
  assert.equal(cls, 'whatever')
  return children[0]
})

let app = styling.class('whatever')(
  div.class('wahtever')(
    strong('hi')
  )
)

assert.equal(render(app), '<div class="wahtever"><strong>hi</strong></div>')
```

## Where you can Help

- Performance tuning
- React support

## Test

```bash
npm install
make test
```

## License

MIT
