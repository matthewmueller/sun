/**
 * Module Dependencies
 */

let { div, span, strong, component } = require('..')
let render = require('preact-render-to-string')
let assert = require('assert')

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
})
