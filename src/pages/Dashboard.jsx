import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Camera,
  BookOpen,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Upload,
  Menu,
  X,
  Home,
} from "lucide-react";
import UserAvatar from "../components/UserAvatar";

// Dashboard子页面
import DashboardHome from "./dashboard/DashboardHome";
import GalleryManage from "./dashboard/GalleryManage";
import StoryManage from "./dashboard/StoryManage";
import ProductManage from "./dashboard/ProductManage";
import Analytics from "./dashboard/Analytics";
import SettingsPage from "./dashboard/SettingsPage";

const menuItems = [
  { path: "", icon: Home, label: "概览" },
  { path: "gallery", icon: Camera, label: "作品管理" },
  { path: "stories", icon: BookOpen, label: "故事管理" },
  { path: "products", icon: ShoppingBag, label: "商品管理" },
  { path: "settings", icon: Settings, label: "设置" },
];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("登出失败:", error);
    }
  };

  const currentPath = location.pathname.replace("/dashboard", "") || "/";

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <motion.aside
        initial={isDesktop ? { x: 0 } : false}
        animate={{ x: isDesktop ? 0 : sidebarOpen ? 0 : "-100%" }}
        transition={{ duration: isDesktop ? 0 : 0.3 }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:mt-[15px]
          w-72 bg-gray-900/80 backdrop-blur-xl border-r border-white/10
          flex flex-col
          lg:translate-x-0 transition-transform duration-300 lg:transition-none
        `}
      >
        {/* Logo */}
        <div className="px-6 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold">Dashboard</h2>
              <p className="text-xs text-gray-400">管理控制台</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === `/${item.path}`;

            return (
              <Link
                key={item.path}
                to={`/dashboard/${item.path}`}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-accent-500/20 text-accent-400 border border-accent-500/30"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 mb-3 px-2 py-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <UserAvatar user={currentUser} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {currentUser?.displayName || "用户"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentUser?.email}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">退出登录</span>
          </button>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-[15px] z-30 bg-gray-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h1 className="text-xl font-bold">
                  {menuItems.find((item) => `/${item.path}` === currentPath)
                    ?.label || "概览"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                返回网站
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="gallery" element={<GalleryManage />} />
              <Route path="stories" element={<StoryManage />} />
              <Route path="products" element={<ProductManage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
