'use client'
import React, { useEffect } from 'react'
import { Anchor, Box, Flex, List, Stack, Text, Title } from '@mantine/core'
import { GUIDE_SECTIONS } from '@/const/content'
import { GoogleAd } from './GoogleAds'

export const FooterGuideText = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <Box mt="40" w="100%">
      {/* NM記事内広告①(フェイクニュースに関しての上に) */}
      <GoogleAd
        slot="3342794966"
        format="fluid"
        style={{ marginTop: '40px' }}
      />
      <Flex justify="center" mb="40">
        <Anchor
          href="#【フェイクニュースに関して】"
          underline="always"
          fz="18"
          c="cyan.6"
          ta="center"
        >
          フェイクニュースに関して
        </Anchor>
      </Flex>
      {/* NMディスプレイ広告①(使い方・注意事項の上に) */}
      <GoogleAd slot="4036929537" style={{ marginBottom: '40px' }} />
      <Title order={2} ta="center" fz="30" mb="1em" c="black">
        使い方・注意事項
      </Title>
      <Stack gap="28">
        {GUIDE_SECTIONS.map((section) => (
          <Box key={section.sectionTitle} id={section.sectionTitle}>
            <Title order={3} fz="20" c="gray.9" mb=".6em">
              {section.sectionTitle}
            </Title>
            <Stack gap="14">
              {section.guides.map((guide) => (
                <Box key={guide.title}>
                  <Title order={4} fz="18" fw="400" c="gray.9" mb=".3em">
                    {'\u25B6'}
                    {guide.title}
                  </Title>
                  {'content' in guide && (
                    <Text fz="18" c="gray.9">
                      {guide.content}
                    </Text>
                  )}
                  {'list' in guide && (
                    <List
                      size="sm"
                      display="flex"
                      style={{ flexDirection: 'column', gap: '.5em' }}
                    >
                      {guide.list.map((item, index) => (
                        <List.Item
                          key={
                            typeof item.text === 'string'
                              ? item.text
                              : `item-${index}`
                          }
                          fz="18"
                          c="gray.9"
                        >
                          {'href' in item ? (
                            <Anchor
                              href={item.href}
                              target="_blank"
                              underline="always"
                              fz="18"
                              c="cyan.6"
                            >
                              {item.text}
                            </Anchor>
                          ) : (
                            item.text
                          )}
                        </List.Item>
                      ))}
                    </List>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
      {/* NMディスプレイ広告②(一番下に) */}
      <GoogleAd slot="3889589876" style={{ marginTop: '40px' }} />
    </Box>
  )
}
