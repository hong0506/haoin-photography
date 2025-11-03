import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function AnimatedTitle() {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 relative">
          {/* 3D层叠效果 - 后层 */}
          <motion.span
            className="absolute inset-0 text-transparent"
            style={{
              WebkitTextStroke: '2px rgba(0, 204, 204, 0.3)',
              transform: 'translateZ(-20px)',
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0.5,
            }}
          >
            用光影
            <span className="ml-4">记录世界</span>
          </motion.span>

          {/* 3D层叠效果 - 中层 */}
          <motion.span
            className="absolute inset-0 text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
              transform: 'translateZ(-10px)',
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
          >
            用光影
            <span className="ml-4">记录世界</span>
          </motion.span>

          {/* 主文字层 */}
          <motion.span
            className="relative inline-block"
            style={{
              transform: 'translateZ(0px)',
            }}
          >
            {/* 用光影 - 逐字动画 */}
            {'用光影'.split('').map((char, i) => (
              <motion.span
                key={`char1-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  color: '#00cccc',
                  textShadow: '0 0 20px rgba(0, 204, 204, 0.8)',
                  transition: { duration: 0.2 },
                }}
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)',
                }}
              >
                {char}
              </motion.span>
            ))}

            {/* 记录世界 - 带渐变 */}
            <span className="ml-4 gradient-text inline-block">
              {'记录世界'.split('').map((char, i) => (
                <motion.span
                  key={`char2-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.span>

          {/* 发光粒子效果 */}
          {isHovered && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </>
          )}
        </h1>

        {/* 装饰线条 */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ width: '150px' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ width: '150px' }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>

        {/* 副标题 - 打字机效果 */}
        <TypewriterText />
      </motion.div>
    </motion.div>
  )
}

// 打字机效果组件
function TypewriterText() {
  const text = '每一次快门，都是与这个世界的对话。从城市的喧嚣到自然的静谧，我用镜头捕捉那些转瞬即逝的美好瞬间。'
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <motion.p
      className="text-lg md:text-xl text-white max-w-2xl mx-auto"
      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
    >
      {displayedText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-white ml-1 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.p>
  )
}
