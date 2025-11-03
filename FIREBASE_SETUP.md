# Firebase 配置指南

## 📋 **配置步骤**

### **1. 获取 Firebase 配置信息**

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目
3. 点击 **⚙️ 项目设置**
4. 滚动到 **"您的应用"** 部分
5. 如果没有Web应用，点击 **</> (Web图标)** 添加应用
6. 复制配置信息

你会看到类似这样的代码：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

### **2. 配置环境变量**

打开项目根目录的 `.env.local` 文件，替换为你的配置：

```bash
# 替换为你从 Firebase Console 复制的值
VITE_FIREBASE_API_KEY=你的_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=你的项目.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=你的项目ID
VITE_FIREBASE_STORAGE_BUCKET=你的项目.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=你的发送者ID
VITE_FIREBASE_APP_ID=你的应用ID
```

**⚠️ 重要提示：**
- `.env.local` 文件已添加到 `.gitignore`，不会被提交到 Git
- 这些是**公开的配置**，但仍需通过 Firebase 安全规则保护数据
- 不要将 `.env.local` 上传到公开仓库

---

### **3. 启用 Firebase 服务**

#### **启用 Authentication（认证）**

1. Firebase Console → **Authentication**
2. 点击 **开始使用**
3. 选择登录方式：
   - ✅ **电子邮件/密码** （推荐先启用这个）
   - 可选：Google、GitHub 等社交登录

#### **启用 Firestore Database（数据库）**

1. Firebase Console → **Firestore Database**
2. 点击 **创建数据库**
3. 选择模式：
   - **测试模式**（开发阶段）- 30天后过期
   - **生产模式**（需要配置安全规则）
4. 选择数据库位置（建议选择亚洲区域，如 `asia-east1`）

#### **启用 Storage（存储）**

1. Firebase Console → **Storage**
2. 点击 **开始使用**
3. 选择安全规则模式：
   - **测试模式**（开发阶段）
   - **生产模式**（需要配置规则）
4. 选择存储位置（与Firestore保持一致）

---

### **4. 配置安全规则**

#### **Firestore 安全规则**

Firebase Console → **Firestore Database** → **规则**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 作品集合 - 所有人可读，仅认证用户可写
    match /gallery/{photoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // 故事集合
    match /stories/{storyId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // 商品集合
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

#### **Storage 安全规则**

Firebase Console → **Storage** → **规则**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // 允许所有人读取
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // 仅认证用户可上传
    match /gallery/{fileName} {
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024  // 限制10MB
                   && request.resource.contentType.matches('image/.*');
    }
    
    match /stories/{fileName} {
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024;
    }
    
    match /products/{fileName} {
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

---

### **5. 重启开发服务器**

修改 `.env.local` 后需要重启：

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

---

## 🧪 **测试配置**

### **方法1：在浏览器控制台测试**

访问 `http://localhost:3003`，打开浏览器控制台，输入：

```javascript
import { auth, db, storage } from './src/firebase/config.js';
console.log('Auth:', auth);
console.log('DB:', db);
console.log('Storage:', storage);
```

如果没有错误，说明配置成功！

### **方法2：创建测试页面**

我已经为你创建了服务文件，可以在Dashboard中测试上传功能。

---

## 📁 **项目结构**

```
src/
├── firebase/
│   ├── config.js                 # Firebase 配置
│   └── services/
│       ├── galleryService.js     # 作品集服务
│       ├── storyService.js       # 故事服务（待创建）
│       └── productService.js     # 商品服务（待创建）
├── contexts/
│   └── AuthContext.jsx           # 认证上下文
└── pages/
    └── Dashboard.jsx             # Dashboard页面（待创建）
```

---

## 🔒 **安全建议**

### **生产环境安全规则**

开发完成后，将安全规则改为：

```javascript
// Firestore - 仅允许经过认证的管理员
match /gallery/{photoId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.uid == "你的UID";
}
```

### **获取你的 UID**

1. Firebase Console → **Authentication** → **用户**
2. 找到你的账号，复制 **用户UID**
3. 替换规则中的 `"你的UID"`

---

## 🚀 **下一步**

✅ **已完成：**
- [x] Firebase 配置文件
- [x] 认证 Context
- [x] 作品集服务（上传、读取、更新、删除）

⏭️ **接下来：**
- [ ] 创建 Dashboard 页面
- [ ] 创建登录页面
- [ ] 创建上传界面
- [ ] 集成到现有页面

---

## ❓ **常见问题**

### Q1: 为什么要用 `.env.local` 而不是 `.env`？

**A:** Vite 优先级：`.env.local` > `.env`，且 `.env.local` 默认在 `.gitignore` 中，更安全。

### Q2: API Key 公开安全吗？

**A:** Firebase API Key 是公开的，安全性依赖于 **安全规则**。只要配置了正确的安全规则，数据就是安全的。

### Q3: 测试模式30天后会怎样？

**A:** 数据库会拒绝访问。需要配置生产环境的安全规则。

### Q4: 免费额度够用吗？

**A:** Firebase 免费额度（Spark Plan）：
- ✅ Firestore: 50K 读/天，20K 写/天
- ✅ Storage: 5GB 存储，1GB 下载/天
- ✅ Authentication: 无限用户

小型项目完全够用！

---

## 📚 **相关文档**

- [Firebase 官方文档](https://firebase.google.com/docs)
- [Firestore 安全规则](https://firebase.google.com/docs/firestore/security/get-started)
- [Storage 安全规则](https://firebase.google.com/docs/storage/security)

---

**配置完成后，告诉我，我会帮你创建 Dashboard 页面！** 🎉
