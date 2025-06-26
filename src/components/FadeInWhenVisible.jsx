import { motion } from 'framer-motion'

const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 80,
  once = true, // 默认只执行一次动画
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      viewport={{ once, amount: 0.1 }} // amount 触发阈值，元素进入10%可见时触发动画
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
