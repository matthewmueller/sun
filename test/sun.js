/**
 * Module Dependencies
 */

let render = require('preact-render-to-string')
let { div, span, strong } = require('..')
let assert = require('assert')

describe('sun', function() {

  it('should work with basic text', function() {
    let d = div('hi')
    assert.equal(render(d), '<div>hi</div>')
  })

  it('should work with an object of attributes', function() {
    let d = div({ fruit: 'apple' })('hi')
    assert.equal(render(d), '<div fruit="apple">hi</div>')
  })

  it('should work with children', function() {
    let d = div({ fruit: 'orange' })([
      span('hi'),
      div({ world: true })('world')
    ])

    assert.equal(render(d), '<div fruit="orange"><span>hi</span><div world>world</div></div>')
  })

  it('should handle classes with text', function() {
    let d = div.class('orange').id('hi')({ fruit: 'orange' })('hi')
    assert.equal(render(d), '<div class="orange" id="hi" fruit="orange">hi</div>')
  })

  it('should handle classes with children', function() {
    let d = div.class('orange').id('hi')({ fruit: 'orange' })([
      span('hi'),
      div({ world: true })('world')
    ])
    assert.equal(render(d), '<div class="orange" id="hi" fruit="orange"><span>hi</span><div world>world</div></div>')
  })

  it("should work with what's on the readme", function() {
    const App = ({ name }) => (
      div.class('App')(
        span('hello'),
        strong('matt')
      )
    )
    assert.equal(render(App({ name: 'matt' })), '<div class="App"><span>hello</span><strong>matt</strong></div>')
  })
})
