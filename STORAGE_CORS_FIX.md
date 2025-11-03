# Firebase Storage CORS 配置指南

## 🔴 **问题描述**

上传头像时出现 CORS 错误：
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
has been blocked by CORS policy
```

---

## ✅ **解决方案：配置 Storage CORS**

### **方法 1：使用 Google Cloud Console（推荐）**

#### **步骤 1：访问 Google Cloud Storage**

1. 打开：https://console.cloud.google.com/storage/browser
2. **登录** 你的 Google 账号
3. **选择项目**：`haoin-photography`

#### **步骤 2：找到 Storage Bucket**

1. 在列表中找到：`haoin-photography.firebasestorage.app`
2. 点击 bucket 名称进入

#### **步骤 3：配置 CORS**

**方式 A：使用界面（如果可用）**
1. 点击顶部的 **"Configuration"** 或 **"配置"** 标签
2. 找到 **"CORS 配置"** 部分
3. 点击 **"编辑"** 或 **"Edit CORS configuration"**
4. 粘贴以下 JSON：

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
```

5. 点击 **"保存"**

**方式 B：使用 Cloud Shell（如果界面没有 CORS 选项）**

1. 在 Google Cloud Console 页面，点击右上角的 **"激活 Cloud Shell"** 图标 `>_`
2. Cloud Shell 打开后，执行以下命令：

```bash
# 创建 CORS 配置文件
cat > cors.json << 'EOF'
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
EOF

# 应用 CORS 配置
gsutil cors set cors.json gs://haoin-photography.firebasestorage.app

# 验证配置
gsutil cors get gs://haoin-photography.firebasestorage.app
```

3. 看到输出的 JSON 配置，说明成功！

---

### **方法 2：使用本地 gsutil 命令（需要安装 Google Cloud SDK）**

#### **步骤 1：安装 Google Cloud SDK**

**macOS:**
```bash
brew install google-cloud-sdk
```

**或下载安装：**
https://cloud.google.com/sdk/docs/install

#### **步骤 2：初始化并登录**

```bash
# 初始化
gcloud init

# 登录（会打开浏览器）
gcloud auth login

# 设置项目
gcloud config set project haoin-photography
```

#### **步骤 3：应用 CORS 配置**

项目根目录已经有 `cors.json` 文件，直接运行：

```bash
# 进入项目目录
cd /Users/hongjiang/Documents/皓萤/皓萤科技/摄影2

# 应用 CORS 配置
gsutil cors set cors.json gs://haoin-photography.firebasestorage.app

# 验证配置
gsutil cors get gs://haoin-photography.firebasestorage.app
```

---

## 🎯 **生产环境配置（推荐）**

上面的配置使用了 `"origin": ["*"]`，允许所有域名访问。

**在生产环境中，应该限制为你的域名：**

```json
[
  {
    "origin": [
      "http://localhost:3003",
      "https://your-domain.com"
    ],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
```

---

## 🔒 **同时检查 Storage 安全规则**

在 Firebase Console → Storage → Rules，确保规则允许认证用户上传：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 允许所有人读取
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // 只允许认证用户上传到自己的 avatars 文件夹
    match /avatars/{userId}/{allPaths=**} {
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 允许认证用户上传到 gallery
    match /gallery/{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

---

## ✅ **验证配置**

配置完成后：

1. **清除浏览器缓存**
   - Chrome: `Cmd + Shift + Delete`
   - 选择 "缓存的图片和文件"
   - 清除

2. **刷新网站**
   - `Cmd + Shift + R` (硬刷新)

3. **重新尝试上传头像**
   - Dashboard → 设置
   - 点击相机图标
   - 选择图片
   - 应该能成功上传了！

---

## 🐛 **如果还是不行**

### **检查 1：确认 Storage 是否启用**
1. Firebase Console → Storage
2. 如果看到 "Get Started"，点击启用

### **检查 2：确认 Storage Rules**
```javascript
// 临时测试规则（开发环境）
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### **检查 3：查看浏览器控制台**
- F12 → Console
- 查看具体错误信息
- 复制错误给我，我会帮你分析

---

## 📞 **需要帮助？**

如果以上方法都不行：

1. 截图错误信息
2. 检查 Firebase Console → Storage → Rules
3. 检查 Storage 是否已启用
4. 把这些信息发给我

---

## 🎉 **成功后应该看到**

- ✅ 上传进度显示
- ✅ "头像已更新！页面将在2秒后刷新..."
- ✅ 页面自动刷新
- ✅ 看到新头像显示在导航栏

---

**配置完成后记得告诉我结果！** 🚀
