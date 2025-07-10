import { useState, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { BlogSnippet } from '../components/BlogSnippet'
import { motion } from 'framer-motion'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import ProjectDetail from './ProjectDetail'

import blogs from '../data/blogs'

import projects from '../data/projects'

export default function Projects() {
  const [activeType, setActiveType] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const allTypes = ['All', ...Array.from(new Set(projects.map((p) => p.type)))]

  // 右侧动画variants不变
  const containerVariants = {
    hiddenRight: { opacity: 0, x: 40 },
    visibleRight: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  function openModal(slug) {
    setSelectedProjectSlug(slug)
    setModalOpen(true)
  }

  function closeModal() {
    setSelectedProjectSlug(null)
    setModalOpen(false)
  }

  return (
    <div className="py-12 px-4 w-full max-w-[1280px] mx-auto text-left">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[72%] order-1 lg:order-1 space-y-14">
          <FadeInWhenVisible delay={0.1} once>
            <h2 className="text-5xl font-bold text-black dark:text-white mb-10">
              项目精选
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2} once>
            <div className="flex flex-wrap gap-3 justify-start mb-8">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type === 'All' ? null : type)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    activeType === type ||
                    (type === 'All' && activeType === null)
                      ? 'bg-neutral-900 font-medium border-white/60 text-white '
                      : 'border-zinc-300 text-zinc-600 hover:border-zinc-500 dark:border-neutral-600 dark:text-zinc-300 dark:hover:border-zinc-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FadeInWhenVisible>

          <div className="space-y-6">
            {projects
              .filter((p) => !activeType || p.type === activeType)
              .map((project, index) => (
                <FadeInWhenVisible
                  key={index}
                  delay={0.2}
                  once
                  threshold={0.02} // 这里设置阈值，0.01表示元素只要1%进入视口就触发动画
                >
                  <ProjectCard
                    slug={project.slug}
                    onClick={() => openModal(project.slug)}
                  />
                </FadeInWhenVisible>
              ))}
          </div>
        </div>

        <motion.aside
          className="w-full lg:w-[28%] order-2 lg:order-2"
          initial="hiddenRight"
          animate="visibleRight"
          variants={containerVariants}
        >
          <h3 className="text-xl font-semibold text-black dark:text-white mb-6">
            最近写下
          </h3>

          <div className="space-y-4">
            {blogs.map((blog, index) => (
              <Fragment key={blog.slug}>
                {index > 0 && (
                  <hr className="border-t border-zinc-200 dark:border-neutral-700" />
                )}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <BlogSnippet
                    slug={blog.slug}
                    onClick={() => openModal(blog.slug)}
                  />
                </motion.div>
              </Fragment>
            ))}
          </div>
        </motion.aside>
      </div>
      {modalOpen && selectedProjectSlug && (
        <ProjectDetail
          slug={selectedProjectSlug}
          fullscreen={false}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
