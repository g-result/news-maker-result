import { Box, Checkbox, Stack, Text } from '@mantine/core'
import { PreviewImage } from './PreviewImage'
import type { StyleType, ColorKeys, TypeKeys } from '@/const/styles'
import type { TextData } from '~/@types/textData'
import { useRef, useState } from 'react'
import { onClickExport } from '~/util/onClickExport'
import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '~/lib/firebase'
import { NavigationButtons } from './NavigationButtons'
import {
  NEXT_PUBLIC_FIREBASE_COLLECTION_ID,
  NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
} from '~/util/env'

type ExportSectionProps = {
  image: string
  selectedStyle: StyleType
  color: ColorKeys
  type: TypeKeys
  text?: TextData
  onBack: () => void
}

export const ExportSection = ({
  image,
  selectedStyle,
  color,
  type,
  text,
  onBack
}: ExportSectionProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const exportRef = useRef<HTMLDivElement | null>(null)

  const handleExportClick = async () => {
    const targetRef = exportRef.current
    if (targetRef) {
      try {
        const success = await onClickExport(targetRef, 'news_maker')
        if (success) {
          if (
            !NEXT_PUBLIC_FIREBASE_COLLECTION_ID ||
            !NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
          ) {
            console.error(
              'Firebase collection ID or document ID is not defined'
            )
            return
          }
          const docRef = doc(
            db,
            NEXT_PUBLIC_FIREBASE_COLLECTION_ID,
            NEXT_PUBLIC_FIREBASE_DOCUMENT_ID
          )
          await updateDoc(docRef, {
            count: increment(1)
          })
          console.log('Firestore updated successfully')
        } else {
          console.error('Export failed')
        }
      } catch (error) {
        console.error('Error updating Firestore:', error)
      }
    } else {
      console.error('Target ref is null')
    }
  }

  return (
    <Stack align="center" gap="40" w="100%" maw={540}>
      <Box ref={exportRef}>
        <PreviewImage
          image={image}
          style={selectedStyle}
          color={color}
          type={type}
          text={text}
        />
      </Box>
      <Text size="xs" c="gray.8">
        画像の拡散による誹謗中傷や名誉毀損は刑法によって罰せられる可能性があります。
        <br />
        ご利用の際はお気をつけください。
      </Text>
      <Checkbox
        label={
          <Text fz="sm" fw="700" c="gray.8">
            注意書きを承諾しました
            <br />
            (チェックするとダウンロード画面へ移動します)
          </Text>
        }
        size="sm"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
      />
      {/* <SquareButton
        w="296"
        onClick={handleExportClick}
        label="画像をエクスポート"
        disabled={!isChecked}
      /> */}
      <NavigationButtons
        onNext={handleExportClick}
        onBack={onBack}
        nextLabel="画像をエクスポート"
        nextDisabled={!isChecked}
      />
    </Stack>
  )
}
