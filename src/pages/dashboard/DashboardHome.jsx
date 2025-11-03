import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  BookOpen,
  ShoppingBag,
  Eye,
  Heart,
  TrendingUp,
} from "lucide-react";
import { getPhotos } from "../../firebase/services/galleryService";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    photos: 0,
    stories: 0,
    products: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      // 获取作品数量
      const photos = await getPhotos({ isPublished: false }); // 获取所有作品，包括未发布的

      setStats({
        photos: photos.length,
        stories: 0, // 待实现
        products: 0, // 待实现
        views: photos.reduce((sum, photo) => sum + (photo.views || 0), 0),
      });
    } catch (error) {
      console.error("加载统计数据失败:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      label: "作品总数",
      value: stats.photos,
      icon: Camera,
      color: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/20",
    },
    {
      label: "故事数量",
      value: stats.stories,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/20",
    },
    {
      label: "商品数量",
      value: stats.products,
      icon: ShoppingBag,
      color: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/20",
    },
    {
      label: "总浏览量",
      value: stats.views,
      icon: Eye,
      color: "from-orange-500 to-red-500",
      iconBg: "bg-orange-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-xl p-6 relative overflow-hidden group"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-accent-400" />
                </div>

                <div className="text-3xl font-bold mb-1">
                  {loading ? "..." : stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold mb-4">快速操作</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.a
            href="/dashboard/gallery"
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors"
          >
            <Camera className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-semibold mb-1">上传作品</h4>
            <p className="text-sm text-gray-400">添加新的摄影作品</p>
          </motion.a>

          <motion.a
            href="/dashboard/stories"
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-colors"
          >
            <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold mb-1">写故事</h4>
            <p className="text-sm text-gray-400">分享拍摄背后的故事</p>
          </motion.a>

          <motion.a
            href="/dashboard/products"
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-colors"
          >
            <ShoppingBag className="w-8 h-8 text-green-400 mb-3" />
            <h4 className="font-semibold mb-1">添加商品</h4>
            <p className="text-sm text-gray-400">上架新的数字商品</p>
          </motion.a>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-xl p-6 border-l-4 border-accent-500"
      >
        <div className="flex items-start gap-4">
          <TrendingUp className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-2">💡 提示</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 上传作品时记得填写拍摄地点，这样才能在地图集中显示</li>
              <li>• 勾选"精选"选项，作品会显示在首页</li>
              <li>• 定期更新内容可以提高网站活跃度</li>
              <li>• 使用标签分类可以让访客更容易找到作品</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
