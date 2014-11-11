/**
 * font variant convertion map
 *
 * @type {Object}
 */
var fontVariantProperties = {
  "font-variant-ligatures": {
    "common-ligatures": "\"liga\", \"clig\"",
    "no-common-ligatures": "\"liga\", \"clig off\"",
    "discretionary-ligatures": "\"dlig\"",
    "no-discretionary-ligatures": "\"dlig\" off",
    "historical-ligatures": "\"hlig\"",
    "no-historical-ligatures": "\"hlig\" off",
    contextual: "\"calt\"",
    "no-contextual": "\"calt\" off"
  },

  "font-variant-position": {
    sub: "\"subs\"",
    "super": "\"sups\""
  },

  "font-variant-caps": {
    "small-caps": "\"c2sc\"",
    "all-small-caps": "\"smcp\", \"c2sc\"",
    "petite-caps": "\"pcap\"",
    "all-petite-caps": "\"pcap\", \"c2pc\"",
    unicase: "\"unic\"",
    "titling-caps": "\"titl\""
  },

  "font-variant-numeric": {
    "lining-nums": "\"lnum\"",
    "oldstyle-nums": "\"onum\"",
    "proportional-nums": "\"pnum\"",
    "tabular-nums": "\"tnum\"",
    "diagonal-fractions": "\"frac\"",
    "stacked-fractions": "\"afrc\"",
    ordinal: "\"ordn\"",
    "slashed-zero": "\"zero\""
  },

  "font-variant": {
    normal: "normal",
    inherit: "inherit"
  }
}

// The `font-variant` property is a shorthand for all the others.
for (var prop in fontVariantProperties) {
  var keys = fontVariantProperties[prop]
  for (var key in keys) {
    fontVariantProperties["font-variant"][key] = keys[key]
  }
}

/**
 * Expose the font-variant plugin.
 */
module.exports = function postcssFontVariant() {
  return function(styles) {
    // read custom media queries
    styles.eachDecl(function(decl) {
      if (!fontVariantProperties[decl.prop]) {
        return null
      }

      var newValue = decl.value
      if (decl.prop === "font-variant") {
        newValue = decl.value.split(/\s+/g).map(function(val) {
          return fontVariantProperties["font-variant"][val]
        }).join(", ")
      }
      else if (fontVariantProperties[decl.prop][decl.value]) {
        newValue = fontVariantProperties[decl.prop][decl.value]
      }

      var newDecl = decl.clone()
      newDecl.prop = "font-feature-settings"
      newDecl.value = newValue
      decl.parent.insertBefore(decl, newDecl)
    })
  }
}
