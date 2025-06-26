// src/data/notes.js
import image1 from '../assets/image/notes/image1.jpg'
import image2 from '../assets/image/notes/image2.jpg'
import image3 from '../assets/image/notes/image3.jpg'
import image4 from '../assets/image/notes/image4.jpg'
import image5 from '../assets/image/notes/image5.jpg'
import image6 from '../assets/image/notes/image6.jpg'
import image7 from '../assets/image/notes/image7.jpg'
import image8 from '../assets/image/notes/image8.jpg'
import image9 from '../assets/image/notes/image9.jpg'
import image10 from '../assets/image/notes/image10.jpg'
import image11 from '../assets/image/notes/image11.jpg'
import image12 from '../assets/image/notes/image12.jpg'
import image13 from '../assets/image/notes/image13.jpg'
import image14 from '../assets/image/notes/image14.jpg'
import image15 from '../assets/image/notes/image15.jpg'
import image16 from '../assets/image/notes/image16.jpg'
import image17 from '../assets/image/notes/image17.jpg'

export const notesImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
]

export const notesItems = notesImages.map((img, i) => ({
  image: img,
  text: `Note ${i + 1}`,
}))
