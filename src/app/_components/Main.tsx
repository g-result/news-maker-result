'use client'
import { useState } from 'react'
import { ImageUploadSection } from './ImageUploadSection'
import { StepNavigation } from './StepNavigation'
import { StyleSection } from './StyleSection'
import { TypeColorSection } from './Type&ColorSection'
import { TextSection } from './TextSection'
import {
  STYLE_TYPE,
  STYLE_COLORS,
  TYPES,
  type StyleType,
  type ColorKeys,
  type TypeKeys
} from '@/const/styles'
import { SECTIONS, type SectionKeys } from '@/const/key'
import { ExportSection } from './ExportSection'
import type { TextData } from '~/@types/textData'

export const Main = () => {
  const [section, setSection] = useState<SectionKeys>(SECTIONS[0])
  const [createdImage, setCreatedImage] = useState<string | undefined>(
    undefined
  )
  const [selectedStyle, setSelectedStyle] = useState<StyleType>(STYLE_TYPE[0])
  const [selectedColor, setSelectedColor] = useState<ColorKeys>(STYLE_COLORS[0])
  const [selectedType, setSelectedType] = useState<TypeKeys>(TYPES.A)
  const [textData, setTextData] = useState<TextData>({})
  const [active, setActive] = useState(SECTIONS.indexOf(section))

  const handleImageCreate = (img: string) => {
    setCreatedImage(img)
    setSection(SECTIONS[1])
    setActive(SECTIONS.indexOf('style'))
  }

  const handleSectionChange = (nextSection: SectionKeys) => {
    setSection(nextSection)
    setActive(SECTIONS.indexOf(nextSection))
    window.scrollTo(0, 0)
  }

  return (
    <>
      <StepNavigation active={active} />
      {section === SECTIONS[0] && (
        <>
          <ImageUploadSection onImageCreate={handleImageCreate} />
        </>
      )}
      {section === SECTIONS[1] && createdImage && (
        <StyleSection
          image={createdImage}
          onStyleSelect={setSelectedStyle}
          onNext={() => handleSectionChange(SECTIONS[2])}
          onBack={() => handleSectionChange(SECTIONS[0])}
        />
      )}
      {section === SECTIONS[2] && createdImage && selectedStyle && (
        <TypeColorSection
          selectedStyle={selectedStyle}
          onTypeSelect={setSelectedType}
          onColorSelect={setSelectedColor}
          image={createdImage}
          onNext={() => handleSectionChange(SECTIONS[3])}
          onBack={() => handleSectionChange(SECTIONS[1])}
        />
      )}
      {section === SECTIONS[3] && createdImage && selectedStyle && (
        <TextSection
          image={createdImage}
          selectedStyle={selectedStyle}
          color={selectedColor}
          type={selectedType}
          onTextChange={setTextData}
          onNext={() => handleSectionChange(SECTIONS[4])}
          onBack={() => handleSectionChange(SECTIONS[2])}
        />
      )}
      {section === SECTIONS[4] && createdImage && selectedStyle && (
        <ExportSection
          image={createdImage}
          selectedStyle={selectedStyle}
          color={selectedColor}
          type={selectedType}
          text={textData}
          onBack={() => handleSectionChange(SECTIONS[3])}
        />
      )}
    </>
  )
}
