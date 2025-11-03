import React, { useState } from 'react'
import { motion } from 'framer-motion'

// 增强的动态按钮组件
export function AnimatedButton({ children, onClick, variant = 'primary', icon: Icon, className = '' }) {
  const [ripples, setRipples] = useState([])

  const createRipple = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    }

    setRipples([...ripples, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    if (onClick) onClick(e)
  }

  const variants = {
    primary: 'bg-accent-500 text-black hover:bg-accent-400 shadow-lg shadow-accent-500/50',
    secondary: 'glass-effect hover:bg-white/10 shadow-lg',
    outline: 'border-2 border-accent-500 hover:bg-accent-500/10 shadow-lg shadow-accent-500/30',
  }

  return (
    <motion.button
      onClick={createRipple}
      className={`relative overflow-hidden px-8 py-4 font-semibold rounded-lg transition-all ${variants[variant]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        y: -3,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* 发光效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 波纹效果 */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* 按钮内容 */}
      <span className="relative flex items-center justify-center gap-2">
        {Icon && (
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
        )}
        {children}
      </span>

      {/* 边框光晕 */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  )
}

// 磁性按钮 - 鼠标靠近时吸引
export function MagneticButton({ children, className = '' }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      className={`relative px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-black font-semibold rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 3D 效果层 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
        style={{
          transform: `translate(${-position.x * 0.5}px, ${-position.y * 0.5}px)`,
        }}
      />

      <span className="relative z-10">{children}</span>

      {/* 闪光效果 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.button>
  )
}

// 3D 翻转按钮
export function FlipButton({ children, icon: Icon, className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      whileHover="hover"
      initial="initial"
    >
      <motion.button
        className="relative px-8 py-4 w-full font-semibold rounded-lg preserve-3d"
        variants={{
          initial: { rotateX: 0 },
          hover: { rotateX: 180 },
        }}
        transition={{ duration: 0.6 }}
      >
        {/* 正面 */}
        <motion.div
          className="absolute inset-0 bg-accent-500 text-black rounded-lg flex items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            {children}
          </span>
        </motion.div>

        {/* 背面 */}
        <motion.div
          className="absolute inset-0 bg-accent-600 text-black rounded-lg flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        >
          <span className="flex items-center gap-2">
            ✨ 点击我
          </span>
        </motion.div>

        {/* 占位 */}
        <span className="opacity-0">{children}</span>
      </motion.button>
    </motion.div>
  )
}
