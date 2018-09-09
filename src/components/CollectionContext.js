import * as React from 'react'
import Component from '@reach/component-component'
import { generateTagList } from '../models/Tag'
import { generateTaskList, setSomeTaskTags } from '../models/Task'

const CollectionContext = React.createContext({ tasks: [], tags: [] })
export const CollectionProvider = ({ children }) => (
  <Component
    getInitialState={() => {
      // localStorage.removeItem('collections')
      const state = localStorage.getItem('collections')
      if (state) {
        return JSON.parse(state)
      } else {
        const tags = generateTagList()
        const tasks = generateTaskList().map(setSomeTaskTags(tags))
        return { tasks, tags }
      }
    }}
    didUpdate={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
    didMount={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
  >
    {({ state: { tasks, tags } }) => {
      return (
        <CollectionContext.Provider value={{ tasks, tags }}>
          {children}
        </CollectionContext.Provider>
      )
    }}
  </Component>
)

export const CollectionConsumer = CollectionContext.Consumer
