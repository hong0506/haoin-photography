import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Camera, Clock, ArrowRight } from "lucide-react";
import { stories } from "../data/stories";
import { Link } from "react-router-dom";

// 数据改由 ../data/stories 提供

function StoryCard({ story, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/stories/${story.id}`} className="block">
        <div className="glass-effect rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
          <div className="relative h-64 overflow-hidden">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-accent-500 text-black text-sm font-semibold rounded-full">
                {story.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-3 text-sm text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {story.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {story.date}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent-400 transition-colors">
              {story.title}
            </h2>
            <p className="text-gray-400 mb-4 line-clamp-2">{story.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{story.readTime}</span>
              </div>

              <div className="flex items-center text-accent-400 font-semibold group-hover:gap-3 transition-all">
                阅读更多
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Stories() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            摄影故事
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            每一次旅程，每一次快门，都值得被记录与分享
          </p>
        </motion.div>

        {/* Featured Story */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16"
        >
          <div className="relative h-[500px] rounded-3xl overflow-hidden glass-effect group">
            <img
              src={stories[0].coverImage}
              alt={stories[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-4 py-2 bg-accent-500 text-black text-sm font-semibold rounded-full mb-4">
                精选故事
              </span>

              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 max-w-3xl">
                {stories[0].title}
              </h2>

              <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                {stories[0].excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {stories[0].location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {stories[0].date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {stories[0].readTime}
                </span>
              </div>

              <Link
                to={`/stories/${stories[0].id}`}
                className="inline-flex items-center px-8 py-4 bg-accent-500 text-black font-semibold rounded-lg hover:bg-accent-400 transition-all"
              >
                阅读完整故事
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.slice(1).map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass-effect rounded-2xl p-12"
        >
          <Camera className="w-16 h-16 text-accent-400 mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-4">
            想要了解更多拍摄技巧？
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            订阅我的摄影通讯，获取独家拍摄心得、参数设置和后期教程
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-stretch gap-3"
          >
            <input
              type="email"
              placeholder="输入你的邮箱"
              required
              className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent-500 text-black font-semibold rounded-lg hover:bg-accent-400 transition-colors"
            >
              立即订阅
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
