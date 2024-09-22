import { domToPng } from 'modern-screenshot'

export const onClickExport = async (
  targetRef: HTMLDivElement | null,
  fileName: string
): Promise<boolean> => {
  if (!targetRef) {
    console.error('Target ref is null')
    return false
  }
  try {
    const dataUrl = await domToPng(targetRef, {
      quality: 1.0, // 最高品質
      scale: 4 // 画質向上のためのスケール
    })
    const img = new Image()
    img.src = dataUrl
    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 1920
        canvas.height = 1080
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              saveAsImage(url, fileName)
              URL.revokeObjectURL(url)
              console.log('Export successful')
              resolve(true)
            } else {
              console.error('Failed to create blob')
              resolve(false)
            }
          }, 'image/png')
        } else {
          console.error('Failed to get canvas context')
          resolve(false)
        }
      }
      img.onerror = (error) => {
        console.error('Image load error:', error)
        resolve(false)
      }
    })
  } catch (error) {
    console.error('Error during export:', error)
    return false
  }
}

const saveAsImage = (uri: string, fileName: string) => {
  const downloadLink = document.createElement('a')

  if (typeof downloadLink.download === 'string') {
    downloadLink.href = uri
    // ファイル名
    downloadLink.download = `${fileName}.png`
    // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    document.body.appendChild(downloadLink)
    // ダウンロードリンクが設定された a タグをクリック
    downloadLink.click()
    // Firefox 対策で追加したリンクを削除しておく
    document.body.removeChild(downloadLink)
  } else {
    window.open(uri, '_blank')
  }
}
