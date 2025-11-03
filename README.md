# 光影行者 - 摄影作品集网站

一个使用 Three.js 打造的动态摄影作品集网站，具有丰富的交互效果和现代化的设计。

## ✨ 核心特性

### 🎨 视觉效果

- **Three.js 水波动态背景** - 支持鼠标/触摸交互的实时水波着色器
- **流畅的页面动画** - 使用 Framer Motion 实现丝滑的过渡效果
- **响应式设计** - 完美适配手机、平板和桌面设备
- **深色主题** - 现代感十足的深色配色方案

### 📸 功能模块

1. **首页** - Hero 区域 + 精选作品走马灯 + 快捷入口
2. **作品集** - 瀑布流布局 + 智能筛选 + Lightbox 预览 + EXIF 信息展示
3. **地图集** - 交互式地图 + 拍摄地点标记 + 地点相册
4. **摄影故事** - 博客文章 + 拍摄幕后 + 参数分享
5. **壁纸下载** - 多分辨率支持 + 邮箱订阅 + 免费/付费区分
6. **摄影商店** - 数字产品 + 实体作品 + 在线课程
7. **关于页面** - 个人介绍 + 装备展示 + 服务价目 + 联系方式

### 🛠 技术栈

- **框架**: React 18 + Vite
- **3D 渲染**: Three.js + React Three Fiber
- **动画**: Framer Motion
- **样式**: TailwindCSS
- **路由**: React Router
- **图标**: Lucide React

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看网站

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
摄影2/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── WaterWaveBackground.jsx  # Three.js 水波背景
│   │   └── Navigation.jsx           # 导航栏
│   ├── pages/             # 页面组件
│   │   ├── Home.jsx       # 首页
│   │   ├── Gallery.jsx    # 作品集
│   │   ├── MapGallery.jsx # 地图集
│   │   ├── Stories.jsx    # 故事页
│   │   ├── Download.jsx   # 下载页
│   │   ├── Shop.jsx       # 商店页
│   │   └── About.jsx      # 关于页
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── public/                # 静态资源
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 功能亮点

### 1. Three.js 水波背景

- 自定义着色器实现水波效果
- 支持鼠标/触摸交互扰动
- 多层波形叠加
- 性能优化，60fps 流畅运行

### 2. 作品集系统

- 响应式瀑布流布局
- 按类别、地点、时间筛选
- 搜索功能
- Lightbox 模式展示 EXIF 信息
- 图片懒加载

### 3. 交互体验

- 页面切换动画
- 悬停效果
- 加载状态
- 平滑滚动
- 移动端手势支持

## 🎨 定制化

### 修改配色

在 `tailwind.config.js` 中修改 accent 颜色：

```javascript
colors: {
  accent: {
    // 修改这些颜色值
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
  }
}
```

### 替换图片

将示例图片 URL 替换为你自己的图片：

1. 在各个页面组件中找到图片数据
2. 替换 `src` 字段的 URL
3. 或者使用本地图片放在 `public/images/` 目录

### 添加真实地图

集成 Mapbox 或 Leaflet：

```bash
npm install mapbox-gl react-map-gl
```

在 `MapGallery.jsx` 中替换地图占位符。

## 📱 响应式断点

- **移动端**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

## ⚡ 性能优化建议

1. **图片优化**

   - 使用 WebP 格式
   - 实现图片 CDN
   - 添加图片懒加载

2. **代码分割**

   - 已使用 React Router 的路由级代码分割
   - 可进一步使用 React.lazy() 动态导入组件

3. **缓存策略**
   - 配置适当的 Cache-Control 头
   - 使用 Service Worker

## 🔧 待实现功能

- [ ] 真实的地图集成（Mapbox/Leaflet）
- [ ] 图片上传和管理后台
- [ ] 用户评论系统
- [ ] 社交媒体分享
- [ ] 邮件订阅集成
- [ ] 支付系统集成
- [ ] Before/After 对比滑块
- [ ] 相机模拟器功能
- [ ] 多语言支持

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- 邮箱: contact@haoin.tech
- 网站: https://photographer.com
- Instagram: @photographer

---
