import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 萤火虫粒子组件
function Firefly({ delay, duration, size = 'normal' }) {
  const randomX = Math.random() * 150 - 75  // 增加范围
  const randomY = Math.random() * 150 - 75  // 增加范围
  const particleSize = Math.random() * 3 + 2 // 随机大小 2-5px

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${particleSize}px`,
        height: `${particleSize}px`,
        background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 40%, transparent 70%)',
        boxShadow: '0 0 15px #ffeb3b, 0 0 25px #ffc107, 0 0 35px rgba(255, 193, 7, 0.5)',
      }}
      animate={{
        x: [0, randomX * 0.5, randomX, randomX * 1.2],
        y: [0, randomY * 0.5, randomY, randomY * 1.2],
        scale: [0, 1, 1.5, 0],
        opacity: [0, 0.8, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// 主Logo组件
export default function FireflyLogo({ className = '', size = 'normal', showText = true }) {
  const [hovering, setHovering] = useState(false)
  const fireflyCount = size === 'large' ? 50 : 30  // 大幅增加粒子数量
  
  const iconSize = {
    small: 'w-8 h-8',
    normal: 'w-10 h-10',
    large: 'w-16 h-16',
  }[size]

  const textSize = {
    small: 'text-base',
    normal: 'text-xl',
    large: 'text-3xl',
  }[size]

  return (
    <div
      className={`relative flex items-center space-x-3 ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Logo图标容器 */}
      <div className={`relative ${iconSize} flex items-center justify-center`}>
        {/* 萤火虫粒子效果 - 超级夸张版 */}
        {hovering && (
          <div className="absolute inset-0" style={{ overflow: 'visible' }}>
            {[...Array(fireflyCount)].map((_, i) => (
              <Firefly
                key={i}
                delay={i * 0.05}  // 更快的延迟
                duration={2 + Math.random() * 1.5}  // 更短的持续时间
                size={size}
              />
            ))}
          </div>
        )}

        {/* 中心光环 - 增强版 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: '-20px',
            background: 'radial-gradient(circle, rgba(255, 235, 59, 0.6) 0%, rgba(255, 193, 7, 0.3) 40%, transparent 70%)',
            boxShadow: hovering ? '0 0 40px rgba(255, 235, 59, 0.8), 0 0 80px rgba(255, 193, 7, 0.4)' : 'none',
          }}
          animate={{
            scale: hovering ? [1, 1.5, 1] : 1,
            opacity: hovering ? [0.7, 1, 0.7] : 0.3,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 外圈光环 */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'rgba(255, 193, 7, 0.4)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 萤火虫图标 SVG */}
        <motion.svg
          viewBox="0 0 100 100"
          className={iconSize}
          animate={{
            y: hovering ? [-2, 2, -2] : [0, -3, 0],
            rotate: hovering ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* 萤火虫身体 */}
          <motion.ellipse
            cx="50"
            cy="55"
            rx="12"
            ry="20"
            fill="url(#fireflyGradient)"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 萤火虫头部 */}
          <circle cx="50" cy="32" r="8" fill="#37474f" />

          {/* 触角 */}
          <motion.path
            d="M 46 28 Q 42 22 40 18"
            stroke="#37474f"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                'M 46 28 Q 42 22 40 18',
                'M 46 28 Q 43 20 42 16',
                'M 46 28 Q 42 22 40 18',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M 54 28 Q 58 22 60 18"
            stroke="#37474f"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                'M 54 28 Q 58 22 60 18',
                'M 54 28 Q 57 20 58 16',
                'M 54 28 Q 58 22 60 18',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1,
            }}
          />

          {/* 翅膀 */}
          <motion.ellipse
            cx="38"
            cy="45"
            rx="15"
            ry="8"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            animate={{
              rx: hovering ? [15, 18, 15] : [15, 16, 15],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.ellipse
            cx="62"
            cy="45"
            rx="15"
            ry="8"
            fill="rgba(255, 255, 255, 0.2)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            animate={{
              rx: hovering ? [15, 18, 15] : [15, 16, 15],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1,
            }}
          />

          {/* 发光部分 */}
          <motion.ellipse
            cx="50"
            cy="62"
            rx="10"
            ry="12"
            fill="url(#glowGradient)"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 光晕效果 */}
          <motion.circle
            cx="50"
            cy="62"
            r="18"
            fill="url(#haloGradient)"
            animate={{
              r: [16, 20, 16],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* 渐变定义 */}
          <defs>
            <radialGradient id="fireflyGradient">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="100%" stopColor="#2d3748" />
            </radialGradient>
            <radialGradient id="glowGradient">
              <stop offset="0%" stopColor="#ffeb3b" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffc107" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff9800" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="haloGradient">
              <stop offset="0%" stopColor="#ffeb3b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffc107" stopOpacity="0" />
            </radialGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Logo文字 */}
      {showText && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className={`font-serif font-bold ${textSize} relative inline-block`}
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #ffc107 50%, #ffeb3b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: hovering ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            皓萤摄影
          </motion.span>

          {/* 文字光晕 */}
          <motion.div
            className="absolute inset-0 blur-md opacity-0"
            style={{
              background: 'linear-gradient(135deg, #ffc107 0%, #ffeb3b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              opacity: hovering ? [0, 0.5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            皓萤摄影
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

// 简化版本 - 仅图标
export function FireflyIcon({ className = '', size = 24, animated = true }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={animated ? {
        filter: [
          'drop-shadow(0 0 2px #ffeb3b)',
          'drop-shadow(0 0 8px #ffc107)',
          'drop-shadow(0 0 2px #ffeb3b)',
        ],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="55" rx="12" ry="20" fill="#4a5568" />
        <circle cx="50" cy="32" r="8" fill="#37474f" />
        <ellipse cx="38" cy="45" rx="15" ry="8" fill="rgba(255, 255, 255, 0.2)" />
        <ellipse cx="62" cy="45" rx="15" ry="8" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="50" cy="62" r="10" fill="#ffeb3b" opacity="0.9" />
        <defs>
          <radialGradient id="simpleGlow">
            <stop offset="0%" stopColor="#ffeb3b" />
            <stop offset="100%" stopColor="#ffc107" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
