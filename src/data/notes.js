// src/data/notes.js

const BASE_URL =
  'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/'

// 手动维护文件名数组，支持任意命名和后缀
const fileNames = [
  'image01',
  'image02',
  'image03',
  'image04',
  'image05',
  'image06',
  'image07',
  'image08',
  'image09',
  'image10',
  'image11',
  'image12',
  'image13',
  'image14',
  'image15',
  'image16',
  'image17',
  'image18',
  'image19',
  'image20',
  'image21',
  'image22',
  'image23',
  'image24',
  'image25',
  'image26',
  'image27',
  'image28',
  'image29',
  'image30',
  'OriginalVideo.mp4',
]

// 生成完整的文件链接数组
export const notesImages = fileNames.map((name) =>
  name.endsWith('.mp4') ? `${BASE_URL}${name}` : `${BASE_URL}${name}.jpg`
)

// 可选：生成带文本的数组（你之前用到的）
export const notesItems = notesImages.map((img, i) => ({
  image: img,
  text: `Note ${i + 1}`,
}))
