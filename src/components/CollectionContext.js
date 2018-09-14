import * as React from 'react'
import Component from '@reach/component-component'
import { generateTagList } from '../models/Tag'
import { generateTaskList, setSomeTaskTags } from '../models/Task'
import { update } from 'ramda'

const CollectionContext = React.createContext({ tasks: [], tags: [] })
export const CollectionConsumer = CollectionContext.Consumer

const findIndexById = (id, list) => list.findIndex(m => m.id === id)

const taskUpdater = (changes, task) => ({ tasks }) => {
  const idx = findIndexById(task.id, tasks)
  console.assert(idx !== -1)
  return { tasks: update(idx, { ...tasks[idx], ...changes }, tasks) }
}

const Collections = ({ children }) => (
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
    {({ state, setState }) => {
      return children({
        ...state,
        updateTask: (changes, task) => {
          setState(taskUpdater(changes, task))
        },
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
export const renderWithCollections = render => (
  <CollectionConsumer>{render}</CollectionConsumer>
)
