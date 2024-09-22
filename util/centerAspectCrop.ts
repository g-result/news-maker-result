import { centerCrop, makeAspectCrop } from 'react-image-crop'

// 画像のアスペクト比を保ちながら中央にクロップするユーティリティ関数
export const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}
