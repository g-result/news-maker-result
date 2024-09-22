import { Flex } from '@mantine/core'
import { ImageCounts } from './_components/ImageCounts'
import { Main } from './_components/Main'
import { FooterGuideText } from './_components/FooterGuideText'

export default function Home() {
  return (
    <Flex
      w="90%"
      m="auto"
      maw="675"
      pt="25"
      pb="80"
      direction={'column'}
      align={'center'}
    >
      <ImageCounts />
      <Main />
      <FooterGuideText />
    </Flex>
  )
}
