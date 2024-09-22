import type { PixelCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'

let previewUrl = ''

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

// クロップされた画像のプレビューを生成するユーティリティ関数
export const imgPreview = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1
) => {
  const canvas = document.createElement('canvas')
  await canvasPreview(image, canvas, crop, scale)

  const blob = await toBlob(canvas)

  if (!blob) {
    console.error('Failed to create blob')
    return ''
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  previewUrl = URL.createObjectURL(blob)
  return previewUrl
}
