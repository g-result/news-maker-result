import { useEffect, useState } from 'react'
import { Box, Radio, Stack, Text, Grid } from '@mantine/core'
import { NavigationButtons } from './NavigationButtons'
import { type StyleType, STYLE_TYPE, STYLES } from '@/const/styles'
import { PreviewImage } from './PreviewImage'

type StyleSectionProps = {
  image: string
  onNext: () => void
  onBack: () => void
  onStyleSelect: (style: StyleType) => void
}

export const StyleSection = ({
  image,
  onNext,
  onBack,
  onStyleSelect
}: StyleSectionProps) => {
  const [style, setStyle] = useState<StyleType>(STYLE_TYPE[0])

  useEffect(() => {
    onStyleSelect(style)
  }, [style, onStyleSelect])

  return (
    <Stack align="center" gap="40" w="100%" maw={540}>
      <PreviewImage image={image} style={style} />
      <Box>
        <Text size="md" mb="sm" c="gray.8">
          スタイル選択
        </Text>
        <Radio.Group
          value={style}
          onChange={(value) => {
            setStyle(value as keyof typeof STYLES)
            onStyleSelect(value as keyof typeof STYLES)
          }}
        >
          <Grid gutter="xl">
            {STYLE_TYPE.map((style) => (
              <Grid.Col span={4} key={style}>
                <Radio
                  value={style}
                  label={STYLES[style].label}
                  styles={{ label: { fontSize: '16px', fontWeight: '700' } }}
                  c="gray.8"
                  mb={6}
                />
                <PreviewImage image={image} style={style} isSample={true} />
              </Grid.Col>
            ))}
          </Grid>
        </Radio.Group>
      </Box>
      <Text c="gray.6" size="sm" fw="bold">
        見出しの枠などのカラーは、次の画面での選択になります。
      </Text>
      <NavigationButtons onNext={onNext} onBack={onBack} />
    </Stack>
  )
}
