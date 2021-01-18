const { areaData, suffixMap } = require('./areaData2.js')

const ChinaArea = function(options) {
  if (options && Object.keys(options).length === 0) {
    options = {}
  }
  this.defaults = Object.assign({}, {
    sortname: false,
    format: {
      key: 'key',
      value: 'value',
      children: 'children'
    },
    deep: 3
  }, options)
  this.regionData = {}
}

const ObjectType = function(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object |]$/g, '').toLowerCase()
}

const handlerData = function(data, pcode, deep, options) {
  let regionData = []
  data = data || areaData
  for (let key in data) {
    let province = {}
    let city = data[key]
    let value = typeof city === 'string' ? city : city.v
    let suffix = ''
    if (!options.sortname) {
      let suffixIndex = parseInt(value.replace(/[^\d]+/, ''))
      if (suffixIndex !== NaN) {
        suffix = suffixMap[suffixIndex] || ''
      }
    }
    if (key.length % 2) {
      key = '0' + key
    }
    let code = pcode
    if (code.length === 4 && key.length > 2) {
      code = code.substr(0, 2)
    }
    code = (code + key).toString()
    if (city.c && deep < options.deep) {
      let new_deep = deep + 1
      province[options.format.children] = handlerData(city.c, code, new_deep, options)
    }
    if (code.length < 6) {
      code = code.padEnd(6, 0)
    }
    value = value && value.replace(/[\d]+/, '')
    province[options.format.key] = code
    province[options.format.value] = value + suffix
    regionData.push(province)
  }
  return regionData
}

ChinaArea.prototype.region = function(options) {
  if (options && Object.keys(options).length === 0) {
    options = {}
  }
  options = Object.assign({}, this.defaults, options)
  let key = options.deep.toString() + options.sortname.toString() + options.format.key + options.format.value + options.format.children
  if(!this.regionData[key]) {
    this.regionData[key] = handlerData(null, '', 1, options)
  }
  return this.regionData[key]
}

ChinaArea.prototype.init = function(code, options) {
  if (options && Object.keys(options).length === 0) {
    options = {}
  }
  options = Object.assign({}, this.defaults, options)
  let provinces = handlerData(null, '', 1, Object.assign({}, options, {
    deep: 1
  }))
  let districts = []

  if (ObjectType(code) === 'array') {
    code = code[2] || code[1] || code[0]
  }

  if(!code || options.deep === 1) {
    return [provinces, [], []]
  }

  let pcode = code.substr(0, 2)

  let citys = areaData[pcode] && areaData[pcode].c || []

  if (citys) {
    if(options.deep === 3) {
      let real_city
      let ccode = code.substr(2, 2)
      let ccode_n = parseInt(ccode).toString()
      let ccode_t = ccode_n.length % 2 ? ccode_n.padStart(ccode_n.length + 1, 0) : ccode_n
      if(/\d{2}90/.test(code)) {
        let keys = Object.keys(citys)
        ccode_t = keys[keys.length - 1]
        real_city = citys[ccode_t]
      }
      let city_list = null
      if(real_city && real_city.c) {
        city_list = real_city.c
      }
      if(!city_list && citys[ccode_n] && citys[ccode_n].c) {
        city_list = citys[ccode_n].c
      }
      if (city_list) {
        districts = handlerData(city_list, pcode + ccode_t, 1, options)
      }
    }
    citys = handlerData(citys, pcode, 1, options)
  }
  return [provinces, citys, districts]
}

ChinaArea.prototype.echo = function(code, options) {
  if (options && Object.keys(options).length === 0) {
    options = {}
  }
  options = Object.assign({}, this.defaults, options, {
    deep: 3
  })

  if (ObjectType(code) === 'array') {
    code = code[2] || code[1] || code[0]
  }

  if(!code) {
    return []
  }

  code = code.toString()

  const data = this.region(options)

  let pcode = code.substr(0, 2).padEnd(6, 0)
  let ccode = code.substr(0, 4).padEnd(6, 0)

  let province = ''
  let city = ''
  let district = ''

  let pIndex = data.findIndex((p) => {
    return p[options.format.key] === pcode 
  })

  if(pIndex !== -1) {
    province = data[pIndex][options.format.value]
    const citys = data[pIndex][options.format.children]
    if(citys) {
      let cIndex = citys.findIndex((c) => {
        return c[options.format.key] === code || c[options.format.key] === ccode
      })
      if(/\d{2}90/.test(ccode) && cIndex === -1) {
        cIndex = citys.length - 1
      }
      if(cIndex !== -1) {
        city = citys[cIndex][options.format.value]
        const districts = citys[cIndex][options.format.children]
        if(districts) {
          let dIndex = districts.findIndex((d) => {
            return d[options.format.key] === code
          })
          if(dIndex !== -1) {
            district = districts[dIndex][options.format.value]
          }
        }
      }
    }
  }

  return [province, city, district]
}

var cnArea = new ChinaArea({
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
})

module.exports = ChinaArea