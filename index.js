/**
 * Module Dependencies
 */

const assign = require('object-assign')
const flatten = require('flatten')
const sliced = require('sliced')
const slice = require('sliced')
const { h } = require('preact')

/**
 * Decifer the elements
 */

const [
  tags,
  index,
  all,
  attributes
] = require('./elements.json')

const Attributes = index.reduce((attrs, keys, i) => {
  const tag = tags[i]
  if (keys) attrs[tag] = all.concat(keys.map(k => attributes[k]))
  else attrs[tag] = all
  return attrs
}, {})

/**
 * isBrowser
 */

const isBrowser = typeof window !== 'undefined'

/**
 * Utils
 */

const isObject = v => Object.prototype.toString.call(v) === '[object Object]'
const isClass = (v) => /class(name)?/i.test(v)
const has = (o, v) => o.hasOwnProperty(v)
const isArray = v => Array.isArray(v)
const truthy = (v) => !!v

/**
 * Create functions from all the tags
 */

tags.forEach(name => { exports[name] = Component(name) })

/**
 * Create a custom component
 */

exports.component = Component

/**
 * Override HTML
 */

const html = exports.html
exports.html = function (mixed) {
  if (!isBrowser) {
    return html.apply(html, arguments)
  } else if (mixed.nodeName || arguments.length > 1) {
    let nodes = flatten(slice(arguments))
    let body = nodes.filter(function (node) { return node.nodeName === 'body' })[0]
    if (!body || !body.children) return html.apply(html, arguments)
    else return body.children[0]
  } else {
    return html.apply(html, arguments)
  }
}

/**
 * Create a component
 */

function Component (name) {
  let attributes = [].concat(Attributes[name] || all)

  function Tag () {
    let attrs = {}

    function tag (mixed) {
      if (!arguments.length || (!mixed && mixed !== 0)) {
        return h(name, attrs)
      } else if (mixed.nodeName || arguments.length > 1) {
        return h(name, attrs, flatten(slice(arguments)))
      } else if (isArray(mixed)) {
        return h(name, attrs, flatten(mixed))
      } else if (!isObject(mixed)) {
        return h(name, attrs, mixed)
      } else if (has(mixed, 'toString')) {
        return h(name, attrs, String(mixed))
      }

      // attributes
      attrs = assign(attrs, mixed)
      return tag
    }

    // attach instance functions
    attributes.forEach(attr => { tag[attr] = IAttr(tag, attrs, attr) })
    tag.toJSON = () => h(name, attrs)

    // create an instance of the tag
    return tag.apply(null, arguments)
  }

  // attach static functions
  attributes.forEach(attr => { Tag[attr] = Attr(Tag, attr) })
  Tag.toJSON = () => h(name)

  return Tag
}

/**
 * Attribute builder function for all tags
 */

function Attr (fn, attr) {
  return function (value) {
    let attrs = {}
    attrs[attr] = isClass(attr)
      ? sliced(arguments).filter(truthy).join(' ')
      : value
    return fn(attrs)
  }
}

/**
 * Attribute builder for all tag instances
 */

function IAttr (fn, attrs, attr) {
  return function (value) {
    attrs[attr] = isClass(attr)
      ? sliced(arguments).filter(truthy).join(' ')
      : value
    return fn
  }
}
