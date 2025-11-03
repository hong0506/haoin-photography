import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  Camera,
  MapPin,
  Calendar,
  Aperture,
  Search,
  Download,
  Play,
  FileImage,
  FileVideo,
  Shield,
  AlertCircle,
} from "lucide-react";

// 示例作品数据
const artworks = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
    category: "自然",
    location: "阿尔卑斯山",
    country: "瑞士",
    city: "因特拉肯",
    spot: "少女峰周边",
    description: "清晨薄雾刚散，雪峰与云海在粉橘色的天光里交织。",
    date: "2024-03",
    camera: "Sony A7III",
    lens: "24-70mm f/2.8",
    focal: "24mm",
    aperture: "f/8",
    tall: true,
    type: "image", // image 或 video
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600",
    category: "海洋",
    location: "冰岛黑沙滩",
    country: "冰岛",
    city: "维克",
    spot: "Reynisfjara Beach",
    description: "海浪拍打玄武岩柱，风很冷，但天空格外通透。",
    date: "2024-02",
    camera: "Sony A7III",
    lens: "35mm f/1.8",
    focal: "35mm",
    aperture: "f/11",
    tall: false,
    type: "image",
  },
  {
    id: 11,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "自然",
    location: "森林时光",
    country: "加拿大",
    city: "班夫",
    spot: "班夫国家公园",
    description: "延时摄影记录森林中光影变化的美丽瞬间。",
    date: "2024-01",
    camera: "Sony A7III",
    lens: "24-70mm f/2.8",
    focal: "35mm",
    aperture: "f/8",
    tall: false,
    type: "video",
    duration: "00:30",
  },
  {
    id: 12,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "城市",
    location: "都市夜景",
    country: "日本",
    city: "东京",
    spot: "涩谷十字路口",
    description: "东京涩谷十字路口的延时摄影，展现都市的活力与节奏。",
    date: "2024-01",
    camera: "Sony A7III",
    lens: "50mm f/1.4",
    focal: "50mm",
    aperture: "f/2.8",
    tall: false,
    type: "video",
    duration: "00:45",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1600",
    category: "城市",
    location: "东京夜景",
    country: "日本",
    city: "东京",
    spot: "六本木之丘",
    description: "车流与灯海汇成银河般的流线，城市在呼吸。",
    date: "2024-01",
    camera: "Sony A7III",
    lens: "50mm f/1.8",
    focal: "50mm",
    aperture: "f/1.8",
    tall: true,
    type: "image",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    category: "自然",
    location: "挪威",
    date: "2023-12",
    camera: "Sony A7III",
    focal: "85mm",
    aperture: "f/2.8",
    tall: false,
    type: "image",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
    category: "沙漠",
    location: "撒哈拉",
    date: "2023-11",
    camera: "Sony A7III",
    focal: "24mm",
    aperture: "f/16",
    tall: true,
    type: "image",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    category: "星空",
    location: "新西兰",
    date: "2023-10",
    camera: "Sony A7III",
    focal: "14mm",
    aperture: "f/2.8",
    tall: false,
    type: "image",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    category: "自然",
    location: "瑞士",
    date: "2023-09",
    camera: "Sony A7III",
    focal: "24mm",
    aperture: "f/11",
    tall: true,
    type: "image",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    category: "森林",
    location: "加拿大",
    date: "2023-08",
    camera: "Sony A7III",
    focal: "35mm",
    aperture: "f/5.6",
    tall: false,
    type: "image",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    category: "城市",
    location: "纽约",
    date: "2023-07",
    camera: "Sony A7III",
    focal: "50mm",
    aperture: "f/2",
    tall: true,
    type: "image",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    category: "建筑",
    location: "巴黎",
    date: "2023-06",
    camera: "Sony A7III",
    focal: "24mm",
    aperture: "f/8",
    tall: false,
    type: "image",
  },
];

const categories = [
  "全部",
  "自然",
  "城市",
  "海洋",
  "沙漠",
  "星空",
  "森林",
  "建筑",
];

function ImageCard({ artwork, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${
        artwork.tall ? "row-span-2" : ""
      }`}
      onClick={() => onClick(artwork)}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {artwork.type === "video" ? (
        <video
          src={artwork.src}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          onLoadedData={() => setLoaded(true)}
        />
      ) : (
        <img
          src={artwork.src}
          alt={artwork.location}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Video Play Icon */}
      {artwork.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Media Type Badge */}
      <div className="absolute top-2 left-2">
        <div className="flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-white text-xs">
          {artwork.type === "video" ? (
            <>
              <FileVideo className="w-3 h-3" />
              {artwork.duration && <span>{artwork.duration}</span>}
            </>
          ) : (
            <FileImage className="w-3 h-3" />
          )}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold">{artwork.location}</h3>
          <span className="px-2 py-1 bg-accent-500/80 text-black text-xs font-semibold rounded">
            {artwork.category}
          </span>
        </div>
        {/* 隐藏焦距与光圈信息以保持卡片简洁 */}
      </div>
    </motion.div>
  );
}

function Lightbox({ artwork, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!artwork) return null;

  const convertAndDownload = (src, filename, format) =>
    new Promise((resolve, reject) => {
      if (artwork.type === "video") {
        // 视频直接下载
        const link = document.createElement("a");
        link.href = src;
        link.download = `${filename}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      } else {
        // 图片转换下载
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const mime = format === "png" ? "image/png" : "image/jpeg";
            const dataUrl = canvas.toDataURL(mime, 0.92);
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${filename}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve();
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        const highRes = src.replace(/([?&])w=\d+/, "$1w=2400");
        img.src = highRes;
      }
    });

  const handleDownload = async (format) => {
    try {
      setDownloading(true);
      await convertAndDownload(
        artwork.src,
        artwork.location.replace(/\s+/g, "_"),
        format
      );
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/95 p-4 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full glass-effect hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full mt-[8vh] mb-[8vh]"
      >
        <div className="relative w-full">
          {artwork.type === "video" ? (
            <video
              src={artwork.src}
              controls
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
              poster={artwork.poster}
            />
          ) : (
            <img
              src={artwork.src}
              alt={artwork.location}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
          )}
        </div>

        <div className="mt-6 glass-effect rounded-lg p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">
                {artwork.location}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {artwork.country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {artwork.country}
                  </span>
                )}
                {artwork.city && (
                  <span className="flex items-center gap-1">
                    {artwork.city}
                  </span>
                )}
                {artwork.spot && (
                  <span className="flex items-center gap-1">
                    {artwork.spot}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {artwork.date}
                </span>
                {artwork.duration && (
                  <span className="flex items-center gap-1">
                    <FileVideo className="w-4 h-4" />
                    {artwork.duration}
                  </span>
                )}
              </div>
            </div>

            <span className="px-4 py-2 bg-accent-500 text-black font-semibold rounded-lg">
              {artwork.category}
            </span>
          </div>

          {artwork.description && (
            <div className="text-sm text-gray-300 leading-relaxed mb-4">
              {artwork.description}
            </div>
          )}

          {/* Download Section */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Download className="w-5 h-5" />
              下载作品
            </h3>

            {downloaded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-green-400 text-sm mb-4"
              >
                <Shield className="w-4 h-4" />
                下载已开始，请在浏览器下载列表查看
              </motion.div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {artwork.type === "image" ? (
                <>
                  <button
                    onClick={() => handleDownload("jpg")}
                    disabled={downloading}
                    className="py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-accent-500 text-black hover:bg-accent-400 disabled:opacity-70"
                  >
                    {downloading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileImage className="w-5 h-5" />
                    )}
                    下载 JPG
                  </button>
                  <button
                    onClick={() => handleDownload("png")}
                    disabled={downloading}
                    className="py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-accent-500 text-black hover:bg-accent-400 disabled:opacity-70"
                  >
                    {downloading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileImage className="w-5 h-5" />
                    )}
                    下载 PNG
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDownload("mp4")}
                  disabled={downloading}
                  className="py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-accent-500 text-black hover:bg-accent-400 disabled:opacity-70 col-span-2 sm:col-span-1"
                >
                  {downloading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FileVideo className="w-5 h-5" />
                  )}
                  下载 MP4
                </button>
              )}
            </div>

            {/* Usage License */}
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-200">
                <p className="font-semibold mb-1">使用许可说明</p>
                <ul className="text-xs space-y-1 text-yellow-300/80">
                  <li>• 仅供个人非商业用途使用</li>
                  <li>• 禁止用于商业用途或盈利目的</li>
                  <li>• 禁止二次销售或分发</li>
                  <li>• 使用时请保留原始署名</li>
                  <li>• 如有商业需求请联系授权</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-xs text-gray-500 mb-1">相机</div>
              <div className="font-semibold">{artwork.camera}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">镜头</div>
              <div className="font-semibold">
                {artwork.lens || artwork.focal}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">拍摄日期</div>
              <div className="font-semibold">{artwork.date}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">类型</div>
              <div className="font-semibold flex items-center gap-1">
                {artwork.type === "video" ? (
                  <>
                    <FileVideo className="w-4 h-4" />
                    视频
                  </>
                ) : (
                  <>
                    <FileImage className="w-4 h-4" />
                    图片
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory =
      selectedCategory === "全部" || artwork.category === selectedCategory;
    const matchesSearch =
      artwork.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 防止背景滚动
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedArtwork]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            作品集
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            每一张照片背后，都有一段难忘的旅程和故事
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索地点或类别..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-effect rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent-500 text-black"
                    : "glass-effect hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-gray-400">
          共 {filteredArtworks.length} 张作品
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => (
              <ImageCard
                key={artwork.id}
                artwork={artwork}
                onClick={setSelectedArtwork}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">未找到符合条件的作品</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
