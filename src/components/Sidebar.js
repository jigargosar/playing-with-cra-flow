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
        <CategoriesLayout>
          {categories.map(category => (
            <Category key={category}>
              <RouterLink to={category}>{category}</RouterLink>
            </Category>
          ))}
          <Divider margin={'1rem'} />
          <Category>
            <RouterLink to={'/'}>All</RouterLink>
          </Category>
        </CategoriesLayout>
      </Fragment>
    )
  }
}

const Title = styled(Heading)`
  margin: 1rem;
`
const Category = styled.div`
  text-transform: uppercase;
`
const CategoriesLayout = styled.div`
  > ${Category} {
    margin: 0.5rem 1.5rem;
  }
`
