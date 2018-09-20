import * as React from 'react'
import Component from '@reach/component-component'
import { generateTagList } from '../models/Tag'

const CollectionContext = React.createContext({ tasks: [], tags: [] })

export const CollectionConsumer = CollectionContext.Consumer

const Collections = ({ children }) => (
  <Component
    getInitialState={() => {
      // localStorage.removeItem('collections')
      const state = localStorage.getItem('collections')
      if (state) {
        return JSON.parse(state)
      } else {
        const tags = generateTagList()
        return { tags }
      }
    }}
    didUpdate={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
    didMount={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
  >
    {({ state }) => {
      return children({
        ...state,
      })
    }}
  </Component>
)

export const CollectionProvider = ({ children }) => (
  <Collections>
    {value => (
      <CollectionContext.Provider value={value}>
        {children}
      </CollectionContext.Provider>
    )}
  </Collections>
)
