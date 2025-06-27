import { motion } from 'framer-motion'

const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 80,
  once = true, // 默认只执行一次动画
  threshold = 0.1, // 新增支持传入触发阈值，默认0.1
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      viewport={{ once, amount: threshold }} // 使用传入的threshold值
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
