import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'
import { style } from 'typestyle'
import { padding } from 'csstips'
import { map } from 'ramda'
import { bg } from '../styles'
import { gray } from '../colors'

const renderItem = text => (
  <div className={style(padding('1rem'), { border: '1px solid black' })}>
    {text}
  </div>
)

const demoContent = map(renderItem, ['foo', 'bar'])

storiesOf('HBox', module).add('basic', () => (
  <div className={style(bg(gray(0.1)))}>
    <HBox spacing={'1rem'}>{demoContent}</HBox>
  </div>
))
