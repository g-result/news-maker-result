import { Box, Text, useMantineTheme, Stack, Image } from '@mantine/core'
import { centerAspectCrop } from '~/util/centerAspectCrop'
import { useDropzone } from 'react-dropzone'
import type { PixelCrop, Crop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { imgPreview } from '~/util/imgPreview'
import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Caution } from './Caution'
import { SquareButton } from '@/components/Common/SquareButton'

export const ImageUploadSection = ({
  onImageCreate
}: { onImageCreate: (img: string) => void }) => {
  const theme = useMantineTheme()
  const [imgSrc, setImgSrc] = useState<string>('')
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [croppedImg, setCroppedImg] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const aspect = 16 / 9

  // クロップエリアが変更されるたびに画像のプレビューを生成
  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      imgPreview(imgRef.current, completedCrop).then((result) => {
        setCroppedImg(result)
      })
    }
  }, [completedCrop])

  // デフォルトで画像の中央にクロップを設定
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspect))
  }

  // ドロップされた画像を1200px以下にリサイズして、ソースURLを設定
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const dataUrl = URL.createObjectURL(file)
    const img = document.createElement('img')
    img.src = dataUrl
    img.onload = () => {
      if (img.width > 1200) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const scaleFactor = 1200 / img.width
          canvas.width = 1200
          canvas.height = img.height * scaleFactor
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedDataUrl = URL.createObjectURL(blob)
              setImgSrc(resizedDataUrl)
            }
          }, 'image/jpeg')
        }
      } else {
        setImgSrc(dataUrl)
      }
    }
  }

  // 画像がドロップされたときに特定の処理を実行するためのフック
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  })

  const handleCreate = () => {
    if (croppedImg) {
      onImageCreate(croppedImg)
    }
  }

  return (
    <>
      <Box w="100%" maw={540}>
        {imgSrc ? (
          <>
            <Stack align="center" gap="40">
              <ReactCrop
                crop={crop}
                onChange={(_: Crop, percentCrop: Crop) => setCrop(percentCrop)}
                onComplete={(c: PixelCrop) => setCompletedCrop(c)}
                aspect={aspect}
                minWidth={160}
                minHeight={90}
                style={{ width: '100%' }}
              >
                <Image
                  ref={imgRef}
                  src={imgSrc}
                  alt="クリッピング画像"
                  onLoad={onImageLoad}
                  width="100%"
                  height="auto"
                  style={{ width: '100%' }}
                />
              </ReactCrop>
              <SquareButton
                w="248"
                onClick={handleCreate}
                label="この範囲で作成"
              />
            </Stack>
          </>
        ) : (
          <Box
            pt={40}
            pb={50}
            bg={theme.colors.cyan[0]}
            w="100%"
            style={{
              cursor: 'pointer',
              border: `1px  dashed ${theme.colors.cyan[6]}`
            }}
            {...getRootProps()}
          >
            <Stack align="center" gap="30">
              <Text fz="30" fw="bold" c="gray.6">
                画像をアップロードして
                <br />
                <span style={{ color: theme.colors.cyan[6] }}>News画像</span>
                を手軽に作成!
              </Text>
              <SquareButton w="200" label="画像を選択" />
              <Text size="md" fw="bold" c="gray.6">
                またはファイルをドラックアンドドロップしてください。
              </Text>
            </Stack>
            <input {...getInputProps()} />
          </Box>
        )}
      </Box>
      <Caution />
    </>
  )
}
