import { useMediaQuery } from '@mantine/hooks'

export const useMediaQueries = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  return { isSmallScreen }
}
