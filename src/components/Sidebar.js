// @flow

import * as React from 'react'
import { Component, Fragment } from 'react'
import { Divider, Heading, styled } from 'reakit'
import { categories } from '../models/Category'
import { LinkTo } from './Router'

type Props = {}

export class Sidebar extends Component<Props> {
  render() {
    return (
      <Fragment>
        <Title as={'h3'}>Categories</Title>
        <ItemsLayout>
          {categories.map(category => (
            <Item key={category}>
              <LinkTo to={category}>{category}</LinkTo>
            </Item>
          ))}
          <Divider margin={'1rem'} />
          <Item>
            <LinkTo to={'/Tags'}>Tags</LinkTo>
          </Item>

          <Divider margin={'1rem'} />
          <Item>
            <LinkTo to={'/All'}>All</LinkTo>
          </Item>
          <Item>
            <LinkTo to={'/Done'}>Done</LinkTo>
          </Item>
        </ItemsLayout>
      </Fragment>
    )
  }
}

const Title = styled(Heading)`
  margin: 1rem;
`
const Item = styled.div`
  text-transform: uppercase;
`
const ItemsLayout = styled.div`
  > ${Item} {
    margin: 0.5rem 1.5rem;
  }
`
