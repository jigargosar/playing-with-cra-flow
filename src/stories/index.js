import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'
import { style } from 'typestyle'
import { padding } from 'csstips'
import { bg } from '../styles'
import { gray } from '../colors'
import { mapIndexed } from '../ramda-exports'
import { map } from 'ramda'
import { rem } from 'csx'

const spacing = map(rem)([0, 0.25, 0.5, 1, 2, 4])

const DemoBlock = props => (
  <div
    className={style(padding('1rem'), { border: '1px solid black' })}
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
      <HBox spacing={spacing[0]}>{demoContent}</HBox>
    </DemoContainer>
  ))
