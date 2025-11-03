import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";
import BackButton from "../../components/BackButton";

export default function StoryManage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">故事管理</h2>
          <p className="text-gray-400 mt-1">管理你的摄影故事和博客</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          写新故事
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 glass-effect rounded-xl"
      >
        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">故事功能开发中</h3>
        <p className="text-gray-400">即将推出，敬请期待</p>
      </motion.div>
    </div>
  );
}
