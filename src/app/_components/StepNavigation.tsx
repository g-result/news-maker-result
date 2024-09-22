import { THEME_COLOR } from '@/const/color'
import { STEP_NAVIGATION } from '@/const/config'
import { Stepper, Text, useMantineTheme } from '@mantine/core'
import { useMediaQueries } from '@/hooks/useMediaQueries'

export const StepNavigation = ({ active }: { active: number }) => {
  const theme = useMantineTheme()
  const { isSmallScreen } = useMediaQueries()

  return (
    <Stepper
      active={active}
      allowNextStepsSelect={true}
      iconSize={25}
      color="cyan.6"
      mt="35"
      mb="40"
      styles={{
        separator: {
          backgroundImage: 'url(/chevron-right.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: '26px',
          width: '26px',
          backgroundColor: 'transparent',
          flex: '0 1 auto'
        }
      }}
    >
      {STEP_NAVIGATION.map((step, index) => (
        <Stepper.Step
          key={`${step[0]}-${step[1]}`}
          label={
            <Text
              size="sm"
              fw="bold"
              ta="center"
              c={active === index ? 'cyan.6' : THEME_COLOR.GRAY3}
            >
              {step[0]}
              <br />
              {step[1]}
            </Text>
          }
          styles={{
            stepIcon: {
              borderWidth: '1px',
              fontSize: 14,
              backgroundColor:
                active === index
                  ? theme.colors.cyan[6]
                  : index < active
                    ? 'rgba(33, 175, 191, 0.25)'
                    : THEME_COLOR.WHITE,
              color:
                active === index
                  ? THEME_COLOR.WHITE
                  : index < active
                    ? theme.colors.cyan[6]
                    : THEME_COLOR.GRAY3,
              borderColor:
                active === index
                  ? theme.colors.cyan[6]
                  : index < active
                    ? theme.colors.cyan[6]
                    : THEME_COLOR.GRAY3
            },
            stepCompletedIcon: {
              color: theme.colors.cyan[6]
            },
            step: {
              flexDirection: isSmallScreen ? 'column' : 'row'
            },
            stepBody: {
              ...(isSmallScreen && { marginLeft: '0' }),
              ...(isSmallScreen && { marginTop: '10px' })
            }
          }}
        />
      ))}
    </Stepper>
  )
}
