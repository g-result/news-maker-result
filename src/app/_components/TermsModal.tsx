import { TERMS_CONTENT } from '@/const/content'
import { Box, Modal, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import type { FC } from 'react'
import React from 'react'

type TermsModalProps = {
  opened: boolean
  onClose: () => void
}

export const TermsModal: FC<TermsModalProps> = ({ opened, onClose }) => {
  const theme = useMantineTheme()
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="利用規約"
      size="768"
      styles={{
        title: {
          fontWeight: 'bold',
          fontSize: '20px'
        },
        close: {
          backgroundColor: theme.colors.cyan[6],
          color: 'white'
        },
        content: {
          padding: '20px'
        }
      }}
    >
      <Stack gap="20">
        {TERMS_CONTENT.map((item) => (
          <Box key={item.title}>
            <Title order={3} fz="14" mb=".5em">
              {item.title}
            </Title>
            <Text size="sm">{item.text}</Text>
          </Box>
        ))}
      </Stack>
    </Modal>
  )
}
