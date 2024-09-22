import {
  Box,
  Stack,
  Text,
  Checkbox,
  Select,
  Flex,
  Radio,
  useMantineTheme,
  Group,
  TextInput
} from '@mantine/core'
import { PreviewImage } from './PreviewImage'
import type { StyleType, ColorKeys, TypeKeys } from '@/const/styles'
import { NavigationButtons } from './NavigationButtons'
import { THEME_COLOR } from '@/const/color'
import { FAKE_OPTION_TYPE, IDIOM, NEWS_VARIANT } from '@/const/newsText'
import { useEffect, useState } from 'react'
import type { TextData } from '~/@types/textData'
import { useMediaQueries } from '@/hooks/useMediaQueries'

type TextSectionProps = {
  image: string
  selectedStyle: StyleType
  color: ColorKeys
  type: TypeKeys
  onTextChange: (texts: TextData) => void
  onNext: () => void
  onBack: () => void
}
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)

export const TextSection = ({
  image,
  selectedStyle,
  color,
  type,
  onTextChange,
  onNext,
  onBack
}: TextSectionProps) => {
  const theme = useMantineTheme()

  const [idiom, setIdiom] = useState<string | undefined>(undefined)
  const [topLine, setTopLine] = useState<string | undefined>(undefined)
  const [bottomLine, setBottomLine] = useState<string | undefined>(undefined)
  const [programNameTop, setProgramNameTop] = useState<string | undefined>(
    undefined
  )
  const [programNameBottom, setProgramNameBottom] = useState<
    string | undefined
  >(undefined)
  const [newsTitle, setNewsTitle] = useState<string | undefined>(undefined)
  const [textColor, setTextColor] = useState<string>('#000')
  const [showWarning, setShowWarning] = useState<boolean>(true)
  const [showTime, setShowTime] = useState<boolean>(false)
  const [hour, setHour] = useState<string>('00')
  const [minutes, setMinutes] = useState<string>('00')
  const [showLive, setShowLive] = useState<boolean>(false)
  const [supplementText, setSupplementText] = useState<string | undefined>(
    undefined
  )
  const [locationText, setLocationText] = useState<string | undefined>(
    undefined
  )
  const [providerText, setProviderText] = useState<string | undefined>(
    undefined
  )
  const [role, setRole] = useState<string | undefined>(undefined)
  const [speakerName, setSpeakerName] = useState<string | undefined>(undefined)
  const [comment, setComment] = useState<string | undefined>(undefined)
  const [emphasisText, setEmphasisText] = useState<string | undefined>(
    undefined
  )
  const textData: TextData = {
    idiom,
    topLine,
    bottomLine,
    programNameTop,
    programNameBottom,
    newsTitle,
    textColor,
    showWarning,
    time: showTime ? `${hour}:${minutes}` : undefined,
    showLive,
    supplementText,
    locationText,
    providerText,
    role,
    speakerName,
    comment,
    emphasisText
  }

  const { isSmallScreen } = useMediaQueries()

  // exportセクションに渡す
  useEffect(() => {
    onTextChange(textData)
  }, [
    idiom,
    topLine,
    bottomLine,
    programNameTop,
    programNameBottom,
    newsTitle,
    textColor,
    showWarning,
    showTime,
    hour,
    minutes,
    showLive,
    supplementText,
    locationText,
    providerText,
    role,
    speakerName,
    comment,
    emphasisText,
    onTextChange
  ])

  const LabelWithLimit = ({
    label,
    limit
  }: { label: string; limit: number }) => (
    <Flex align="center" gap="0">
      <Text fz="sm" fw="600">
        {label}
      </Text>
      <Text c="red" fz="xs">
        （{limit}文字まで）
      </Text>
    </Flex>
  )

  return (
    <Stack align="center" gap="40" w="100%">
      <Box maw={540}>
        <PreviewImage
          image={image}
          style={selectedStyle}
          color={color}
          type={type}
          text={textData}
        />
      </Box>
      <Flex
        gap="48"
        w="100%"
        maw={584}
        c={THEME_COLOR.DARK6}
        direction={isSmallScreen ? 'column' : 'row'}
      >
        <Box flex="1">
          <Text size="md" mb="xs" c="gray.8">
            テキスト
          </Text>
          <Stack
            p="sm"
            gap="12"
            style={{
              borderRadius: '8px',
              border: `1px solid ${theme.colors.gray[3]}`
            }}
          >
            <Radio.Group
              name="textColor"
              label="熟語と番組名の文字色"
              onChange={(value) => {
                setTextColor(value === 'white' ? '#fff' : '#000')
              }}
            >
              <Group>
                <Radio value="white" label="ホワイト" />
                <Radio value="black" label="ブラック" />
              </Group>
            </Radio.Group>
            <Select
              label="熟語"
              placeholder="選択してください"
              data={[{ value: '', label: '選択してください' }, ...IDIOM]}
              onChange={(value) => {
                setIdiom(value ?? undefined)
              }}
              styles={{
                input: {
                  fontSize: isIOS ? '24px' : '16px'
                }
              }}
            />
            <TextInput
              label={<LabelWithLimit label="上の行" limit={12} />}
              maxLength={12}
              onChange={(event) => {
                setTopLine(event.currentTarget.value)
              }}
              styles={{
                input: {
                  fontSize: isIOS ? '30px' : '16px'
                }
              }}
            />
            <TextInput
              label={<LabelWithLimit label="下の行" limit={12} />}
              maxLength={12}
              onChange={(event) => {
                setBottomLine(event.currentTarget.value)
              }}
              styles={{
                input: {
                  fontSize: isIOS ? '30px' : '16px'
                }
              }}
            />
            {selectedStyle === 'title' && (
              <>
                <TextInput
                  label={
                    <LabelWithLimit label="番組名上段（入力）" limit={4} />
                  }
                  description="※実在する報道番組・テレビ局名の使用は避けてください"
                  maxLength={4}
                  onChange={(event) => {
                    setProgramNameTop(event.currentTarget.value)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '30px' : '16px'
                    }
                  }}
                />
                <Select
                  label="番組名下段（選択）"
                  placeholder="選択してください"
                  data={[
                    { value: '', label: '選択してください' },
                    ...NEWS_VARIANT
                  ]}
                  onChange={(value) => {
                    setProgramNameBottom(value ?? undefined)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '24px' : '16px'
                    }
                  }}
                />
                <TextInput
                  label={<LabelWithLimit label="ニュースタイトル" limit={14} />}
                  maxLength={14}
                  onChange={(event) => {
                    setNewsTitle(event.currentTarget.value)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '30px' : '16px'
                    }
                  }}
                />
              </>
            )}
            {selectedStyle === 'comment' && (
              <>
                <TextInput
                  label={<LabelWithLimit label="役職や属性" limit={8} />}
                  value={role}
                  maxLength={8}
                  onChange={(event) => {
                    setRole(event.currentTarget.value)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '30px' : '16px'
                    }
                  }}
                />
                <TextInput
                  label={<LabelWithLimit label="発言者の名前" limit={8} />}
                  value={speakerName}
                  maxLength={8}
                  onChange={(event) => {
                    setSpeakerName(event.currentTarget.value)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '30px' : '16px'
                    }
                  }}
                />
                <TextInput
                  label={<LabelWithLimit label="発言内容" limit={16} />}
                  value={comment}
                  maxLength={16}
                  onChange={(event) => {
                    setComment(event.currentTarget.value)
                  }}
                  styles={{
                    input: {
                      fontSize: isIOS ? '30px' : '16px'
                    }
                  }}
                />
              </>
            )}
            {selectedStyle === 'emphasis' && (
              <TextInput
                label={<LabelWithLimit label="強調文言" limit={5} />}
                value={emphasisText}
                maxLength={5}
                onChange={(event) => {
                  setEmphasisText(event.currentTarget.value)
                }}
                styles={{
                  input: {
                    fontSize: isIOS ? '30px' : '16px'
                  }
                }}
              />
            )}
          </Stack>
        </Box>
        <Box flex="1">
          <Text size="md" mb="xs" c="gray.8">
            オプション
          </Text>
          <Stack
            p="sm"
            gap="12"
            style={{
              borderRadius: '8px',
              border: `1px solid ${theme.colors.gray[3]}`
            }}
          >
            <Checkbox.Group
              defaultValue={['warning']}
              onChange={(values) => {
                setShowWarning(values.includes('warning'))
                setShowTime(values.includes('time'))
                setShowLive(values.includes('live'))
              }}
            >
              <Group gap="12">
                <Checkbox value="time" label="時刻" />
                {showTime && (
                  <Flex gap="10" align="center">
                    <Select
                      value={hour}
                      onChange={(value) => {
                        setHour(value ?? '00')
                      }}
                      data={[...Array(24)].map((_, index) => {
                        const hour = index < 10 ? `0${index}` : `${index}`
                        return { value: hour, label: hour }
                      })}
                      styles={{
                        input: {
                          fontSize: isIOS ? '24px' : '16px'
                        }
                      }}
                    />
                    <Text>:</Text>
                    <Select
                      value={minutes}
                      onChange={(value) => {
                        setMinutes(value ?? '00')
                      }}
                      data={[...Array(60)].map((_, index) => {
                        const minutes = index < 10 ? `0${index}` : `${index}`
                        return { value: minutes, label: minutes }
                      })}
                      styles={{
                        input: {
                          fontSize: isIOS ? '24px' : '16px'
                        }
                      }}
                    />
                  </Flex>
                )}
                <Checkbox value="live" label="LIVE" />
                <Checkbox value="warning" label="フェイク画像の注意書き" />
              </Group>
            </Checkbox.Group>
            <Select
              label="補足"
              placeholder="選択してください"
              data={[
                { value: '', label: '選択してください' },
                ...FAKE_OPTION_TYPE
              ]}
              onChange={(value) => {
                setSupplementText(value === '資料映像' ? '資料映像' : undefined)
                setLocationText(value === '撮影場所' ? '●●●' : undefined)
                setProviderText(value === '映像提供' ? '●●●' : undefined)
              }}
              styles={{
                input: {
                  fontSize: isIOS ? '24px' : '16px'
                }
              }}
            />
            {(locationText !== undefined || providerText !== undefined) && (
              <TextInput
                label={<LabelWithLimit label="テキスト" limit={8} />}
                maxLength={8}
                onChange={(event) => {
                  if (locationText !== undefined) {
                    setLocationText(event.currentTarget.value)
                  } else if (providerText !== undefined) {
                    setProviderText(event.currentTarget.value)
                  }
                }}
                styles={{
                  input: {
                    fontSize: isIOS ? '30px' : '16px'
                  }
                }}
              />
            )}
          </Stack>
        </Box>
      </Flex>
      <NavigationButtons onNext={onNext} onBack={onBack} nextLabel="画像生成" />
    </Stack>
  )
}
