import React from 'react'

import { storiesOf } from '@storybook/react'
import HBox from '../components/HBox'

storiesOf('HBox', module).add('basic', () => (
  <HBox spacing={'1rem'}>
    <div>foo</div>
    <div>bar</div>
  </HBox>
))
