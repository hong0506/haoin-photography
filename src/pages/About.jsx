import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Camera,
  MapPin,
  Code,
  Rocket,
  Globe,
  Heart,
  Smartphone,
  Plane,
  Mountain,
  Coffee,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import personalPhoto from "../assets/sheying-personal.jpg";

// 旅行足迹数据
const travelStats = [
  {
    label: "国家足迹",
    value: "15+",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "城市探索",
    value: "50+",
    icon: MapPin,
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "拍摄作品",
    value: "1000+",
    icon: Camera,
    color: "from-orange-500 to-red-500",
  },
];

// 去过的地方
const visitedPlaces = [
  { name: "中国", emoji: "🇨🇳", highlight: true },
  { name: "美国", emoji: "🇺🇸", highlight: true },
  { name: "捷克", emoji: "🇨🇿", highlight: true },
  { name: "匈牙利", emoji: "🇭🇺", highlight: true },
  { name: "奥地利", emoji: "🇦🇹", highlight: true },
  { name: "俄罗斯", emoji: "🇷🇺", highlight: true },
  { name: "泰国", emoji: "🇹🇭", highlight: true },
  { name: "马来西亚", emoji: "🇲🇾", highlight: true },
];

// 摄影装备
const equipment = [
  {
    category: "📷 相机",
    items: [{ name: "Sony α7 IV", desc: "主力全画幅相机", icon: Camera }],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    category: "🚁 无人机",
    items: [{ name: "DJI Mavic 3 Pro", desc: "航拍利器", icon: Plane }],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    category: "📱 手机",
    items: [
      { name: "iPhone", desc: "日常记录", icon: Smartphone },
      { name: "Huawei", desc: "备用机", icon: Smartphone },
    ],
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

// 摄影理念
const philosophies = [
  {
    title: "记录生活",
    desc: "捕捉每一个值得纪念的瞬间",
    icon: Heart,
    color: "text-red-400",
  },
  {
    title: "探索世界",
    desc: "用镜头丈量世界的每一寸土地",
    icon: Mountain,
    color: "text-blue-400",
  },
  {
    title: "分享美好",
    desc: "让更多人看到这个世界的美",
    icon: Sparkles,
    color: "text-yellow-400",
  },
];

// 时间线数据
const timeline = [
  { year: "2015", event: "开始摄影之旅", icon: Camera },
  { year: "2016", event: "第一次美国旅行", icon: Plane },
  { year: "2017", event: "第一次欧洲旅行", icon: Plane },
  { year: "2020", event: "留学生涯 - 美国", icon: GraduationCap },
  { year: "2025", event: "回国创业", icon: Rocket },
];

export default function About() {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-32"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 个人照片 - 添加3D倾斜效果 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={personalPhoto}
                  alt="个人照片"
                  className="w-full h-full object-cover"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-500/30 to-purple-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </motion.div>

            {/* 个人介绍 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* 身份标签 */}
              <div className="flex flex-wrap gap-3">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-accent-500/30"
                >
                  <Code className="w-4 h-4 text-accent-400" />
                  <span className="text-sm font-medium">程序员</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-purple-500/30"
                >
                  <Rocket className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">创业者</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-pink-500/30"
                >
                  <Camera className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium">摄影爱好者</span>
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl md:text-6xl font-serif font-bold"
              >
                你好，我是
                <br />
                <span className="gradient-text">光影行者</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4 text-gray-300 leading-relaxed"
              >
                <p className="text-lg">
                  白天，我是一名
                  <span className="text-accent-400 font-semibold">程序员</span>
                  ， 用代码构建数字世界；晚上，我是一名
                  <span className="text-purple-400 font-semibold">创业者</span>
                  ， 为梦想奔跑。
                </p>
                <p className="text-lg">
                  而在闲暇时光，我最喜欢做的事就是
                  <span className="text-pink-400 font-semibold">拍照</span>。
                  从2015年拿起相机开始，摄影已经成为我记录生活、探索世界的方式。
                </p>
                <p className="text-gray-400">
                  我相信，每一张照片都是时光的切片，每一次快门都是与世界的对话。
                  通过镜头，我想留住那些美好的瞬间，分享那些动人的故事。
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Travel Stats with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {travelStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(45, 212, 191, 0.2)",
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                className={`relative text-center glass-effect rounded-xl p-6 cursor-pointer overflow-hidden group`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <Icon
                  className={`w-8 h-8 mx-auto mb-3 text-accent-400 transition-transform duration-300 ${
                    hoveredStat === index ? "rotate-12 scale-110" : ""
                  }`}
                />
                <motion.div
                  className="text-4xl font-bold text-accent-400 mb-2"
                  animate={hoveredStat === index ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Visited Places - Fun Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">
            <Globe className="inline-block w-8 h-8 mr-2 text-accent-400" />
            我的足迹
          </h2>
          <p className="text-gray-400 text-center mb-8">
            用镜头记录下这些美好的地方 🌍
          </p>

          <div className="glass-effect rounded-2xl p-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {visitedPlaces.map((place, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    ${
                      place.highlight
                        ? "bg-gradient-to-r from-accent-500/20 to-purple-500/20 border-2 border-accent-500/50"
                        : "glass-effect border border-white/10"
                    }
                    hover:border-accent-500/50 transition-colors cursor-pointer
                  `}
                >
                  <span className="mr-2">{place.emoji}</span>
                  {place.name}
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-gray-500 mt-6"
            >
              ✨ 高亮的是最喜欢的目的地
            </motion.p>
          </div>
        </motion.div>

        {/* Equipment - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">
            <Camera className="inline-block w-8 h-8 mr-2 text-accent-400" />
            我的装备
          </h2>
          <p className="text-gray-400 text-center mb-8">
            简单的工具，记录不简单的故事
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {equipment.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative glass-effect rounded-xl p-6 overflow-hidden group`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6 text-accent-400">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ x: 5 }}
                          className="flex items-start gap-3"
                        >
                          <div className="p-2 bg-accent-500/10 rounded-lg mt-0.5">
                            <Icon className="w-4 h-4 text-accent-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {item.desc}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photography Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">
            <Heart className="inline-block w-8 h-8 mr-2 text-red-400" />
            摄影理念
          </h2>
          <p className="text-gray-400 text-center mb-12">为什么我喜欢摄影？</p>

          <div className="grid md:grid-cols-3 gap-6">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-effect rounded-xl p-8 text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-8 h-8 ${item.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline - Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">
            <Sparkles className="inline-block w-8 h-8 mr-2 text-yellow-400" />
            我的旅程
          </h2>
          <p className="text-gray-400 text-center mb-12">
            从程序员到创业者再到摄影爱好者的故事
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent-500 via-purple-500 to-pink-500 opacity-30" />

              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex items-center mb-16 ${
                      isLeft ? "justify-start" : "justify-end"
                    } md:flex hidden`}
                  >
                    {/* Content box */}
                    <div
                      className={`w-5/12 ${
                        isLeft ? "text-right pr-12" : "text-left pl-12"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass-effect rounded-xl p-6 inline-block max-w-sm"
                      >
                        <div className="text-accent-400 font-bold text-lg mb-2">
                          {item.year}
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {item.event}
                        </div>
                      </motion.div>
                    </div>

                    {/* Center icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360, x: "-50%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute w-16 h-16 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg shadow-accent-500/50 z-10"
                      style={{
                        left: "50%",
                        x: "-50%",
                        top: "50%",
                        marginTop: "-2rem",
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Mobile Timeline */}
              <div className="md:hidden space-y-8">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={`mobile-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-center"
                    >
                      {/* Mobile icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg shadow-accent-500/50 mr-4 flex-shrink-0"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Mobile content */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-effect rounded-xl p-4 flex-1"
                      >
                        <div className="text-accent-400 font-bold text-lg mb-1">
                          {item.year}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {item.event}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass-effect rounded-2xl p-12 relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-purple-500/20 blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Camera className="w-16 h-16 text-accent-400 mx-auto mb-6" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              继续探索，继续记录
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              感谢你阅读到这里 👋
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              这个世界还有太多美好等待发现，镜头下的故事也将继续。
              如果你也热爱摄影，欢迎在作品集中查看更多照片，
              或者在地图集中看看我都去过哪些地方。
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <motion.a
                href="/gallery"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 transition-all"
              >
                <Camera className="w-5 h-5 mr-2" />
                查看作品集
              </motion.a>
              <motion.a
                href="/map"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 glass-effect hover:bg-white/10 font-semibold rounded-lg transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                探索地图集
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-gray-500"
            >
              <p>📧 contact@haoin.tech</p>
              <p>💬 微信: lumifiretech</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
