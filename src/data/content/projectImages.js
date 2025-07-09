// 腾讯云 COS 各项目图片基础访问路径（请替换为你的真实桶名和区域）
export const COS_BASE_URLS = {
  designSystem:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/design_system/',
  networkRevision:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/network_revision/',
  tabbarMotion:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/motion/',
  // 按需继续添加其他项目的基础路径
}

// designSystem 项目的图片文件名列表
export const designSystemImages = [
  'part2-01',
  'part2-02',
  'part2-03',
  // 依次添加所有图片文件名
]

// networkRevision 项目的图片文件名列表
export const networkRevisionImages = [
  'part1-01',
  'part1-02',
  'part1-03',
  // 继续添加图片文件名
]

// tabbarMotion 项目的图片文件名列表
export const tabbarMotionImages = [
  '1.gif',
  'OriginalVideo.mp4',
  // 继续添加图片文件名
]

// 你可以继续为其他项目添加类似结构的数组和基础路径

export const PROJECT_IMAGE_MAP = {
  1: {
    baseUrl: COS_BASE_URLS.designSystem,
    images: designSystemImages,
  },
  'brand-website': {
    baseUrl: COS_BASE_URLS.networkRevision,
    images: networkRevisionImages,
  },
  'tabbar-motion': {
    baseUrl: COS_BASE_URLS.tabbarMotion,
    images: tabbarMotionImages,
  },
}
