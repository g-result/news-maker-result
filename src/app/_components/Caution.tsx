'use client'
import { Text } from '@mantine/core'
import { CAUTION } from '@/const/content'

export const Caution = () => {
  return (
    <>
      {CAUTION.map(({ text, order }) => (
        <Text
          key={order}
          size="xs"
          ta="center"
          c="gray.8"
          mt={order === 1 ? 40 : 0}
        >
          {text}
        </Text>
      ))}
    </>
  )
}
