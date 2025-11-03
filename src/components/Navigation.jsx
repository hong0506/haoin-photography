import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Image,
  Map,
  BookOpen,
  ShoppingBag,
  User,
  LogIn,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import FireflyLogo from "./FireflyLogo";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "./UserAvatar";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/gallery", label: "作品集", icon: Image },
  { path: "/map", label: "地图集", icon: Map },
  { path: "/stories", label: "故事", icon: BookOpen },
  { path: "/shop", label: "商店", icon: ShoppingBag },
  { path: "/about", label: "关于", icon: User },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass shadow-lg" : "bg-black/30 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="group">
              <FireflyLogo size="normal" showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all relative ${
                        isActive
                          ? "bg-accent-500/20 text-accent-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <motion.div
                        animate={isActive ? { rotate: [0, 360] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm font-medium">{item.label}</span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-accent-500/10 rounded-lg -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* User Menu */}
              <div className="ml-4 pl-4 border-l border-white/10 relative">
                {currentUser ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-1 hover:bg-white/5 rounded-full transition-all"
                    >
                      <UserAvatar user={currentUser} size="md" />
                      <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-56 glass-effect rounded-xl border border-white/10 shadow-xl overflow-hidden z-50"
                        >
                          <div className="p-4 border-b border-white/10">
                            <p className="font-medium truncate">{currentUser.displayName || '用户'}</p>
                            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                          </div>
                          
                          <div className="p-2">
                            <Link
                              to="/dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              to="/dashboard/settings"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <User className="w-4 h-4" />
                              <span>个人资料</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 glass-effect hover:bg-white/10 rounded-lg transition-all border border-accent-500/30"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="text-sm font-medium">登录</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-64 glass-effect md:hidden"
          >
            <div className="flex flex-col p-6 pt-20 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-accent-500/20 text-accent-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
                      <UserAvatar user={currentUser} size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{currentUser.displayName || '用户'}</p>
                        <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>个人资料</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 glass-effect border border-accent-500/30 rounded-lg text-gray-300 hover:text-white"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">登录</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
