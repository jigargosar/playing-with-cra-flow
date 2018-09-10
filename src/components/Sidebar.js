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
      <Layout>
        {categories.map(category => (
          <LinkToCategory key={category} category={category} />
        ))}
        <hr />
        <LinkTo to={'/Tags'}>Tags</LinkTo>
        <hr />
        <LinkTo to={'/All'}>All</LinkTo>
        <LinkTo to={'/Done'}>Done</LinkTo>
      </Layout>
    )
  }
}

const Layout = styled.div`
  margin-top: 1rem;
  > * {
    display: block;
    margin: 0.5rem 1.5rem;
    text-transform: uppercase;
  }
`
