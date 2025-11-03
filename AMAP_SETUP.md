# 高德地图设置指南

## 🗺️ 为什么选择高德地图？

### ✅ 优势

1. **完全中文标注** 
   - 全球地图都有中文地名
   - 完美适配中文网站
   
2. **完全免费**
   - 个人开发者：500万次/天
   - 无需信用卡
   - 永久免费

3. **注册简单**
   - 只需手机号
   - 5分钟完成
   - 即刻获得API key

4. **深色主题**
   - 内置多种地图样式
   - 完美匹配网站设计

5. **国际覆盖好**
   - 全球地图数据
   - 不只是中国地图

---

## 📝 获取高德地图API Key（5分钟）

### 步骤1: 注册账号

1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 点击右上角「注册」
3. 使用手机号注册（无需企业认证）

### 步骤2: 创建应用

1. 登录后，进入「控制台」
2. 点击「应用管理」→「我的应用」
3. 点击「创建新应用」

**填写信息：**
- 应用名称：`皓萤摄影网站`
- 应用类型：`Web端(JS API)`

### 步骤3: 添加Key

1. 在创建的应用下，点击「添加Key」
2. 填写Key信息：
   - Key名称：`摄影网站地图`
   - 服务平台：选择「Web端(JS API)」
   - 提交

3. 获得API Key
   - 格式类似：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### 步骤4: 配置白名单（可选）

**开发阶段：**
- 填写：`*`（允许所有域名）
- 或填写：`localhost,127.0.0.1`

**生产环境：**
- 填写你的域名：`yourdomain.com`

---

## 🔧 配置API Key

### 打开项目文件

编辑 `src/pages/MapGallery.jsx`

找到第7行：
```javascript
const AMAP_KEY = 'your_amap_key_here'
```

替换为你的Key：
```javascript
const AMAP_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
```

**保存文件，刷新浏览器即可！**

---

## 🎨 效果预览

配置完成后，你会看到：

1. **中文世界地图**
   - 所有国家、城市名称都是中文
   - 深色主题
   - 流畅的3D视角

2. **自定义标记**
   - 青色圆形相机图标
   - 点击查看照片
   - 悬停显示信息

3. **交互功能**
   - 拖拽移动
   - 滚轮缩放
   - 双击放大

---

## 📊 高德地图 vs 其他方案

| 特性 | 高德地图 | Leaflet | Mapbox | Google Maps |
|------|---------|---------|---------|-------------|
| 中文标注 | ✅ 完美 | ⚠️ 英文为主 | ⚠️ 英文为主 | ⚠️ 英文为主 |
| 免费额度 | 500万/天 | 无限 | 5万/月 | $200/月 |
| 需要Key | ✅ 是 | ❌ 否 | ✅ 是 | ✅ 是 |
| 注册难度 | ⭐ 简单 | ⭐ 无需 | ⭐⭐ 中等 | ⭐⭐⭐ 困难 |
| 中文文档 | ✅ 完善 | ⚠️ 英文 | ⚠️ 英文 | ⚠️ 英文 |
| 深色主题 | ✅ 内置 | ⚠️ 需配置 | ✅ 内置 | ✅ 内置 |
| 国际数据 | ✅ 良好 | ✅ 优秀 | ✅ 优秀 | ✅ 最佳 |

**结论：** 对于中文摄影网站，高德地图是最佳选择！

---

## 🎯 地图样式

### 内置样式

高德地图提供多种样式：

```javascript
// 在 MapGallery.jsx 中修改
const map = new AMap.Map(mapRef.current, {
  mapStyle: 'amap://styles/dark',  // 当前使用的深色主题
  
  // 其他可选样式：
  // 'amap://styles/normal'      // 标准
  // 'amap://styles/light'       // 清新
  // 'amap://styles/whitesmoke'  // 远山黛
  // 'amap://styles/grey'        // 幻影黑
  // 'amap://styles/macaron'     // 马卡龙
  // 'amap://styles/blue'        // 极夜蓝
})
```

---

## 🔧 自定义配置

### 修改初始视图

```javascript
const map = new AMap.Map(mapRef.current, {
  zoom: 2,              // 缩放级别 (1-18)
  center: [0, 30],      // 中心点 [经度, 纬度]
  mapStyle: 'amap://styles/dark',
  viewMode: '3D',       // 3D视角
  pitch: 0,             // 俯仰角 (0-60)
  rotation: 0,          // 旋转角 (0-360)
})
```

### 添加地图控件

```javascript
// 在地图创建后添加
map.addControl(new AMap.Scale())        // 比例尺
map.addControl(new AMap.ToolBar())      // 工具条
map.addControl(new AMap.ControlBar())   // 3D控制
```

---

## 🐛 故障排除

### 问题1: 地图不显示

**检查项：**
1. API Key是否正确？
2. 是否配置了白名单？
   - 开发环境使用 `*` 或 `localhost`
3. 网络是否连接？
4. 浏览器控制台有错误吗？

**解决方案：**
```javascript
// 在浏览器控制台检查
console.log('AMAP_KEY:', AMAP_KEY)

// 应该看到你的Key，不是 'your_amap_key_here'
```

### 问题2: 提示"开发者Key无效"

**原因：**
- Key未配置或错误
- 域名未在白名单中

**解决：**
1. 回到高德控制台
2. 检查Key是否正确
3. 添加当前域名到白名单

### 问题3: 标记不显示

**检查坐标格式：**
```javascript
// ✅ 正确：高德使用 [lng, lat]
[120.123, 30.456]

// ❌ 错误：不是 [lat, lng]
[30.456, 120.123]
```

### 问题4: 地图样式失效

**检查样式路径：**
```javascript
// ✅ 正确
mapStyle: 'amap://styles/dark'

// ❌ 错误
mapStyle: 'dark'
```

---

## 📱 移动端优化

高德地图自动适配移动端：
- ✅ 触摸拖拽
- ✅ 双指缩放
- ✅ 双击放大
- ✅ 响应式布局

无需额外配置！

---

## 💡 高级功能

### 1. 添加路线

```javascript
new AMap.Polyline({
  path: [[lng1, lat1], [lng2, lat2]],
  strokeColor: '#2dd4bf',
  strokeWeight: 3,
  map: map
})
```

### 2. 添加区域

```javascript
new AMap.Polygon({
  path: [[lng1, lat1], [lng2, lat2], [lng3, lat3]],
  fillColor: '#2dd4bf',
  fillOpacity: 0.3,
  strokeColor: '#2dd4bf',
  map: map
})
```

### 3. 聚合标记

适合大量标记点的场景：
```javascript
// 需要引入聚合插件
plugins: ['AMap.Marker', 'AMap.MarkerCluster']
```

---

## 📚 官方资源

- [高德开放平台](https://lbs.amap.com/)
- [JS API 2.0文档](https://lbs.amap.com/api/jsapi-v2/summary)
- [示例中心](https://lbs.amap.com/demo/jsapi-v2/example/map/map-show)
- [常见问题](https://lbs.amap.com/faq/js-api/map-js-api/)

---

## ✅ 快速检查清单

完成以下步骤确保正常运行：

- [ ] 注册高德开放平台账号
- [ ] 创建应用并获取API Key
- [ ] 配置白名单（开发环境用 `*`）
- [ ] 在 `MapGallery.jsx` 中替换API Key
- [ ] 保存文件
- [ ] 刷新浏览器（Cmd+Shift+R）
- [ ] 检查地图是否显示中文
- [ ] 测试标记点击功能
- [ ] 测试悬停信息窗口

---

## 🎉 完成！

配置完成后，你的摄影网站将拥有：
- ✅ 中文世界地图
- ✅ 深色主题设计
- ✅ 自定义相机标记
- ✅ 流畅的交互体验
- ✅ 完全免费使用

享受你的中文地图吧！🗺️
