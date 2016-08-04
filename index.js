/**
 * Module Dependencies
 */

const Attributes = require('html-element-attributes')
const assign = require('object-assign')
const Tags = require('html-tag-names')
const slice = require('sliced')
const { h } = require('preact')

/**
 * Utils
 */

const is_string = v => typeof v === 'string'
const is_array = v => Array.isArray(v)

/**
 * Create functions from all the tags
 */

module.exports = Tags.reduce((exports, name) => {
  let attributes = Attributes['*'].concat(Attributes[name])

  function Tag () {
    let attrs = {}

    function tag (mixed) {
      // text node or children?
      if (is_string(mixed) || is_array(mixed)) {
        return h(name, attrs, mixed)
      } else if (arguments.length > 1) {
        return h(name, attrs, slice(arguments))
      }

      // attributes
      attrs = assign(attrs, mixed)
      return tag
    }

    // attach instance functions
    attributes.forEach(attr => tag[attr] = IAttr(tag, attrs, attr))

    // create an instance of the tag
    return tag.apply(null, arguments)
  }

  // attach static functions
  attributes.forEach(attr => Tag[attr] = Attr(Tag, attr))

  exports[name] = Tag
  return exports
}, {})

/**
 * Attribute builder function for all tags
 */

function Attr(fn, attr) {
  return function (value) {
    return fn({ [attr]: value })
  }
}

/**
 * Attribute builder for all tag instances
 */

function IAttr(fn, attrs, attr) {
  return function (value) {
    attrs[attr] = value
    return fn
  }
}
