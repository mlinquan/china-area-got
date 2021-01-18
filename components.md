# vue中不使用methods，优雅地使用省市区三级联动

## 组件
### ChinaArea.vue
```html
<template>
  <components :is="tag" v-on="$listeners">
    <slot name="default" v-bind="{ regionData }"></slot>
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
  computed: {
    regionData() {
      return cnArea.init(this.value)
    }
  }
}
</script>
```

## 应用场景
### xxxx.vue
单页多个省市联动，互补干扰和冲突，且不需要绑定change事件
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