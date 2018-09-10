// @flow

import * as React from 'react'
import { Component } from 'react'
import styled from 'react-emotion'
import { categories } from '../models/Category'
import { LinkTo } from './Router'
import { LinkToCategory } from './Links'

type Props = {}

export class Sidebar extends Component<Props> {
  render() {
    return (
      <ItemsLayout>
        {categories.map(category => (
          <Item key={category}>
            <LinkToCategory category={category} />
          </Item>
        ))}
        <hr />
        <Item>
          <LinkTo to={'/Tags'}>Tags</LinkTo>
        </Item>
        <hr />
        <Item>
          <LinkTo to={'/All'}>All</LinkTo>
        </Item>
        <Item>
          <LinkTo to={'/Done'}>Done</LinkTo>
        </Item>
      </ItemsLayout>
    )
  }
}

const Item = styled.div`
  text-transform: uppercase;
`
const ItemsLayout = styled.div`
  > * {
    margin: 0.5rem 1.5rem;
  }
`
