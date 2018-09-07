// @flow

import * as React from 'react'
import { Component, Fragment } from 'react'
import { styled } from 'reakit'
import { categories } from '../models/Category'
import { Link } from '@reach/router'
import cn from 'classnames'

type Props = {}

export class Sidebar extends Component<Props> {
  render() {
    return (
      <Fragment>
        <h2>Categories</h2>
        <CategoriesLayout>
          {categories.map(category => (
            <Category key={category}>
              <Link
                to={category}
                getProps={({ isCurrent, isPartiallyCurrent }) => ({
                  className: cn({
                    current: isCurrent,
                    partiallyCurrent: isPartiallyCurrent,
                  }),
                })}
              >
                {category}
              </Link>
            </Category>
          ))}
        </CategoriesLayout>
      </Fragment>
    )
  }
}

const Category = styled.div`
  text-transform: uppercase;
`
const CategoriesLayout = styled.div`
  > ${Category} {
    margin: 0.5rem 1rem;
  }
`
