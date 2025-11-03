import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Camera,
  Tag,
  Star,
  Eye,
  Trash2,
  Edit,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  uploadPhotoWithMetadata,
  getPhotos,
  deletePhoto,
  updatePhoto,
} from "../../firebase/services/galleryService";
import BackButton from "../../components/BackButton";

export default function GalleryManage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      setLoading(true);
      const data = await getPhotos({ isPublished: false }); // 获取所有作品
      setPhotos(data);
    } catch (error) {
      console.error("加载作品失败:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(photo) {
    if (!window.confirm(`确定要删除 "${photo.title}" 吗？`)) return;

    try {
      await deletePhoto(photo.id, photo.imageUrl);
      setPhotos(photos.filter((p) => p.id !== photo.id));
    } catch (error) {
      console.error("删除失败:", error);
      alert("删除失败，请重试");
    }
  }

  async function toggleFeatured(photo) {
    try {
      await updatePhoto(photo.id, { isFeatured: !photo.isFeatured });
      setPhotos(
        photos.map((p) =>
          p.id === photo.id ? { ...p, isFeatured: !p.isFeatured } : p
        )
      );
    } catch (error) {
      console.error("更新失败:", error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">作品管理</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>共 {photos.length} 张作品</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-accent-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-accent-500/50 transition-all flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          上传作品
        </motion.button>
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-accent-400" />
        </div>
      ) : photos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">还没有作品</h3>
          <p className="text-gray-400 mb-6">上传你的第一张作品开始吧</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-accent-500 text-black font-semibold rounded-lg hover:bg-accent-400 transition-colors"
          >
            上传作品
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Featured Badge */}
                {photo.isFeatured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    精选
                  </div>
                )}

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => toggleFeatured(photo)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
                    title={photo.isFeatured ? "取消精选" : "设为精选"}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        photo.isFeatured
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(photo)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg backdrop-blur-sm transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">{photo.title}</h3>

                <div className="space-y-1 text-sm text-gray-400">
                  {photo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {photo.location.name || photo.location}
                      </span>
                    </div>
                  )}

                  {photo.category && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 flex-shrink-0" />
                      <span>{photo.category}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs pt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {photo.views || 0}
                    </span>
                    {photo.isPublished ? (
                      <span className="text-green-400">已发布</span>
                    ) : (
                      <span className="text-gray-500">草稿</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <UploadModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={() => {
              setShowUploadModal(false);
              loadPhotos();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Upload Modal Component
function UploadModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    locationName: "",
    shootingDate: "",
    camera: "Sony α7 IV",
    category: "风光",
    tags: "",
    isFeatured: false,
    isPublished: true,
  });

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      setProgress(30);

      // 准备元数据
      const metadata = {
        title: formData.title,
        description: formData.description,
        location: formData.locationName
          ? {
              name: formData.locationName,
            }
          : null,
        shootingDate: formData.shootingDate,
        camera: formData.camera,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
      };

      setProgress(60);

      // 上传
      await uploadPhotoWithMetadata(file, metadata);

      setProgress(100);
      setTimeout(() => onSuccess(), 500);
    } catch (error) {
      console.error("上传失败:", error);
      alert("上传失败: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">上传作品</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">选择图片 *</label>
            {preview ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview("");
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="block aspect-video border-2 border-dashed border-white/20 rounded-lg hover:border-accent-500 transition-colors cursor-pointer">
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Upload className="w-12 h-12 mb-4" />
                  <p className="font-medium">点击或拖拽上传图片</p>
                  <p className="text-sm mt-2">支持 JPG, PNG, WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">标题 *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
                placeholder="给你的作品起个名字"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">拍摄地点</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.locationName}
                  onChange={(e) =>
                    setFormData({ ...formData, locationName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
                  placeholder="例如：冰岛"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">拍摄日期</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.shootingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, shootingDate: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Camera */}
            <div>
              <label className="block text-sm font-medium mb-2">相机</label>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) =>
                    setFormData({ ...formData, camera: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">分类</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
              >
                <option value="风光">风光</option>
                <option value="人像">人像</option>
                <option value="街拍">街拍</option>
                <option value="建筑">建筑</option>
                <option value="动物">动物</option>
                <option value="其他">其他</option>
              </select>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">标签</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500"
                  placeholder="多个标签用逗号分隔，例如：冰岛,风光,日落"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">描述</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500 resize-none"
                placeholder="介绍一下这张作品..."
              />
            </div>

            {/* Options */}
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent-500"
                />
                <div>
                  <span className="font-medium">设为精选</span>
                  <p className="text-sm text-gray-400">将在首页展示</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent-500"
                />
                <div>
                  <span className="font-medium">立即发布</span>
                  <p className="text-sm text-gray-400">取消勾选保存为草稿</p>
                </div>
              </label>
            </div>
          </div>

          {/* Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>上传中...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-accent-500 to-purple-500"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 py-3 glass-effect hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={uploading || !file}
              className="flex-1 py-3 bg-gradient-to-r from-accent-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  上传中...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  上传作品
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
