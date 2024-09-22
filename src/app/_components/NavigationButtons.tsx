import { Button, Group } from '@mantine/core'

type NavigationButtonsProps = {
  onNext: () => void
  onBack: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

export const NavigationButtons = ({
  onNext,
  onBack,
  nextLabel = '完了',
  nextDisabled = false
}: NavigationButtonsProps) => (
  <Group mt="md">
    <Button
      color="gray.6"
      px="60"
      h="64"
      radius="md"
      fz="24px"
      fw="bold"
      onClick={onBack}
    >
      戻る
    </Button>
    <Button
      color="cyan.6"
      px="60"
      h="64"
      radius="md"
      fz="24px"
      fw="bold"
      onClick={onNext}
      disabled={nextDisabled}
    >
      {nextLabel}
    </Button>
  </Group>
)
