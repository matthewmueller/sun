const Attributes = require('html-element-attributes')
const Tags = require('html-tag-names')
const flatten = require('lodash.flatten')
const values = require('object-values')
const uniq = require('lodash.uniq')
const fs = require('fs')

const Events = [
  'key',
  'onMount', 'onUnmount',
  'onCopy', 'onCut', 'onPaste',
  'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate',
  'onKeyDown', 'onKeyPress', 'onKeyUp',
  'onFocus', 'onBlur',
  'onChange', 'onInput', 'onSubmit',
  'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit',
  'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave',
  'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp',
  'onSelect',
  'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart',
  'onScroll',
  'onWheel',
  'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted',
  'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay',
  'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend',
  'onTimeUpdate', 'onVolumeChange', 'onWaiting',
  'onLoad',
  'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration',
  'onTransitionEnd'
]
let all = Attributes['*'].concat(Events)
// console.log(Attributes.meta)
delete Attributes['*']

let attributes = uniq(flatten(values(Attributes)))
// console.log(attributes.indexOf('content'))
let tags = [].concat(Tags)

let map = tags.map(function (tag) {
  let attrs = Attributes[tag]
  if (!attrs) return 0
  return attrs.map(function (attr) {
    let i = attributes.indexOf(attr)
    if (!~i) throw new Error('attr not found: ' + attr)
    return i
  })
})

// console.log(tags.indexOf('meta'))
// console.log(map[84].map(i => attributes[i]))
// console.log(map)
fs.writeFileSync(__dirname + '/elements.json', JSON.stringify([ tags, map, all, attributes]))
