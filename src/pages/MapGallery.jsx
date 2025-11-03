import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Camera,
  Calendar,
  X,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import AMapLoader from "@amap/amap-jsapi-loader";

// 高德地图API Key（请替换为你自己的key）
const AMAP_KEY = "0211c48008c03397257ff6dfe0d2e044";

// 照片位置数据 - 包含完整的地理信息
const photoLocations = [
  {
    id: 1,
    city: "策马特",
    country: "瑞士",
    coordinates: { lat: 46.0207, lng: 7.7491 },
    photos: [
      {
        id: 101,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        date: "2024-03-15",
      },
      {
        id: 102,
        url: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=800",
        date: "2024-03-16",
      },
      {
        id: 103,
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        date: "2024-03-17",
      },
    ],
  },
  {
    id: 2,
    city: "维克",
    country: "冰岛",
    coordinates: { lat: 63.4186, lng: -19.0108 },
    photos: [
      {
        id: 201,
        url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
        date: "2024-02-10",
      },
      {
        id: 202,
        url: "https://images.unsplash.com/photo-1504233529578-6d46baba2f34?w=800",
        date: "2024-02-11",
      },
    ],
  },
  {
    id: 3,
    city: "东京",
    country: "日本",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    photos: [
      {
        id: 301,
        url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        date: "2024-01-20",
      },
      {
        id: 302,
        url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800",
        date: "2024-01-21",
      },
      {
        id: 303,
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
        date: "2024-01-22",
      },
    ],
  },
  {
    id: 4,
    city: "卑尔根",
    country: "挪威",
    coordinates: { lat: 60.3913, lng: 5.3221 },
    photos: [
      {
        id: 401,
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
        date: "2023-12-05",
      },
      {
        id: 402,
        url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800",
        date: "2023-12-06",
      },
    ],
  },
  {
    id: 5,
    city: "马拉喀什",
    country: "摩洛哥",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    photos: [
      {
        id: 501,
        url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
        date: "2023-11-10",
      },
      {
        id: 502,
        url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800",
        date: "2023-11-11",
      },
      {
        id: 503,
        url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
        date: "2023-11-12",
      },
    ],
  },
  {
    id: 6,
    city: "悉尼",
    country: "澳大利亚",
    coordinates: { lat: -33.8688, lng: 151.2093 },
    photos: [
      {
        id: 601,
        url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
        date: "2023-10-15",
      },
      {
        id: 602,
        url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800",
        date: "2023-10-16",
      },
    ],
  },
  {
    id: 7,
    city: "纽约",
    country: "美国",
    coordinates: { lat: 40.7128, lng: -74.006 },
    photos: [
      {
        id: 701,
        url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
        date: "2023-09-20",
      },
      {
        id: 702,
        url: "https://images.unsplash.com/photo-1494949649109-ecfc3b8c35e0?w=800",
        date: "2023-09-21",
      },
      {
        id: 703,
        url: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800",
        date: "2023-09-22",
      },
    ],
  },
];

function LocationCard({ location, onClick }) {
  const photoCount = location.photos.length;
  const latestPhoto = location.photos[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(location)}
      className="glass-effect rounded-xl overflow-hidden cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={latestPhoto.url}
          alt={location.city}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute top-3 right-3 px-3 py-1 bg-accent-500 text-black text-sm font-semibold rounded-full">
          {photoCount} 张
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-serif font-bold mb-1">
              {location.city}
            </h3>
            <p className="text-sm text-gray-400">{location.country}</p>
          </div>
          <MapPin className="w-5 h-5 text-accent-400" />
        </div>

        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          {latestPhoto.date}
        </div>
      </div>
    </motion.div>
  );
}

function LocationModal({ location, onClose }) {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
    >
      <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative">
        {/* 关闭按钮移到Modal外部右上角 */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-3 rounded-full bg-accent-500/20 hover:bg-accent-500/40 backdrop-blur-md transition-all duration-300 group border border-accent-500/30"
          title="关闭"
        >
          <X className="w-6 h-6 text-accent-400 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-effect rounded-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">
                  {location.city}
                </h2>
                <p className="text-xl text-gray-300 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {location.country}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-accent-400">
                  {location.photos.length}
                </div>
                <div className="text-sm text-gray-400">张照片</div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="p-8">
            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-accent-400" />
              相册
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {location.photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={`${location.city} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3 flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {photo.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <div className="px-8 pb-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-400" />
                {location.coordinates.lat.toFixed(4)}°N,{" "}
                {location.coordinates.lng.toFixed(4)}°E
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 高德地图组件
function AMapComponent({ locations, onMarkerClick }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // 初始化高德地图
    AMapLoader.load({
      key: AMAP_KEY,
      version: "2.0",
      plugins: ["AMap.Marker", "AMap.InfoWindow"],
    })
      .then((AMap) => {
        // 创建地图实例
        const map = new AMap.Map(mapRef.current, {
          zoom: 2,
          center: [0, 30],
          mapStyle: "amap://styles/grey", // 幻影黑主题（更有设计感）
          viewMode: "3D",
          pitch: 0,
          features: ["bg", "road", "building", "point"], // 简化地图元素
          zoomEnable: true,
          scrollWheel: true,
          doubleClickZoom: true,
          keyboardEnable: true,
        });

        mapInstanceRef.current = map;

        // 创建标记点
        locations.forEach((location) => {
          // 创建自定义图标
          const icon = new AMap.Icon({
            image:
              "data:image/svg+xml;base64," +
              btoa(`
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#2dd4bf" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
              <path d="M14.5 14h-5L7 17H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3l-2.5-3z" 
                    fill="none" stroke="#000" stroke-width="2" transform="translate(4, 4) scale(0.7)"/>
              <circle cx="20" cy="20" r="3" fill="none" stroke="#000" stroke-width="2"/>
            </svg>
          `),
            size: new AMap.Size(40, 40),
            imageSize: new AMap.Size(40, 40),
          });

          const marker = new AMap.Marker({
            position: [location.coordinates.lng, location.coordinates.lat],
            icon: icon,
            title: location.city,
            extData: location,
          });

          // 创建信息窗口（深色主题）
          const infoWindow = new AMap.InfoWindow({
            content: `
            <div style="
              background: linear-gradient(135deg, rgba(0, 8, 10, 0.95), rgba(0, 6, 8, 0.98));
              backdrop-filter: blur(12px);
              border: 1px solid rgba(45, 212, 191, 0.3);
              border-radius: 12px;
              padding: 12px 16px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(45, 212, 191, 0.2);
              min-width: 140px;
              position: relative;
              transform: translateZ(0);
              will-change: transform;
            ">
              <div style="
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid rgba(45, 212, 191, 0.3);
              "></div>
              <h3 style="
                font-weight: 600;
                font-size: 15px;
                margin: 0 0 6px 0;
                color: #fff;
                font-family: 'Inter', sans-serif;
              ">
                ${location.city}
              </h3>
              <p style="
                font-size: 13px;
                color: #94a3b8;
                margin: 0 0 8px 0;
                font-weight: 400;
              ">
                ${location.country}
              </p>
              <div style="
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                color: #2dd4bf;
                font-weight: 500;
              ">
                <span style="font-size: 14px;">📸</span>
                <span>${location.photos.length} 张照片</span>
              </div>
            </div>
          `,
            offset: new AMap.Pixel(0, -8),
            isCustom: true,
            autoMove: false,
            closeWhenClickMap: true,
            showShadow: false,
            borderStyle: "none",
            borderRadius: 0,
            padding: 0,
            margin: 0,
          });

          // 点击标记
          marker.on("click", () => {
            onMarkerClick(location);
          });

          // 悬停显示信息
          marker.on("mouseover", () => {
            infoWindow.open(map, marker.getPosition());
          });

          marker.on("mouseout", () => {
            infoWindow.close();
          });

          marker.setMap(map);
          markersRef.current.push(marker);
        });

        // 添加自定义缩放控件
        const zoomControl = document.createElement("div");
        zoomControl.className = "custom-zoom-control";
        zoomControl.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `;

        // 放大按钮
        const zoomInBtn = document.createElement("button");
        zoomInBtn.innerHTML = "+";
        zoomInBtn.style.cssText = `
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(0, 8, 10, 0.9), rgba(0, 6, 8, 0.95));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(45, 212, 191, 0.3);
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        `;
        zoomInBtn.onmouseover = () => {
          zoomInBtn.style.background =
            "linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(20, 184, 166, 0.2))";
          zoomInBtn.style.borderColor = "rgba(45, 212, 191, 0.6)";
          zoomInBtn.style.transform = "scale(1.05)";
        };
        zoomInBtn.onmouseout = () => {
          zoomInBtn.style.background =
            "linear-gradient(135deg, rgba(0, 8, 10, 0.9), rgba(0, 6, 8, 0.95))";
          zoomInBtn.style.borderColor = "rgba(45, 212, 191, 0.3)";
          zoomInBtn.style.transform = "scale(1)";
        };
        zoomInBtn.onclick = () => {
          const currentZoom = map.getZoom();
          map.setZoom(currentZoom + 1);
        };

        // 缩小按钮
        const zoomOutBtn = document.createElement("button");
        zoomOutBtn.innerHTML = "−";
        zoomOutBtn.style.cssText = `
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(0, 8, 10, 0.9), rgba(0, 6, 8, 0.95));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(45, 212, 191, 0.3);
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        `;
        zoomOutBtn.onmouseover = () => {
          zoomOutBtn.style.background =
            "linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(20, 184, 166, 0.2))";
          zoomOutBtn.style.borderColor = "rgba(45, 212, 191, 0.6)";
          zoomOutBtn.style.transform = "scale(1.05)";
        };
        zoomOutBtn.onmouseout = () => {
          zoomOutBtn.style.background =
            "linear-gradient(135deg, rgba(0, 8, 10, 0.9), rgba(0, 6, 8, 0.95))";
          zoomOutBtn.style.borderColor = "rgba(45, 212, 191, 0.3)";
          zoomOutBtn.style.transform = "scale(1)";
        };
        zoomOutBtn.onclick = () => {
          const currentZoom = map.getZoom();
          map.setZoom(currentZoom - 1);
        };

        zoomControl.appendChild(zoomInBtn);
        zoomControl.appendChild(zoomOutBtn);
        mapRef.current.appendChild(zoomControl);
      })
      .catch((e) => {
        console.error("高德地图加载失败", e);
      });

    // 清理
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [locations, onMarkerClick]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

export default function MapGallery() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // 动态计算统计数据
  const stats = useMemo(() => {
    const countries = new Set(photoLocations.map((loc) => loc.country));
    const cities = photoLocations.length;
    const totalPhotos = photoLocations.reduce(
      (sum, loc) => sum + loc.photos.length,
      0
    );

    return {
      countries: countries.size,
      cities,
      totalPhotos,
    };
  }, []);

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
            地图集
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            跟随我的镜头，环游世界的每一个角落
          </p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 h-[500px] rounded-2xl overflow-hidden relative shadow-2xl border border-accent-500/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(45, 212, 191, 0.05), rgba(20, 184, 166, 0.02))",
            boxShadow:
              "0 0 60px rgba(45, 212, 191, 0.15), 0 20px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <AMapComponent
            locations={photoLocations}
            onMarkerClick={setSelectedLocation}
          />

          {/* Map overlay instructions */}
          <div className="absolute top-4 left-4 glass-effect px-4 py-2 rounded-lg text-sm text-gray-300 z-10 pointer-events-none backdrop-blur-md border border-accent-500/20">
            <p className="flex items-center gap-2">
              <span className="text-accent-400">🗺️</span>
              <span>点击标记点查看相册 · 可拖拽缩放</span>
            </p>
          </div>
        </motion.div>

        {/* Location Grid */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6">所有拍摄地点</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={setSelectedLocation}
              />
            ))}
          </div>
        </div>

        {/* Stats - Dynamic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6"
        >
          <div className="text-center glass-effect rounded-xl p-8">
            <motion.div
              className="text-5xl font-bold text-accent-400 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {stats.countries}
            </motion.div>
            <div className="text-gray-400">国家/地区</div>
          </div>

          <div className="text-center glass-effect rounded-xl p-8">
            <motion.div
              className="text-5xl font-bold text-accent-400 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              {stats.cities}
            </motion.div>
            <div className="text-gray-400">城市</div>
          </div>

          <div className="text-center glass-effect rounded-xl p-8">
            <motion.div
              className="text-5xl font-bold text-accent-400 mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              {stats.totalPhotos}
            </motion.div>
            <div className="text-gray-400">总照片</div>
          </div>
        </motion.div>
      </div>

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <LocationModal
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
