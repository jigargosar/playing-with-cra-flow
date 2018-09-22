import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'
import { style } from 'typestyle'
import { padding } from 'csstips'
import { bg } from '../styles'
import { gray } from '../colors'
import { mapIndexed } from '../ramda-exports'
import VBox from '../components/VBox'
import { hsla } from 'csx'

const borderColor = `${hsla(80, 0.6, 0.6, 0.8).toString()}`

const DemoBlock = props => (
  <div
    className={style(padding('1rem'), bg(borderColor), {
      // border: `3px solid ${borderColor}`,
    })}
    {...props}
  />
)

const demoContent = mapIndexed(
  (text, idx) => <DemoBlock key={idx}>{text}</DemoBlock>,
  ['foo', 'bar'],
)

const DemoContainer = props => (
  <div className={style(bg(gray(0.1)))} {...props} />
)

storiesOf('HBox', module)
  //
  .add('without spacing', () => (
    <DemoContainer>
      <HBox>{demoContent}</HBox>
    </DemoContainer>
  ))
  .add('with spacing', () => (
    <DemoContainer>
      <HBox spacing={1}>{demoContent}</HBox>
    </DemoContainer>
  ))

storiesOf('VBox', module)
  //
  .add('without spacing', () => (
    <DemoContainer>
      <VBox>{demoContent}</VBox>
    </DemoContainer>
  ))
  .add('with spacing', () => (
    <DemoContainer>
      <VBox spacing={1}>{demoContent}</VBox>
    </DemoContainer>
  ))
