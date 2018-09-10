// @flow

import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { getAllTasks, getDoneTasks, getPendingCategoryTasks, getPendingTagTasks } from './models/Task'
import { TaskList } from './components/TaskList'
import { Sidebar } from './components/Sidebar'
import { Redirect } from '@reach/router'
import { TagList } from './components/TagList'
import { Route, Router } from './components/Router'
import { CollectionConsumer, CollectionProvider } from './components/CollectionContext'
import { findById } from './models/Collection'
import styled from 'react-emotion'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

function renderMainContent() {
  return (
    <CollectionConsumer>
      {({ tasks, tags }) => (
        <Router>
          <Redirect from={'/'} to={'All'} />
          <Route
            path={'All'}
            render={() => (
              <TaskList tasks={getAllTasks(tasks)} title={'All Tasks '} />
            )}
          />
          <Route
            path={'Done'}
            render={() => (
              <TaskList tasks={getDoneTasks(tasks)} title={'Done Tasks'} />
            )}
          />
          <TagList path={'Tags'} />
          <Route
            path={'/:category'}
            render={({ category }) => (
              <TaskList
                tasks={getPendingCategoryTasks(category, tasks)}
                title={`${category} Tasks`}
              />
            )}
          />
          <Route
            path={'/tag/:tagTitle/:tid'}
            render={({ tid }) => (
              <TaskList
                tasks={getPendingTagTasks(tid, tasks)}
                title={`#${findById(tid)(tags).title} Tasks`}
              />
            )}
          />
        </Router>
      )}
    </CollectionConsumer>
  )
}

const App = () => (
  <CollectionProvider>
    <AppContainer>
      <SideBarContainer>
        <Sidebar />
      </SideBarContainer>
      <Content>{renderMainContent()}</Content>
    </AppContainer>
    )
  </CollectionProvider>
)

export default App

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`
const SideBarContainer = styled.div`
  flex: none;
  overflow-y: scroll;
  width: 250px;
`

const Content = styled.div`
  overflow-y: scroll;
  flex: 1 1 auto;
`
