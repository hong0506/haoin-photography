import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Package, Download } from 'lucide-react'

const products = [
  {
    id: 1,
    type: 'digital',
    name: 'Lightroom 预设包 - 旅行风格',
    description: '20个精心调制的 Lightroom 预设，适合旅行和风光摄影',
    price: '¥59',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600',
    features: ['20个预设', '适用于 Lightroom', '包含安装教程', '终身更新'],
  },
  {
    id: 2,
    type: 'digital',
    name: '手机摄影 LUT 包',
    description: '15个移动端 LUT 滤镜，一键调色',
    price: '¥39',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    features: ['15个 LUT', '支持主流APP', '视频教程', '即时下载'],
  },
  {
    id: 3,
    type: 'physical',
    name: '城市夜景明信片套装',
    description: '12张精选城市夜景摄影作品明信片',
    price: '¥49',
    rating: 5.0,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600',
    features: ['12张明信片', '优质纸张', '精美包装', '包邮'],
  },
  {
    id: 4,
    type: 'physical',
    name: '限量装裱画 - 冰岛风光',
    description: '40×60cm 专业装裱摄影作品',
    price: '¥399',
    rating: 5.0,
    reviews: 23,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600',
    features: ['40×60cm', '博物馆级纸张', '专业装裱', '限量50份'],
  },
  {
    id: 5,
    type: 'course',
    name: '城市夜景摄影课程',
    description: '2小时在线课程，掌握夜景拍摄技巧',
    price: '¥199',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600',
    features: ['2小时视频', '参数讲解', '后期教程', '终身观看'],
  },
  {
    id: 6,
    type: 'digital',
    name: '专业壁纸合集 - 全年订阅',
    description: '每月更新10张高清壁纸，全年120+张',
    price: '¥99/年',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    features: ['每月10张', '多种分辨率', '提前获取', '会员专属'],
  },
]

function ProductCard({ product, index }) {
  const getTypeLabel = (type) => {
    switch (type) {
      case 'digital': return '数字产品'
      case 'physical': return '实体产品'
      case 'course': return '在线课程'
      default: return ''
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'digital': return 'bg-blue-500'
      case 'physical': return 'bg-purple-500'
      case 'course': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="glass-effect rounded-2xl overflow-hidden group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 ${getTypeColor(product.type)} text-white text-xs font-semibold rounded-full`}>
            {getTypeLabel(product.type)}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          {product.type === 'digital' && (
            <div className="p-2 bg-black/50 rounded-full">
              <Download className="w-5 h-5" />
            </div>
          )}
          {product.type === 'physical' && (
            <div className="p-2 bg-black/50 rounded-full">
              <Package className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-accent-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews} 评价)</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-accent-400">{product.price}</div>
          <button className="px-6 py-2 bg-accent-500 text-black font-semibold rounded-lg hover:bg-accent-400 transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            购买
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Shop() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">摄影商店</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            精选数字产品、实体作品和在线课程，助你提升摄影技能
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['全部产品', '数字产品', '实体产品', '在线课程'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                tab === '全部产品'
                  ? 'bg-accent-500 text-black'
                  : 'glass-effect hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">常见问题</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-accent-400 mb-2">数字产品如何交付？</h3>
              <p className="text-sm text-gray-400">
                购买后立即通过邮件发送下载链接，支持终身下载和更新。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-accent-400 mb-2">实体产品配送时间？</h3>
              <p className="text-sm text-gray-400">
                国内顺丰包邮，通常3-5个工作日送达。海外订单请联系客服。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-accent-400 mb-2">是否支持退款？</h3>
              <p className="text-sm text-gray-400">
                数字产品不支持退款。实体产品收到后7天内可无理由退换。
              </p>
            </div>

            <div>
              <h3 className="font-bold text-accent-400 mb-2">课程可以反复观看吗？</h3>
              <p className="text-sm text-gray-400">
                是的，购买后可终身观看，支持在任何设备上学习。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
