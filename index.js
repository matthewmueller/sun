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

const is_object = v => Object.prototype.toString.call(v) === '[object Object]'
const is_string = v => typeof v === 'string'
const has = (o, v) => o.hasOwnProperty(v)
const is_array = v => Array.isArray(v)

/**
 * Create functions from all the tags
 */

module.exports = Tags.reduce((exports, name) => {
  let attributes = Attributes['*'].concat(Attributes[name])

  function Tag () {
    let attrs = {}

    function tag (mixed) {
      if (!arguments.length) {
        return h(name, attrs)
      } else if (mixed.nodeName || arguments.length > 1) {
        return h(name, attrs, slice(arguments))
      } else if (is_array(mixed) || !is_object(mixed)) {
        return h(name, attrs, mixed)
      } else if (has(mixed, 'toString')) {
        return h(name, attrs, String(mixed))
      }

      // attributes
      attrs = assign(attrs, mixed)
      return tag
    }

    // attach instance functions
    attributes.forEach(attr => tag[attr] = IAttr(tag, attrs, attr))
    tag.toJSON = () => h(name, attrs)

    // create an instance of the tag
    return tag.apply(null, arguments)
  }

  // attach static functions
  attributes.forEach(attr => Tag[attr] = Attr(Tag, attr))
  Tag.toJSON = () => h(name)

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
