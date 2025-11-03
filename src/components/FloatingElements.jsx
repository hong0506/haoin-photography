import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Aperture, Focus, Sparkles } from 'lucide-react'

// 漂浮的装饰元素
export default function FloatingElements() {
  const icons = [
    { Icon: Camera, delay: 0, x: '10%', y: '20%' },
    { Icon: Aperture, delay: 1, x: '85%', y: '15%' },
    { Icon: Focus, delay: 2, x: '15%', y: '70%' },
    { Icon: Sparkles, delay: 1.5, x: '80%', y: '65%' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-16 h-16 text-accent-400/20" strokeWidth={1} />
        </motion.div>
      ))}

      {/* 闪烁的光点 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-accent-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 流动的渐变球 */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-accent-500/10 to-purple-500/10 rounded-full blur-3xl"
        style={{ left: '20%', top: '40%' }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-blue-500/10 to-accent-500/10 rounded-full blur-3xl"
        style={{ right: '10%', bottom: '20%' }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
