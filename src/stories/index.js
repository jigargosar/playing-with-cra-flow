import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'
import { style } from 'typestyle'
import { padding } from 'csstips'
import { bg } from '../styles'
import { gray } from '../colors'
import { mapIndexed } from '../ramda-exports'

const Block = props => (
  <div
    className={style(padding('1rem'), { border: '1px solid black' })}
    {...props}
  />
)

const demoContent = mapIndexed((text, idx) => <Block key={idx}>{text}</Block>, [
  'foo',
  'bar',
])

const DemoContainer = props => (
  <div className={style(bg(gray(0.1)))} {...props} />
)

storiesOf('HBox', module)
  //
  .add('without spacing', () => (
    <div>
      <DemoContainer>
        <HBox>{demoContent}</HBox>
      </DemoContainer>
    </div>
  ))
  .add('with spacing', () => (
    <div className={style(bg(gray(0.1)))}>
      <HBox spacing={'1rem'}>{demoContent}</HBox>
    </div>
  ))
