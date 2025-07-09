// src/data/notes.js

const BASE_URL =
  'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/'

// 手动维护文件名数组，支持任意命名和后缀
const fileNames = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
  'image10.jpg',
  'image11.jpg',
  'image12.jpg',
  'image13.jpg',
  'image14.jpg',
  'image15.jpg',
  'image16.jpg',
  'image17.jpg',
  'image18.jpg',
  'image19.jpg',
  'image20.jpg',
  'OriginalVideo.mp4',
]

// 生成完整的文件链接数组
export const notesImages = fileNames.map((name) => `${BASE_URL}${name}`)

// 可选：生成带文本的数组（你之前用到的）
export const notesItems = notesImages.map((img, i) => ({
  image: img,
  text: `Note ${i + 1}`,
}))
