# vue中不使用methods，优雅地使用省市区三级联动

## 组件
### ChinaArea.vue
```html
<template>
  <components :is="tag">
    <slot name="default" v-bind="{ regionData }" />
  </components>
</template>
<script>
import chinaArea from '@mlinquan/china-area-got'

const cnArea = new chinaArea({
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
})

export default {
  name: 'ChinaArea',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: [String, Array],
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      regionData: cnArea.init(this.value),
      preEmitValue: null,
      currentVal: null
    }
  },
  watch: {
    value: {
      handler(nv, ov) {
        /* if (ov === undefined) {
          this.regionData = cnArea.init(nv)
          return
        } */
        this.regionData = cnArea.init(nv)
        // 单个省份的情况
        if (typeof nv === 'string' || Array.isArray(nv) && nv.length === 1) {
          return
        }
        const nvCopy = nv && [...nv] || [null, null, null]
        const ovCopy = ov && [...ov] || [null, null, null]
        const cityDiff = nvCopy[1] && nvCopy[2] && nvCopy[1].slice(0, 3) !== nvCopy[2].slice(0, 3) || (nvCopy[1] && this.preEmitValue && this.preEmitValue[1] && nvCopy[1] !== this.preEmitValue[1])
        const provDiff = nvCopy[0] && nvCopy[1] && nvCopy[0].slice(0, 2) !== nvCopy[1].slice(0, 2) || (nvCopy[0] && this.preEmitValue && this.preEmitValue[0] && nvCopy[0] !== this.preEmitValue[0])
        let rval = [...nvCopy]
        if (cityDiff) {
          rval = [nvCopy[0], nvCopy[1], null]
        }
        if (provDiff) {
          rval = [nvCopy[0], null, null]
        }
        this.regionData = cnArea.init(rval)
        this.preEmitValue = rval
        if (nvCopy.toString() === rval.toString()) {
          return
        }
        this.$emit('input', rval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
```

## 应用场景
### xxxx.vue
单页多个省市联动，互不干扰和冲突，且不需要绑定change事件
``` html
<template>
  <div>
    <!-- 联动1 -->
    <china-area tag="div" v-model="r1">
      <template slot-scope="{ regionData }">
        <select v-model="r1[0]">
          <option v-for="(item, key) in regionData[0]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r1[1]">
          <option v-for="(item, key) in regionData[1]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r1[2]">
          <option v-for="(item, key) in regionData[2]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        {{ r1 }}
      </template>
    </china-area>
    <!-- 联动2 -->
    <china-area tag="div" v-model="r2">
      <template slot-scope="{ regionData }">
        <select v-model="r2[0]">
          <option v-for="(item, key) in regionData[0]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r2[1]">
          <option v-for="(item, key) in regionData[1]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r2[2]">
          <option v-for="(item, key) in regionData[2]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        {{ r2 }}
      </template>
    </china-area>
    <!-- 联动3 -->
    <china-area tag="div" v-model="r3">
      <template slot-scope="{ regionData }">
        <select v-model="r3[0]">
          <option v-for="(item, key) in regionData[0]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r3[1]">
          <option v-for="(item, key) in regionData[1]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        <select v-model="r3[2]">
          <option v-for="(item, key) in regionData[2]" :value="item.value" :key="key">{{ item.label }}</option>
        </select>
        {{ r3 }}
      </template>
    </china-area>
  </div>
</template>
<script>
import chinaArea from '../components/ChinaArea'

export default {
  name: 'xxxx',
  components: {
    chinaArea
  },
  data() {
    return {
      r1: [],
      r2: [],
      r3: []
    }
  }
}
</script>
```