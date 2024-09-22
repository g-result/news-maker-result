import { Button } from '@mantine/core'

type SquareButtonProps = {
  w: string | number
  onClick?: () => void
  label: string
  disabled?: boolean
}

/**
 * SquareButtonコンポーネント
 *
 * プロパティ:
 * 1. w: ボタンの幅 (string | number)
 * 2. onClick: クリック時の関数 (function, 任意)
 * 3. label: ボタンの文言 (string)
 * 4. disabled: ボタンの無効化 (boolean, 任意)
 */
export const SquareButton = ({
  w,
  onClick = () => {},
  label,
  disabled = false
}: SquareButtonProps) => {
  return (
    <Button
      color="cyan.6"
      w={w}
      h="64"
      radius="md"
      fz="24px"
      fw="bold"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}
