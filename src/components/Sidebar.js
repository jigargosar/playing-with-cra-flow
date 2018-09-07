// @flow

import * as React from 'react'
import { Component, Fragment } from 'react'
import { Divider, Heading, styled } from 'reakit'
import { categories } from '../models/Category'
import { RouterLink } from './RouterLink'

type Props = {}

export class Sidebar extends Component<Props> {
  render() {
    return (
      <Fragment>
        <Title as={'h3'}>Categories</Title>
        <ItemsLayout>
          {categories.map(category => (
            <Item key={category}>
              <RouterLink to={category}>{category}</RouterLink>
            </Item>
          ))}
          <Divider margin={'1rem'} />
          <Item>
            <RouterLink to={'/Tags'}>Tags</RouterLink>
          </Item>

          <Divider margin={'1rem'} />
          <Item>
            <RouterLink to={'/All'}>All</RouterLink>
          </Item>
          <Item>
            <RouterLink to={'/Done'}>Done</RouterLink>
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
