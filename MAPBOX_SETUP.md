# 地图集设置指南

## 🗺️ 使用 Leaflet + OpenStreetMap（推荐方案）

地图集功能使用 **Leaflet + OpenStreetMap**，这是一个完全免费、开源的地图解决方案。

### ✅ 为什么选择 Leaflet？

**优势：**
- ✅ **完全免费** - 无需注册、无需API key
- ✅ **无水印** - 不会显示"mapbox"等品牌标识
- ✅ **无限制** - 没有请求次数限制
- ✅ **开源** - 社区活跃，文档完善
- ✅ **轻量级** - 仅38KB
- ✅ **功能齐全** - 支持缩放、拖拽、标记等所有基本功能

**对比其他方案：**
- ❌ Mapbox：需要token，左下角有水印，免费额度有限
- ❌ Google Maps：需要API key和信用卡，收费
- ❌ 高德/百度地图：国内地图，不适合国际摄影网站

### 🚀 无需任何配置

Leaflet方案已经配置好了，**开箱即用，无需任何额外设置**！

## 📸 添加照片位置数据

### 数据结构

在 `MapGallery.jsx` 中的 `photoLocations` 数组定义了所有照片位置：

```javascript
const photoLocations = [
  {
    id: 1,                          // 唯一ID
    city: '策马特',                 // 城市名称
    country: '瑞士',                // 国家名称
    coordinates: {                  // GPS坐标
      lat: 46.0207,                // 纬度
      lng: 7.7491                  // 经度
    },
    photos: [                       // 该位置的所有照片
      { 
        id: 101,                    // 照片ID
        url: 'https://...',         // 照片URL
        date: '2024-03-15'          // 拍摄日期
      },
      // 更多照片...
    ],
  },
  // 更多位置...
]
```

### 添加新位置

1. 复制一个现有的位置对象
2. 修改 `id`、`city`、`country`
3. 更新 `coordinates`（可使用 Google Maps 获取坐标）
4. 添加该位置的照片数组

### 获取GPS坐标

**方法1：Google Maps**
- 在 Google Maps 中找到位置
- 右键点击该位置
- 点击坐标，坐标会被复制到剪贴板

**方法2：照片EXIF数据**
- 大多数相机和手机会在照片中保存GPS信息
- 使用EXIF读取工具获取坐标
- 推荐工具：ExifTool, Photo Investigator

## 🎯 功能特性

### 已实现功能

✅ **交互式全球地图**
- Mapbox GL深色主题
- 平滑的拖拽和缩放
- 响应式设计

✅ **动态标记点**
- 相机图标标记
- 脉冲动画效果
- 悬停显示预览

✅ **照片画廊Modal**
- 显示位置的所有照片
- 网格布局
- 照片日期显示
- GPS坐标显示

✅ **动态统计**
- 自动计算国家数量
- 自动计算城市数量
- 自动计算总照片数
- Spring动画效果

✅ **地点卡片网格**
- 显示最新照片
- 照片数量标识
- 点击查看完整相册

### 数据自动计算

所有统计数据都是动态计算的：

```javascript
const stats = useMemo(() => {
  const countries = new Set(photoLocations.map(loc => loc.country))
  const cities = photoLocations.length
  const totalPhotos = photoLocations.reduce((sum, loc) => sum + loc.photos.length, 0)
  
  return {
    countries: countries.size,  // 不重复的国家数
    cities,                     // 城市总数
    totalPhotos                 // 照片总数
  }
}, [])
```

## 🎨 自定义样式

### 地图主题

可以修改地图样式：

```javascript
<Map
  mapStyle="mapbox://styles/mapbox/dark-v11"  // 深色主题
  // 其他选项：
  // "mapbox://styles/mapbox/light-v11"       // 浅色
  // "mapbox://styles/mapbox/streets-v12"     // 街道
  // "mapbox://styles/mapbox/satellite-v9"    // 卫星
/>
```

### 标记点样式

修改标记点颜色（在 `MapGallery.jsx` 第290行）：

```javascript
<div className="p-3 bg-accent-500 rounded-full shadow-lg transition-all">
  <Camera className="w-5 h-5 text-black" />
</div>
```

## 🚀 性能优化建议

1. **图片优化**
   - 使用压缩的图片（推荐WebP格式）
   - 为缩略图和大图使用不同尺寸
   - 考虑使用CDN托管图片

2. **懒加载**
   - 照片Modal中的图片可以实现懒加载
   - 只加载可视区域的地点卡片

3. **数据管理**
   - 照片数量多时，考虑使用数据库
   - 实现分页或虚拟滚动

## 📦 相关依赖

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0"
}
```

已自动安装，无需手动操作。

## 🔧 故障排除

### 地图不显示
- 确保 `leaflet` CSS 已正确导入
- 检查浏览器控制台是否有错误
- 确认 MapContainer 有明确的高度设置
- 检查网络连接（OpenStreetMap瓦片需要联网）

### 标记点位置不对
- Leaflet使用 `[lat, lng]` 顺序（注意与Mapbox不同）
- 检查坐标值的正负号
- 北纬和东经为正数，南纬和西经为负数

### 标记图标不显示
- 已经处理了Leaflet的默认图标问题
- 自定义相机图标在 `CameraMarker.jsx` 中定义
- 如需修改图标，编辑该文件

### 照片不显示
- 检查图片URL是否可访问
- 确认CORS设置（跨域问题）
- 尝试使用绝对URL

## 💡 未来扩展

可以考虑添加的功能：

- 🔍 搜索功能（按城市/国家搜索）
- 🗂️ 按时间筛选
- 📊 访问热力图
- 🎥 视频支持
- 💾 后端数据库集成
- 📱 移动端优化手势
- 🌐 多语言支持

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Mapbox 官方文档：[https://docs.mapbox.com/](https://docs.mapbox.com/)
2. 查看 react-map-gl 文档：[https://visgl.github.io/react-map-gl/](https://visgl.github.io/react-map-gl/)
