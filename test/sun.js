/**
 * Module Dependencies
 */

let { div, span, strong, component, html, head, title, meta, link, body } = require('..')
let render = require('preact-render-to-string')
let assert = require('assert')
let { h } = require('preact')

describe('sun', function () {
  it('should work with basic text', function () {
    let d = div('hi')
    assert.equal(render(d), '<div>hi</div>')
  })

  it('should work with an object of attributes', function () {
    let d = div({ fruit: 'apple' })('hi')
    assert.equal(render(d), '<div fruit="apple">hi</div>')
  })

  it('should work with children', function () {
    let d = div({ fruit: 'orange' })([
      span('hi'),
      div({ world: true })('world')
    ])

    assert.equal(render(d), '<div fruit="orange"><span>hi</span><div world>world</div></div>')
  })

  it('should support 1 sun child', function () {
    let d = div(span('hi'))
    assert.equal(render(d), '<div><span>hi</span></div>')
  })

  it('should stringify objects with toString()', function () {
    let d = div(span({ toString: () => 'hi' }))
    assert.equal(render(d), '<div><span>hi</span></div>')
  })

  it('should handle custom attributes with booleans', function () {
    let d = div({ custom: true })('hi')
    assert.equal(render(d), '<div custom>hi</div>')
  })

  it('should handle empty tags with attributes', function () {
    let d = div({ custom: true })()
    assert.equal(render(d), '<div custom></div>')
  })

  it('should work with undefined', () => {
    let d = div(undefined)
    assert.equal(render(d), '<div></div>')
  })

  it('should work with false', () => {
    let d = div(false)
    assert.equal(render(d), '<div></div>')
  })

  it('should work with 0', () => {
    let d = div(0)
    assert.equal(render(d), '<div>0</div>')
  })

  it('should work with null', () => {
    let d = div(null)
    assert.equal(render(d), '<div></div>')
  })

  it('should work with empty strings', () => {
    let d = div('')
    assert.equal(render(d), '<div></div>')
  })

  it('should handle empty tags', function () {
    assert.equal(render(div()), '<div></div>')
  })

  it('should handle classes with text', function () {
    let d = div.class('orange').id('hi')({ fruit: 'orange' })('hi')
    assert.equal(render(d), '<div class="orange" id="hi" fruit="orange">hi</div>')
  })

  it('should handle classes with children', function () {
    let d = div.class('orange').id('hi')({ fruit: 'orange' })([
      span('hi'),
      div({ world: true })('world')
    ])
    assert.equal(render(d), '<div class="orange" id="hi" fruit="orange"><span>hi</span><div world>world</div></div>')
  })

  it("should work with what's on the readme", function () {
    const App = ({ name }) => (
    div.class('App')(
        span('hello'),
        strong('matt')
    )
    )
    assert.equal(render(App({ name: 'matt' })), '<div class="App"><span>hello</span><strong>matt</strong></div>')
  })

  it('should have the events', function () {
    let a = function (a) {}
    let b = function (b) {}
    let vnode = div.onClick(a).onMouseDown(b)()
    assert.equal(vnode.attributes.onClick.toString(), a.toString())
    assert.equal(vnode.attributes.onMouseDown.toString(), b.toString())
  })

  it('should support high order component functions', function () {
    let styling = component(function ({ class: cls, children }) {
      assert.equal(cls, 'whatever')
      return children[0]
    })

    let s = styling.class('whatever')(
      div.class('wahtever')(
        strong('hi')
      )
    )

    assert.equal(render(s), '<div class="wahtever"><strong>hi</strong></div>')
  })

  it('should support arrays of arrays', function () {
    let todos = [ { title: 'a' }, { title: 'b' } ]
    let d = div({ fruit: 'orange' })(
      span('hi'),
      todos.map(todo => strong(todo.title))
    )
    assert.equal(render(d), '<div fruit="orange"><span>hi</span><strong>a</strong><strong>b</strong></div>')
  })

  it('should support a list of classes', function () {
    let d = div.class(true && 'a', false && 'b', 'c' || 'd')()
    assert.equal(render(d), '<div class="a c"></div>')
  })

  it('should support passing an array of classes', () => {
    let d = div.class(['a', false], 'c')()
    assert.equal(render(d), '<div class="a c"></div>')
  })

  it('should support passing functions in', function () {
    let fn = function () {}
    let d = div.onClick(fn)()
    assert.equal(d.attributes.onClick, fn)
    assert.equal(typeof d.attributes.onClick, 'function')
  })

  it('should work a vnode child', () => {
    let d = div(h('h2', { class: 'blue' }, ['hi there!']))
    assert.equal(render(d), '<div><h2 class="blue">hi there!</h2></div>')
  })

  it('should work vnode children', () => {
    let d = div([
      h('h2', { class: 'blue' }, ['2']),
      h('h3', { class: 'blue' }, ['3'])
    ])

    assert.equal(render(d), '<div><h2 class="blue">2</h2><h3 class="blue">3</h3></div>')
  })

  it('should ignore html, head & body tags', () => {
    let d = html(
      head(
        title('hello world!'),
        meta({ name: 'description' }).content('some description')(),
        link.href('index.css').rel('stylesheet')()
      ),
      body(
        div('hello world!')
      )
    )

    assert.equal(render(d), '<html><head><title>hello world!</title><meta name="description" content="some description"><link href="index.css" rel="stylesheet"></head><body><div>hello world!</div></body></html>')
  })

  it('should support mounts', () => {
    assert.equal(typeof div.onMount, 'function')
    assert.equal(typeof div.onUnmount, 'function')
  })

  it('should support keys', () => {
    assert.equal(typeof div.key, 'function')
  })
})
