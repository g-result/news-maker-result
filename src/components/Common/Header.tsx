import type { FC } from 'react'
import { Box, Group, Image } from '@mantine/core'

export const Header: FC = async () => {
  return (
    <>
      <Box w="90%" m="auto" maw="1280" py="23">
        <Group>
          <a href={'/'}>
            <Image src="header_logo.svg" w={234} h="auto" alt="NEWS MAKER" />
          </a>
        </Group>
      </Box>
    </>
  )
}
