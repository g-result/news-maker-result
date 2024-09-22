'use client'
import type { FC } from 'react'
import { Anchor, Box, Group, Image, Text } from '@mantine/core'
import { THEME_COLOR } from '@/const/color'
import { FOOTER_LINKS } from '@/const/config'
import { TermsModal } from '@/app/_components/TermsModal'
import { useDisclosure } from '@mantine/hooks'

export const Footer: FC = () => {
  const [termsModalOpened, { open: termsModalOpen, close: termsModalClose }] =
    useDisclosure(false)

  return (
    <>
      <Box bg={THEME_COLOR.MAIN} h="200" py="32">
        <Box w="90%" m="auto" maw="1280">
          <Group
            justify="space-between"
            pb="24"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <Group gap="21">
              {FOOTER_LINKS.map((link) => (
                <Anchor
                  key={link.text}
                  component={link.text === '利用規約' ? 'button' : 'a'}
                  onClick={
                    link.text === '利用規約' ? termsModalOpen : undefined
                  }
                  href={link.text === '利用規約' ? undefined : link.href}
                  target={link.target}
                  rel={link.rel}
                  fz="xs"
                  c={THEME_COLOR.WHITE}
                  underline="never"
                >
                  {link.text}
                </Anchor>
              ))}
            </Group>
            <Group>
              <a href={'/'}>
                <Image src="twitter.svg" w={18} h="auto" alt="twitter" />
              </a>
              <Group gap="0" c={THEME_COLOR.WHITE} fz="xs">
                問い合わせ先：
                <Anchor
                  href="mailto: info@newsmaker.jp"
                  underline="hover"
                  fz="xs"
                  c={THEME_COLOR.WHITE}
                >
                  info@newsmaker.jp
                </Anchor>
              </Group>
            </Group>
          </Group>
          <Group pt="15">
            <Text c={THEME_COLOR.WHITE} fz="xs">
              &copy; 2024 NEWS MAKER. All rights reserved.
            </Text>
          </Group>
        </Box>
      </Box>
      <TermsModal opened={termsModalOpened} onClose={termsModalClose} />
    </>
  )
}
