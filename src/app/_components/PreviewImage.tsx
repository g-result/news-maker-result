import { THEME_COLOR } from '@/const/color'
import { Box, Flex, Image, Text } from '@mantine/core'
import {
  type ColorKeys,
  STYLES,
  type TypeKeys,
  type StyleType,
  COLOR_CODES
} from '@/const/styles'
import type { TextData } from '~/@types/textData'

type PreviewImageProps = {
  image: string
  style?: StyleType
  color?: ColorKeys
  type?: TypeKeys
  text?: TextData
  isSample?: boolean
}

export const PreviewImage = ({
  image,
  style,
  color,
  type,
  text,
  isSample = false
}: PreviewImageProps) => {
  const styleData = style ? STYLES[style] : undefined
  let overlaySrc: string | undefined = styleData?.base

  if (styleData && type) {
    const typeData = styleData.types[type as TypeKeys]
    if (typeData) {
      overlaySrc = typeData.base
      if (color && typeData.colors[color as ColorKeys]) {
        overlaySrc = typeData.colors[color as ColorKeys]
      }
    }
  }

  return (
    <Box pos="relative" ff="Zen Kaku Gothic New">
      <Image src={image} alt="クロップされた画像" width="100%" />
      {overlaySrc && (
        <Image
          src={overlaySrc}
          alt="スタイル"
          width="100%"
          top="0"
          left="0"
          pos="absolute"
        />
      )}
      {style === 'comment' && (
        <>
          <Flex pos="absolute" right="3.5%" top="29.5%">
            <Box
              bg={THEME_COLOR.WHITE}
              py={isSample ? '3' : '10'}
              px={isSample ? '1' : '3'}
              w={isSample ? '8.97' : '29.25'}
            >
              <Text
                fz={isSample ? '4.5' : '15'}
                fw="900"
                c="black"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '-0.08em'
                }}
              >
                {text?.speakerName ?? '発言者の名前'}
              </Text>
            </Box>
            <Box
              bg={color || '#F01C24'}
              py={isSample ? '3' : '10'}
              w={isSample ? '4.65' : '15.5'}
            >
              <Text
                fz={isSample ? '3' : '10'}
                fw="900"
                c={text?.textColor}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  letterSpacing: '-0.08em'
                }}
              >
                {text?.role ?? '役職や属性'}
              </Text>
            </Box>
          </Flex>
          <Box
            pos="absolute"
            bottom="0"
            left="0"
            pt="2.6%"
            pb="4%"
            w="100%"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <Text
              c={THEME_COLOR.WHITE}
              ta="center"
              fz={isSample ? '10' : '27'}
              fw="900"
              lh={1}
            >
              “{text?.comment ?? '発言内容'}”
            </Text>
          </Box>
        </>
      )}
      {style === 'emphasis' && (
        <Box
          pos="absolute"
          bottom="3.8%"
          right="2.4%"
          px="3%"
          bg="rgba(255, 255, 255, 0.9)"
        >
          <Text fz={isSample ? '14' : '54'} fw="900" c="black">
            {text?.emphasisText ?? '強調文言'}
          </Text>
        </Box>
      )}
      {text && (
        <>
          {/* 熟語 */}
          <Text
            fz="22.5"
            fw="900"
            pos="absolute"
            top="4.1%"
            right="30.5%"
            c={text?.textColor}
          >
            {text.idiom}
          </Text>
          <Box pos="absolute" top="5.8%" left="72.3%">
            {/* 上の行 */}
            <Text fz="11" fw="900" c="black" style={{ lineHeight: 1.1 }}>
              {text.topLine}
            </Text>
            {/* 下の行 */}
            <Text fz="11" fw="900" c="black" style={{ lineHeight: 1.1 }}>
              {text.bottomLine}
            </Text>
          </Box>
          <Box pos="absolute" top="80%" left="4.5%">
            {/* 番組名上段（入力） */}
            <Text
              fz="17.5"
              fw="900"
              ta="center"
              c={text?.textColor}
              style={{ lineHeight: 1.1 }}
            >
              {text.programNameTop}
            </Text>
            {/* 番組名下段（選択） */}
            <Text
              fz="17.5"
              fw="900"
              ta="center"
              c={text?.textColor}
              style={{ lineHeight: 1.1 }}
            >
              {text.programNameBottom}
            </Text>
          </Box>
          {/* ニュースタイトル */}
          <Text
            fz="28.5"
            fw="900"
            pos="absolute"
            top="78.6%"
            left="21%"
            c="black"
          >
            {text.newsTitle}
          </Text>
          <Box pos="absolute" top="4%" left="2%">
            {/* 時刻 */}
            {text.time && (
              <Text
                fz="30"
                fw="900"
                c={THEME_COLOR.WHITE}
                mb="7"
                style={{ WebkitTextStroke: '1px black', lineHeight: 1 }}
              >
                {text.time}
              </Text>
            )}
            {/* LIVE */}
            {text.showLive && (
              <Text
                display="inline-block"
                c={THEME_COLOR.WHITE}
                fz="20"
                fw="900"
                bg={COLOR_CODES.RED}
                pt="2"
                pb="5"
                px=".4em"
                mb="7"
                style={{ lineHeight: 1 }}
              >
                LIVE
              </Text>
            )}
            {/* フェイク画像の注意書き */}
            {text.showWarning && (
              <Text
                fz="10"
                fw="900"
                bg="rgba(255,255,255,.7)"
                px=".4em"
                py=".1em"
                c="black"
              >
                これはフェイク画像です
              </Text>
            )}
          </Box>
          <Box pos="absolute" top="19%" right="2.5%">
            {/* 資料映像 */}
            {text.supplementText && (
              <Text
                fz="10"
                fw="900"
                bg="rgba(255,255,255,.7)"
                px=".4em"
                py=".1em"
                c="black"
              >
                {text.supplementText}
              </Text>
            )}
            {/* 撮影場所 */}
            {text.locationText && (
              <Text
                fz="10"
                fw="900"
                bg="rgba(255,255,255,.7)"
                px=".4em"
                py=".1em"
                c="black"
              >
                撮影場所：{text.locationText}
              </Text>
            )}
            {/* 映像提供 */}
            {text.providerText && (
              <Text
                fz="10"
                fw="900"
                bg="rgba(255,255,255,.7)"
                px=".4em"
                py=".1em"
                c="black"
              >
                映像提供：{text.providerText}
              </Text>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
