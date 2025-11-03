import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Map, Image as ImageIcon, BookOpen } from "lucide-react";
import { AnimatedButton, MagneticButton } from "../components/AnimatedButton";
import AnimatedTitle from "../components/AnimatedTitle";

const featuredPhotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    location: "阿尔卑斯山",
    camera: "Sony A7III",
    focal: "24mm",
    aperture: "f/8",
    shutter: "1/500s",
    iso: "100",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
    location: "冰岛黑沙滩",
    camera: "Sony A7III",
    focal: "35mm",
    aperture: "f/11",
    shutter: "1/250s",
    iso: "200",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    location: "东京夜景",
    camera: "Sony A7III",
    focal: "50mm",
    aperture: "f/1.8",
    shutter: "1/60s",
    iso: "800",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    location: "挪威峡湾",
    camera: "Sony A7III",
    focal: "85mm",
    aperture: "f/2.8",
    shutter: "1/1000s",
    iso: "100",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
    location: "摩洛哥撒哈拉",
    camera: "Sony A7III",
    focal: "24mm",
    aperture: "f/16",
    shutter: "1/125s",
    iso: "100",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    location: "新西兰南岛",
    camera: "Sony A7III",
    focal: "16mm",
    aperture: "f/8",
    shutter: "1/320s",
    iso: "100",
  },
];

const entryCards = [
  {
    title: "作品集",
    description: "探索我镜头下的世界",
    icon: ImageIcon,
    link: "/gallery",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "地图集",
    description: "在地图上重走我的足迹",
    icon: Map,
    link: "/map",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "故事",
    description: "分享摄影背后的故事与感悟",
    icon: BookOpen,
    link: "/stories",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative p-12 rounded-3xl shadow-2xl hero-surface hero-grid"
        >
          <span className="hero-sheen" />
          <AnimatedTitle />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/gallery">
              <AnimatedButton variant="primary" icon={ImageIcon}>
                浏览作品集
              </AnimatedButton>
            </Link>

            <Link to="/stories">
              <AnimatedButton variant="secondary">阅读故事</AnimatedButton>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator removed */}
      </div>
    </section>
  );
}

function FeaturedGallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-20 px-4 -mt-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            精选作品
          </h2>
          <p
            className="text-white text-lg"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            感受光影的魅力
          </p>
        </motion.div>

        {/* Grid Gallery - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer glow"
            >
              <img
                src={photo.src}
                alt={photo.location}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-serif font-bold mb-2">
                  {photo.location}
                </h3>
              </div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center text-accent-400 hover:text-accent-300 font-semibold transition-colors"
          >
            查看全部作品
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EntryCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {entryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="relative"
              >
                <Link
                  to={card.link}
                  className={`block p-8 rounded-2xl glass-effect hover:bg-white/10 transition-all bg-gradient-to-br ${card.gradient} group relative overflow-hidden`}
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), transparent)",
                    }}
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="mb-6 relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-12 h-12 text-accent-400 drop-shadow-lg" />
                    </motion.div>
                    {/* Icon glow */}
                    <motion.div
                      className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(45,212,191,0.4) 0%, transparent 70%)",
                      }}
                    />
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{card.description}</p>

                  <div className="flex items-center text-accent-400 font-semibold">
                    探索更多
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-12"
      >
        <h2
          className="text-3xl md:text-4xl font-serif font-bold mb-4"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
        >
          订阅我的摄影故事
        </h2>
        <p
          className="text-white mb-8"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          每月精选作品、拍摄心得，以及独家壁纸下载
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <motion.input
            type="email"
            placeholder="输入你的邮箱"
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
            whileFocus={{ scale: 1.02, borderColor: "rgba(45,212,191,1)" }}
          />
          <MagneticButton className="px-8">订阅</MagneticButton>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          订阅即可获得免费壁纸包 · 随时可取消订阅
        </p>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedGallery />
      <EntryCards />
      <Newsletter />
    </div>
  );
}
