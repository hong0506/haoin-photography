# Dashboard 使用指南

## 🎉 **恭喜！Dashboard系统已创建完成**

你现在拥有一个完整的内容管理系统(CMS)！

---

## 📁 **创建的文件清单**

### **认证系统**
```
src/
├── contexts/
│   └── AuthContext.jsx           # 用户认证上下文
├── components/
│   └── ProtectedRoute.jsx        # 路由保护组件
└── pages/
    ├── Login.jsx                 # 登录页面
    └── Signup.jsx                # 注册页面
```

### **Dashboard系统**
```
src/
└── pages/
    ├── Dashboard.jsx             # Dashboard主框架
    └── dashboard/
        ├── DashboardHome.jsx     # 概览页面
        ├── GalleryManage.jsx     # 作品管理（完整功能）
        ├── StoryManage.jsx       # 故事管理（占位）
        ├── ProductManage.jsx     # 商品管理（占位）
        ├── Analytics.jsx         # 数据统计（占位）
        └── SettingsPage.jsx      # 设置（占位）
```

### **Firebase服务**
```
src/
└── firebase/
    ├── config.js                 # Firebase配置
    └── services/
        └── galleryService.js     # 作品CRUD服务
```

---

## 🚀 **快速开始**

### **1. 启用Firebase服务**

确保你已经在Firebase Console启用：
- ✅ **Authentication** → 电子邮件/密码
- ✅ **Firestore Database** → 测试模式
- ✅ **Storage** → 测试模式

### **2. 注册第一个账号**

访问：`http://localhost:3003/signup`

```
输入你的邮箱和密码 → 创建账号 → 自动跳转到Dashboard
```

### **3. 上传第一张作品**

```
Dashboard → 作品管理 → 上传作品 → 填写信息 → 上传
```

---

## 🎯 **功能介绍**

### **✅ 已完成的功能**

#### **1. 用户认证**
- 📧 邮箱密码注册/登录
- 🔐 密码强度检测
- 🚪 自动登出
- 🛡️ 路由保护

#### **2. 作品管理（完整）**
- 📤 **上传功能**
  - 图片上传到Firebase Storage
  - 自动生成缩略图
  - 拖拽上传支持
  
- 📝 **信息填写**
  - 标题、描述
  - 拍摄地点（自动集成地图）
  - 拍摄日期
  - 相机型号
  - 分类和标签
  - 精选标记
  - 发布/草稿状态

- 🎨 **作品展示**
  - 网格布局
  - 精选徽章
  - 浏览量统计
  - 快速操作

- ⚡ **快速操作**
  - 一键设为精选
  - 删除确认
  - 编辑（待实现）

#### **3. Dashboard概览**
- 📊 数据统计卡片
  - 作品总数
  - 故事数量
  - 商品数量
  - 总浏览量
  
- 🎯 快速操作入口
- 💡 使用提示

---

### **⏳ 待实现的功能**

#### **故事管理**
- Markdown编辑器
- 关联作品
- 草稿/发布

#### **商品管理**
- 商品上传
- 价格设置
- 库存管理

#### **数据统计**
- 浏览量图表
- 热门作品
- 访客来源

#### **设置**
- 个人信息
- 密码修改
- 网站SEO设置

---

## 🔄 **数据流程**

### **上传作品 → 前端展示**

```
1. 用户在Dashboard上传作品
   ├── 选择图片文件
   ├── 填写元数据（标题、地点等）
   └── 点击"上传作品"

2. GalleryManage.jsx 处理上传
   ├── uploadPhotoWithMetadata() 
   │   ├── uploadImage() → 上传图片到Storage
   │   └── createPhoto() → 保存元数据到Firestore
   └── 返回作品ID和URL

3. 数据保存到Firebase
   ├── Storage: 图片文件
   └── Firestore: 作品元数据
       {
         title: "冰岛黑沙滩",
         imageUrl: "https://...",
         location: { name: "冰岛" },
         category: "风光",
         isFeatured: true,
         isPublished: true,
         ...
       }

4. 前端页面自动读取
   ├── Gallery页面 → getPhotos({ isPublished: true })
   ├── Map页面 → 读取location数据
   ├── Home页面 → getPhotos({ isFeatured: true })
   └── 自动显示新作品
```

---

## 📊 **数据结构**

### **作品数据（gallery集合）**

```javascript
{
  // 基本信息
  id: "auto_generated_id",
  title: "冰岛黑沙滩",
  description: "日落时分的黑沙滩...",
  imageUrl: "https://storage.googleapis.com/...",
  
  // 拍摄信息
  location: {
    name: "冰岛",
    city: "维克",
    country: "Iceland",
    lat: 63.4182,      // 纬度（可选）
    lng: -19.0089      // 经度（可选）
  },
  shootingDate: "2024-10-15",
  
  // 设备信息
  camera: "Sony α7 IV",
  lens: "24-70mm f/2.8",    // 可选
  settings: {               // 可选
    focal: "35mm",
    aperture: "f/8",
    shutter: "1/250s",
    iso: "100"
  },
  
  // 分类和标签
  category: "风光",
  tags: ["冰岛", "海滩", "日落"],
  
  // 展示设置
  isFeatured: true,         // 是否精选（首页显示）
  isPublished: true,        // 是否发布
  
  // 统计数据
  views: 0,
  likes: 0,
  
  // 元数据
  createdAt: Timestamp,
  updatedAt: Timestamp,
  userId: "user_id"
}
```

---

## 🎨 **前端集成**

### **如何让Gallery页面读取数据库**

当前Gallery使用的是硬编码的图片，需要改为从Firebase读取：

```javascript
// src/pages/Gallery.jsx

import { useState, useEffect } from 'react';
import { getPhotos } from '../firebase/services/galleryService';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      // 只获取已发布的作品
      const data = await getPhotos({ isPublished: true });
      setPhotos(data);
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

  // 渲染photos数组
  return (
    <div>
      {photos.map(photo => (
        <img key={photo.id} src={photo.imageUrl} alt={photo.title} />
      ))}
    </div>
  );
}
```

### **如何让Map页面显示地点**

```javascript
// src/pages/MapGallery.jsx

import { getPhotos } from '../firebase/services/galleryService';

// 加载有地理位置的作品
const photos = await getPhotos({ isPublished: true });

// 筛选有location的作品
const locationsWithPhotos = photos
  .filter(photo => photo.location && photo.location.name)
  .map(photo => ({
    city: photo.location.name,
    country: photo.location.country || '',
    lat: photo.location.lat || defaultLat,
    lng: photo.location.lng || defaultLng,
    photos: [photo]  // 可以聚合同一地点的多张照片
  }));

// 在地图上标记
locationsWithPhotos.forEach(location => {
  const marker = new AMap.Marker({
    position: [location.lng, location.lat],
    title: location.city
  });
  // ...
});
```

### **如何让首页显示精选作品**

```javascript
// src/pages/Home.jsx

import { getPhotos } from '../firebase/services/galleryService';

// 加载精选作品
const featuredPhotos = await getPhotos({ 
  isPublished: true,
  isFeatured: true 
});

// 限制数量（如6张）
const displayPhotos = featuredPhotos.slice(0, 6);
```

---

## 🔒 **安全规则**

### **当前使用：测试模式（30天）**

```javascript
// Firestore - 所有人可读，认证用户可写
allow read: if true;
allow write: if request.auth != null;

// Storage - 所有人可读，认证用户可写
allow read: if true;
allow write: if request.auth != null;
```

### **生产环境：仅管理员可写**

30天后，需要更新为：

```javascript
// Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gallery/{photoId} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.auth.uid == "你的UID";
    }
  }
}

// Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.auth.uid == "你的UID";
    }
  }
}
```

**获取你的UID：**
1. Firebase Console → Authentication → 用户
2. 找到你的账号
3. 复制用户UID

---

## 📱 **页面路由**

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 展示精选作品 |
| `/gallery` | 作品集 | 所有已发布作品 |
| `/map` | 地图集 | 地理位置展示 |
| `/stories` | 故事 | 博客文章 |
| `/shop` | 商店 | 数字商品 |
| `/about` | 关于 | 个人介绍 |
| `/login` | 登录 | 用户登录 |
| `/signup` | 注册 | 用户注册 |
| `/dashboard` | Dashboard | 控制面板 |
| `/dashboard/gallery` | 作品管理 | 上传/管理作品 |
| `/dashboard/stories` | 故事管理 | 管理博客 |
| `/dashboard/products` | 商品管理 | 管理商品 |
| `/dashboard/analytics` | 数据统计 | 查看数据 |
| `/dashboard/settings` | 设置 | 账号设置 |

---

## 💡 **使用技巧**

### **1. 上传作品时的最佳实践**

✅ **必填项**
- 标题：简洁描述性
- 图片：高质量（建议2000px宽）

✅ **推荐填写**
- 地点：会显示在地图集
- 日期：便于管理
- 分类：便于筛选
- 标签：提高搜索性

✅ **精选标记**
- 勾选"设为精选"会在首页展示
- 建议选择6-10张最佳作品

### **2. 地图集集成**

要让作品显示在地图上：
1. ✅ 上传时填写"拍摄地点"
2. ✅ 勾选"立即发布"
3. 地图页面会自动读取并标记

### **3. 管理作品**

- **精选/取消精选**：点击星星图标
- **删除作品**：点击垃圾桶（有确认）
- **查看统计**：眼睛图标显示浏览量

---

## 🐛 **常见问题**

### **Q1: 上传后前端页面没显示？**

**A:** 前端页面还在使用硬编码数据，需要修改为从Firebase读取（参考"前端集成"部分）

### **Q2: 上传失败？**

**A:** 检查：
1. Firebase Storage是否启用？
2. 安全规则是否正确？
3. 图片大小是否超过10MB？
4. 浏览器控制台有错误吗？

### **Q3: 登录后没有跳转到Dashboard？**

**A:** 检查：
1. Firebase Authentication是否启用？
2. 浏览器控制台有错误吗？
3. 清除浏览器缓存重试

### **Q4: 显示"开发中"？**

**A:** 故事、商品、统计、设置功能是占位页面，需要后续开发

---

## 🎯 **下一步开发计划**

### **阶段1：完善作品管理（推荐优先）**
1. ✅ 修改Gallery页面读取Firebase
2. ✅ 修改Map页面读取Firebase
3. ✅ 修改Home页面读取Firebase
4. ✅ 添加作品编辑功能
5. ✅ 添加批量操作

### **阶段2：故事系统**
1. Markdown编辑器
2. 图片上传
3. 故事列表
4. 故事详情页

### **阶段3：商品系统**
1. 商品上传
2. 支付集成
3. 订单管理

### **阶段4：优化和完善**
1. 数据统计图表
2. SEO优化
3. 性能优化
4. 移动端适配

---

## 📚 **相关文档**

- `FIREBASE_SETUP.md` - Firebase配置指南
- `AMAP_SETUP.md` - 高德地图配置
- `MAP_DESIGN_IMPROVEMENTS.md` - 地图设计说明
- `ABOUT_PAGE_REDESIGN.md` - About页面设计

---

## 🎉 **开始使用**

1. 访问 `http://localhost:3003/signup` 注册账号
2. 自动跳转到Dashboard
3. 点击"上传作品"上传你的第一张照片
4. 在作品管理页面查看
5. 返回首页/作品集查看效果（需要先集成Firebase）

---

**祝你使用愉快！📸**

如有问题，随时问我！
