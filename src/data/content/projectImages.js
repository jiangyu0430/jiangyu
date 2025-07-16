// 腾讯云 COS 各项目图片基础访问路径（请替换为你的真实桶名和区域）
export const COS_BASE_URLS = {
  designSystem:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/design_system/',
  networkRevision:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/network_revision/',
  tabbarMotion:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/motion/',
  visualRedesign:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/visual_redesign/',
}

// designSystem 项目的图片文件名列表
export const designSystemImages = [
  'part2-01',
  'part2-02',
  'part2-03',
  'part2-04',
  'part2-05',
  'part2-06',
  'part2-07',
  'part2-08',
  'part2-09',
  'part2-10',
  'part2-11',
  'part2-12',
  'part2-13',
  'part2-14',
  'part2-15',
  'part2-16',
  // 依次添加所有图片文件名
]

// networkRevision 项目的图片文件名列表
export const networkRevisionImages = [
  //'part1-01',
  //'part1-02',
  //'part1-03',
  //'part1-04',
  //'part1-05',
  //'part1-06',
  //'part1-07',
  'part1-08',
  //'part1-09',
  //'part1-10',
  //'part1-11',
  //'part1-12',
  //'part1-13',
  //'part1-14',
  //'part1-15',
  //'part1-16',
  //'part1-17',
  //'part1-18',
  // 继续添加图片文件名
]

// visualRedesign 项目的图片文件名列表
export const visualRedesignImages = [
  'part3-1',
  // 继续添加图片文件名
]

// tabbarMotion 项目的图片文件名列表
export const tabbarMotionImages = [
  '1.gif',
  '2.gif',
  '3.gif',
  '4.gif',
  '5.gif',
  '6.gif',
  '7.gif',
  '8.gif',
  '9.gif',
  '10.gif',
  '11.gif',
  '12.gif',
  '13.gif',
  '14.gif',
  '15.gif',
  '16.gif',
  '17.gif',
  '18.gif',
  '19.gif',
  '20.gif',
  // 继续添加图片文件名
]

// 你可以继续为其他项目添加类似结构的数组和基础路径

export const PROJECT_IMAGE_MAP = {
  designSystem: {
    baseUrl: COS_BASE_URLS.designSystem,
    images: designSystemImages,
    spacing: 'mb-4',
  },
  networkRevision: {
    baseUrl: COS_BASE_URLS.networkRevision,
    images: networkRevisionImages,
    spacing: 'mb-4',
  },
  visualRedesign: {
    baseUrl: COS_BASE_URLS.visualRedesign,
    images: visualRedesignImages,
    spacing: 'mb-4',
  },
  'tabbar-motion': {
    baseUrl: COS_BASE_URLS.tabbarMotion,
    images: tabbarMotionImages,
    spacing: 'mb-6',
  },
}
