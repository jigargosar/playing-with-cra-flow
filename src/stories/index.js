import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'
import { cssRaw, style } from 'typestyle'
import { margin, padding } from 'csstips'
import { bg } from '../styles'
import { blackA } from '../colors'
import { mapIndexed } from '../ramda-exports'
import VBox from '../components/VBox'
import { hsla } from 'csx'

const demoDataList = ['foo', 'bar', 'bag', 'bong']

const DemoBlock = props => {
  const color = `${hsla(
    Math.floor((255 / demoDataList.length) * props.idx),
    0.7,
    0.7,
    1,
  ).toString()}`
  return (
    <div
      className={style(padding('1rem'), bg(color), {
        // border: `3px solid ${color}`,
      })}
      {...props}
    />
  )
}

cssRaw`
  html, body, #root{
    height:100%;
  }
`

const demoContent = mapIndexed(
  (text, idx) => (
    <DemoBlock idx={idx} key={idx}>
      {text}
    </DemoBlock>
  ),
  demoDataList,
)

const DemoContainer = props => (
  <div
    className={style(margin('auto'), { width: '80vw' }, bg(blackA(0.3)))}
    {...props}
  />
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
