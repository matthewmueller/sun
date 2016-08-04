
# sun

  Simple little virtual DOM node builder for Preact & React.

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
- Supports custom attributes (e.g. `span({ custom: 'attribute' })('hi there!')`
- Build to Preact

## Installation

```bash
npm install sun
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
