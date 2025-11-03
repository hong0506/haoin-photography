import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import BackButton from "../../components/BackButton";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">数据统计</h2>
        <p className="text-gray-400 mt-1">查看你的网站数据分析</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 glass-effect rounded-xl"
      >
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">数据统计功能开发中</h3>
        <p className="text-gray-400">即将推出，敬请期待</p>
      </motion.div>
    </div>
  );
}
