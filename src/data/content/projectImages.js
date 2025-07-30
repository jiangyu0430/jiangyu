import { data } from 'autoprefixer'

export const PROJECTS = [
  {
    key: 'designSystem',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'networkRevision',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'visualRedesign',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'tabbar-motion',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'page-motion',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'dataVisualization',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'arcoDesign',
    images: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/c9ab39227581281.6842805b5bfa0.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/625e91227581281.6842805b5b206.png',
      'https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/9bd9b2227581281.6842805b5c51a.png',
    ],
    spacing: 'mb-4',
  },
]

// 你可以继续为其他项目添加类似结构的数组和基础路径

export const PROJECT_IMAGE_MAP = PROJECTS.reduce((map, project) => {
  map[project.key] = {
    images: project.images,
    spacing: project.spacing || '',
  }
  return map
}, {})
