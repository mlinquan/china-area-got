# 中国行政区划代码（离线版）
[![npm version](https://badge.fury.io/js/@mlinquan/china-area-got.svg)](https://badge.fury.io/js/@mlinquan/china-area-got)
[![Gzip Size](http://img.badgesize.io/https://unpkg.com/@mlinquan/china-area-got@latest/areaData.js?compression=gzip&style=flat-square)](https://unpkg.com/@mlinquan/china-area-got)
[![Monthly Downloads](https://img.shields.io/npm/dm/@mlinquan/china-area-got.svg)](https://www.npmjs.com/package/@mlinquan/china-area-got)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 安装
```js
npm install @mlinquan/china-area-got --save
#or 
yarn add @mlinquan/china-area-got
```

### 此版本包含港澳台
### 数据来源：2020年11月中华人民共和国县以上行政区划代码【中华人民共和国民政部】
国家统计版（不包含港澳台）：https://www.npmjs.com/package/@mlinquan/china-area


## 使用方法

### iview Cascader 级联选择
main.js
```js
import chinaArea from '@mlinquan/china-area-got'

const cnArea = new chinaArea({
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
})

const region = cnArea.region()

Vue.prototype.$cnArea = cnArea
Vue.prototype.$region = region
```

```html
<Cascader :data="$region" v-model="region" placeholder="所在地"></Cascader>
```
回显
```html
{{ $cnArea.echo(region) }}
```

### Element Cascader 级联选择器
main.js
```js
import chinaArea from '@mlinquan/china-area-got'

const cnArea = new chinaArea({
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
})

const region = cnArea.region()

Vue.prototype.$cnArea = cnArea
Vue.prototype.$region = region
```

```html
<el-cascader
  v-model="regeion"
  :options="$region"
></el-cascader>
```
回显
```html
{{ $cnArea.echo(region) }}
```

### 获取所有数据

```js
var ChinaArea = require('@mlinquan/china-area-got');
var cnArea = new ChinaArea({
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
})
var region = cnArea.region();
//or
var region = cnArea.region({
  /* 默认选项 */
  //默认3
  //如只需省份列表，设置为`1`
  //如只需要省份和城市，设置为`2`
  deep: 3,
  //如果为true，不带省、市、区等后缀  如：北京 朝阳，新疆 阿勒泰 石河子，默认false
  sortname: false,
  /* 自定义返回数据格式 */
  format: {
    key: 'value',
    value: 'label',
    children: 'children'
  }
});
```

##### 返回数据
```js
[
  {
    "value": "110000",
    "label": "北京市",
    "children": [
      {
        "value": "110101",
        "label": "东城区"
      },
      {
        "value": "110102",
        "label": "西城区"
      },
      {
        "value": "110105",
        "label": "朝阳区"
      },
      {
        "value": "110106",
        "label": "丰台区"
      },
      {
        "value": "110107",
        "label": "石景山区"
      },
      {
        "value": "110108",
        "label": "海淀区"
      },
//......
```

### 根据代码返回联动数据（适用于select等）
``` js
cnArea.init('110101')
//or
cnArea.init(['110000', '110101'])
//特殊地区(石河子市为例)
cnArea.init(['650000', '654300', '659001'])
cnArea.init('659001')
```
##### 返回数据
``` js
[
  [
    { value: '110000', label: '北京市' },
    { value: '120000', label: '天津市' },
    { value: '130000', label: '河北省' },
    { value: '140000', label: '山西省' },
    { value: '150000', label: '内蒙古自治区' },
    { value: '210000', label: '辽宁省' },
    { value: '220000', label: '吉林省' },
    { value: '230000', label: '黑龙江省' },
    { value: '310000', label: '上海市' },
    { value: '320000', label: '江苏省' },
    { value: '330000', label: '浙江省' },
    { value: '340000', label: '安徽省' },
    { value: '350000', label: '福建省' },
    { value: '360000', label: '江西省' },
    { value: '370000', label: '山东省' },
    { value: '410000', label: '河南省' },
    { value: '420000', label: '湖北省' },
    { value: '430000', label: '湖南省' },
    { value: '440000', label: '广东省' },
    { value: '450000', label: '广西壮族自治区' },
    { value: '460000', label: '海南省' },
    { value: '500000', label: '重庆市' },
    { value: '510000', label: '四川省' },
    { value: '520000', label: '贵州省' },
    { value: '530000', label: '云南省' },
    { value: '540000', label: '西藏自治区' },
    { value: '610000', label: '陕西省' },
    { value: '620000', label: '甘肃省' },
    { value: '630000', label: '青海省' },
    { value: '640000', label: '宁夏回族自治区' },
    { value: '650000', label: '新疆维吾尔自治区' }
  ],
  [
    { value: '650100', label: '乌鲁木齐市' },
    { value: '650200', label: '克拉玛依市' },
    { value: '650400', label: '吐鲁番市' },
    { value: '650500', label: '哈密市' },
    { value: '652300', label: '昌吉回族自治州' },
    { value: '652700', label: '博尔塔拉蒙古自治州' },
    { value: '652800', label: '巴音郭楞蒙古自治州' },
    { value: '652900', label: '阿克苏地区' },
    { value: '653000', label: '克孜勒苏柯尔克孜自治州' },
    { value: '653100', label: '喀什地区' },
    { value: '653200', label: '和田地区' },
    { value: '654000', label: '伊犁哈萨克自治州' },
    { value: '654200', label: '塔城地区' },
    { value: '654300', label: '阿勒泰地区' }
  ],
  [
    { value: '654301', label: '阿勒泰市' },
    { value: '654321', label: '布尔津县' },
    { value: '654322', label: '富蕴县' },
    { value: '654323', label: '福海县' },
    { value: '654324', label: '哈巴河县' },
    { value: '654325', label: '青河县' },
    { value: '654326', label: '吉木乃县' },
    { value: '659001', label: '石河子市' },
    { value: '659002', label: '阿拉尔市' },
    { value: '659003', label: '图木舒克市' },
    { value: '659004', label: '五家渠市' },
    { value: '659005', label: '北屯市' },
    { value: '659006', label: '铁门关市' },
    { value: '659007', label: '双河市' },
    { value: '659008', label: '可克达拉市' },
    { value: '659009', label: '昆玉市' },
    { value: '659010', label: '胡杨河市' }
  ]
]
```

### 回显
``` js
/* 北京市东城区 */
cnArea.echo('110101')
//同上
cnArea.echo(['110000', '110101'])

/* 特殊地区(石河子市为例) */
cnArea.echo(['650000', '654300', '659001'])
//同上
cnArea.echo('659001')
```
##### 返回数据
``` js
[ '北京市', '东城区', '' ]
[ '新疆维吾尔自治区', '阿勒泰地区', '石河子市' ]
```
