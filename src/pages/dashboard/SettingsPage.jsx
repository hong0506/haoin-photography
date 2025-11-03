import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Camera,
  Mail,
  Save,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import BackButton from "../../components/BackButton";
import UserAvatar from "../../components/UserAvatar";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const fileInputRef = useRef(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateProfile(currentUser, {
        displayName: displayName || currentUser.email.split("@")[0],
      });

      setMessage({ type: "success", text: "个人资料已更新！" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("更新失败:", error);
      setMessage({ type: "error", text: "更新失败，请重试" });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "请选择图片文件" });
      return;
    }

    // 检查文件大小（2MB）
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "图片大小不能超过2MB" });
      return;
    }

    setUploadingAvatar(true);
    setMessage({ type: "", text: "" });

    try {
      // 上传到 Firebase Storage，添加元数据
      const storageRef = ref(
        storage,
        `avatars/${currentUser.uid}/${Date.now()}_${file.name}`
      );

      // 设置元数据以避免CORS问题
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uploadedBy: currentUser.uid,
        },
      };

      await uploadBytes(storageRef, file, metadata);
      const photoURL = await getDownloadURL(storageRef);

      // 更新用户资料
      await updateProfile(currentUser, { photoURL });

      setMessage({ type: "success", text: "头像已更新！页面将在2秒后刷新..." });

      // 延迟刷新以显示成功消息
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("上传失败:", error);

      // 更详细的错误信息
      let errorMessage = "上传失败，请重试";
      if (error.code === "storage/unauthorized") {
        errorMessage = "没有上传权限，请检查Firebase Storage规则";
      } else if (error.message?.includes("CORS")) {
        errorMessage = "CORS配置问题，请按照文档配置Storage CORS规则";
      }

      setMessage({ type: "error", text: errorMessage });
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">个人资料</h2>
        <p className="text-gray-400 mt-1">管理你的账号信息</p>
      </div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">头像</h3>

          <div className="flex flex-col items-center">
            <div className="relative">
              <UserAvatar user={currentUser} size="xl" />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 p-2 bg-accent-500 text-black rounded-full shadow-lg hover:bg-accent-400 transition-colors disabled:opacity-50"
              >
                {uploadingAvatar ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            <p className="text-sm text-gray-400 mt-4 text-center">
              点击相机图标更换头像
              <br />
              支持 JPG, PNG（最大2MB）
            </p>
          </div>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">基本信息</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <User className="w-4 h-4 inline mr-2" />
                显示名称
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="输入你的名字"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                这将显示在你的个人资料中
              </p>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                邮箱地址
              </label>
              <input
                type="email"
                value={currentUser?.email}
                disabled
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg opacity-60 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">邮箱地址不可修改</p>
            </div>

            {/* Save Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-gradient-to-r from-accent-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>保存中...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>保存更改</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">账号信息</h3>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">用户 ID</p>
            <p className="font-mono text-xs bg-white/5 px-3 py-2 rounded">
              {currentUser?.uid}
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">注册时间</p>
            <p className="bg-white/5 px-3 py-2 rounded">
              {currentUser?.metadata?.creationTime
                ? new Date(
                    currentUser.metadata.creationTime
                  ).toLocaleDateString("zh-CN")
                : "未知"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
