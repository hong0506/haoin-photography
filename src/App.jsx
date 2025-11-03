import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import AuroraBackground from "./components/AuroraBackground";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import MapGallery from "./pages/MapGallery";
import Stories from "./pages/Stories";
import Shop from "./pages/Shop";
import About from "./pages/About";
import StoryDetail from "./pages/StoryDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WechatIcon from "./assets/wechat.svg";
import InstagramIcon from "./assets/instagram.svg";
import WechatQR from "./assets/wechat-qr-code.jpg";

// Footer Component
function FooterComponent({ showWechatModal, setShowWechatModal, showInstagramModal, setShowInstagramModal, copied, copyToClipboard }) {
  return (
    <>
      <footer className="border-t border-white/10 mt-20 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif font-bold text-xl mb-4">皓萤摄影</h3>
              <p className="text-gray-400 text-sm">
                用镜头捕捉光影，用萤光点亮瞬间
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/gallery" className="hover:text-accent-400 transition-colors">作品集</a></li>
                <li><a href="/stories" className="hover:text-accent-400 transition-colors">摄影故事</a></li>
                <li><a href="/map" className="hover:text-accent-400 transition-colors">地图集</a></li>
                <li><a href="/about" className="hover:text-accent-400 transition-colors">关于我</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">服务</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/shop" className="hover:text-accent-400 transition-colors">摄影商店</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">摄影教学</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">关注我</h4>
              <div className="flex gap-4">
                <button onClick={() => setShowWechatModal(true)} className="group flex items-center justify-center w-12 h-12 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110">
                  <img src={WechatIcon} alt="微信" className="w-6 h-6 filter brightness-0 invert" />
                </button>
                <button onClick={() => setShowInstagramModal(true)} className="group flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 hover:scale-110">
                  <img src={InstagramIcon} alt="Instagram" className="w-6 h-6 filter brightness-0 invert" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            <p>© 2025 皓萤摄影. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WeChat Modal */}
      <AnimatePresence>
        {showWechatModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowWechatModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">微信</h3>
                    <p className="text-green-100 text-sm">在微信上与我们联系</p>
                  </div>
                  <button onClick={() => setShowWechatModal(false)} className="text-white hover:text-green-100 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-800 text-center mb-4">扫描二维码关注我们的微信</p>
                <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                  <img src={WechatQR} alt="微信二维码" className="w-full h-full object-cover" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">微信号</p>
                  <p className="text-lg font-semibold text-gray-800 mb-3">lumifiretech</p>
                  <button onClick={() => copyToClipboard("lumifiretech")} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "已复制" : "复制微信号"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">复制微信号并在微信中搜索添加</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram Modal */}
      <AnimatePresence>
        {showInstagramModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInstagramModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Instagram</h3>
                    <p className="text-pink-100 text-sm">在Instagram上与我们联系</p>
                  </div>
                  <button onClick={() => setShowInstagramModal(false)} className="text-white hover:text-pink-100 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-800 text-center mb-4">关注我们的Instagram账号</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">账号</p>
                  <p className="text-lg font-semibold text-gray-800 mb-3">@haoin_tech</p>
                  <button onClick={() => copyToClipboard("@haoin_tech")} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "已复制" : "复制账号"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">复制账号并在Instagram中搜索关注</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Layout组件 - 条件渲染Navigation和Footer
function AppLayout({ children, showWechatModal, setShowWechatModal, showInstagramModal, setShowInstagramModal, copied, copyToClipboard }) {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith('/dashboard') || 
                           location.pathname === '/login' || 
                           location.pathname === '/signup';

  return (
    <>
      {!hideNavAndFooter && <Navigation />}
      {children}
      {!hideNavAndFooter && (
        <FooterComponent 
          showWechatModal={showWechatModal}
          setShowWechatModal={setShowWechatModal}
          showInstagramModal={showInstagramModal}
          setShowInstagramModal={setShowInstagramModal}
          copied={copied}
          copyToClipboard={copyToClipboard}
        />
      )}
    </>
  );
}

function App() {
  const [showWechatModal, setShowWechatModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen text-white">
          <AuroraBackground />
          
          <AppLayout
            showWechatModal={showWechatModal}
            setShowWechatModal={setShowWechatModal}
            showInstagramModal={showInstagramModal}
            setShowInstagramModal={setShowInstagramModal}
            copied={copied}
            copyToClipboard={copyToClipboard}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/map" element={<MapGallery />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AppLayout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// 路由切换后滚动到顶部
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);
  return null;
}
