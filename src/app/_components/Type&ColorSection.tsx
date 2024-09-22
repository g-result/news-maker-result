import { useState } from 'react'
import { Box, Stack, Text, Radio, Grid, Flex } from '@mantine/core'
import { NavigationButtons } from './NavigationButtons'
import {
  type ColorKeys,
  STYLES,
  type TypeKeys,
  STYLE_COLORS,
  TYPES
} from '@/const/styles'
import { PreviewImage } from './PreviewImage'

type TypeColorSectionProps = {
  image: string
  onNext: () => void
  onBack: () => void
  selectedStyle: keyof typeof STYLES | undefined
  onTypeSelect: (type: TypeKeys) => void
  onColorSelect: (color: ColorKeys) => void
}

export const TypeColorSection = ({
  image,
  onNext,
  onBack,
  selectedStyle,
  onTypeSelect,
  onColorSelect
}: TypeColorSectionProps) => {
  const [type, setType] = useState<TypeKeys>(TYPES.A)
  const [color, setColor] = useState<ColorKeys>(STYLE_COLORS[0])

  if (!selectedStyle || !type || !color) {
    return undefined
  }

  return (
    <>
      <Flex gap="40" mb="40">
        <Stack align="center" gap="40" w="100%" maw={540}>
          <PreviewImage
            image={image}
            style={selectedStyle}
            type={type}
            color={color}
          />
          <Box>
            <Text size="md" mb="sm" c="gray.8">
              タイプ選択
            </Text>
            <Radio.Group
              value={type}
              onChange={(value) => {
                setType(value as TypeKeys)
                onTypeSelect(value as TypeKeys)
              }}
            >
              <Grid gutter="xl">
                {Object.keys(STYLES[selectedStyle].types).map((key) => {
                  return (
                    <Grid.Col span={4} key={key}>
                      <Radio
                        value={key}
                        label={key}
                        styles={{
                          label: { fontSize: '16px', fontWeight: '700' }
                        }}
                        c="gray.8"
                        mb={6}
                      />
                      <PreviewImage
                        image={image}
                        style={selectedStyle}
                        type={key as TypeKeys}
                        color={color}
                        isSample={true}
                      />
                    </Grid.Col>
                  )
                })}
              </Grid>
            </Radio.Group>
          </Box>
        </Stack>
        <Stack flex="1" gap="0">
          <Text size="md" mb="sm" c="gray.8">
            カラー選択
          </Text>
          <Radio.Group
            value={color}
            onChange={(value) => {
              setColor(value as ColorKeys)
              onColorSelect(value as ColorKeys)
            }}
          >
            {Object.keys(STYLES[selectedStyle].types[type].colors).map(
              (key) => (
                <Radio
                  key={key}
                  value={key}
                  label={<Box w={64} h={32} bg={key} />}
                  mb="12"
                  styles={{
                    body: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}
                />
              )
            )}
          </Radio.Group>
        </Stack>
      </Flex>
      <NavigationButtons onNext={onNext} onBack={onBack} />
    </>
  )
}
