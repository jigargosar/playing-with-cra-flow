import * as React from 'react'
import { activePred, donePred } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { TagList } from './components/TagList'
import { Router } from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
} from './components/CollectionContext'
import { center, flex, padding, scroll, someChildWillScroll } from 'csstips/'
import { rem } from 'csx/lib'
import { findById } from './folktale-helpers'
import { absolute, bg, fg, relative, sizeViewport100 } from './styles'
import { Redirect } from '@reach/router'
import { nest } from 'recompose'
import { TaskList } from './components/TaskList'
import { ErrorMessage } from './components/ErrorMessage'
import { gray, white } from './colors'
import { allPass, T } from 'ramda'
import { FocusTrap, FocusTrapStackProvider } from './components/FocusTrap'
import { EditTaskProvider } from './contexts/EditTask'
import { Button, Icon, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from './contexts/Theme'
import { style } from 'typestyle/'
import { fz, primaryColor } from './theme'
import { Auth } from './contexts/Auth'
import {
  TaskCollectionConsumer,
  TaskCollectionProvider,
} from './contexts/TaskCollection'
import VBox from './lib/layout-components/VBox'
import HBox from './lib/layout-components/HBox'
import { HBox16 } from './lib/layout-components/Box'

function FilteredTaskList({ pred, ...otherProps }) {
  return (
    <TaskCollectionConsumer
      children={({ filterTasks }) => (
        <TaskList tasks={filterTasks(pred)} {...otherProps} />
      )}
    />
  )
}

function CategoryTaskList({ category, ...otherProps }) {
  return (
    <FilteredTaskList
      title={`${category}`}
      pred={allPass([activePred, t => t.category === category])}
      category={category}
      {...otherProps}
    />
  )
}

function TagTaskList({ tid, tagTitle, ...otherProps }) {
  return (
    <CollectionConsumer>
      {({ tags }) =>
        findById(tid)(tags)
          .map(tag => (
            <FilteredTaskList
              title={`${tag.title}`}
              pred={allPass([activePred, t => t.tagIds.includes(tid)])}
              {...otherProps}
            />
          ))
          .getOrElse(
            <ErrorMessage
            >{`Tag "${tagTitle}" not found. (id:${tid})`}</ErrorMessage>,
          )
      }
    </CollectionConsumer>
  )
}

TagTaskList.defaultProps = {
  tid: '',
  tagTitle: '',
}

function NotFound() {
  return <ErrorMessage>404</ErrorMessage>
}

function renderMainRoutes() {
  const routerClass = style(padding(rem(2), rem(1)), bg(white), {
    minHeight: '100%',
  })

  return (
    <Router className={routerClass}>
      <Redirect from={'/'} to={'all'} noThrow />
      <TagList path={'tag'} />
      <FilteredTaskList path={'all'} title={'All Tasks'} pred={T} />
      <FilteredTaskList path={'done'} title="Done Tasks" pred={donePred} />
      <CategoryTaskList path={'category/:category'} />
      <TagTaskList path={'tag/:tagTitle/:tid'} />
      <NotFound default />
    </Router>
  )
}

const AllProviders = nest(
  CssBaseline,
  ThemeProvider,
  TaskCollectionProvider,
  CollectionProvider,
  FocusTrapStackProvider,
  EditTaskProvider,
)

const App = () => {
  return (
    <AllProviders>
      <FocusTrap
        focusTrapOptions={{
          returnFocusOnDeactivate: false,
          escapeDeactivates: false,
        }}
      >
        <VBox className={style(sizeViewport100, bg(gray(0.05)))}>
          <HBox16
            className={style(
              bg(primaryColor),
              fg(white),
              center,
              padding('0.5rem'),
            )}
          >
            <div className={style(fz.lg)}>Da Flow</div>
            <div className={style(flex)} />
            <div>
              <Auth children={({ user }) => user && user.displayName} />
            </div>
            <div>
              <Auth
                children={({ match, signIn, signOut }) =>
                  match({
                    signedIn: () => <Button onClick={signOut}>Sign Out</Button>,
                    signedOut: () => <Button onClick={signIn}>Sign In</Button>,
                    unknown: () => 'Loading...',
                  })
                }
              />
            </div>
          </HBox16>
          <HBox className={style(flex, someChildWillScroll)}>
            <div className={style(scroll, { minWidth: 225 })}>
              <Sidebar />
            </div>
            <div className={style(flex, scroll)}>{renderMainRoutes()}</div>
            <div className={style(absolute, { right: 0, bottom: 0 })}>
              <div
                className={style(/*brPill, shadow, */ relative, {
                  top: '-1rem',
                  left: '-1rem',
                })}
              >
                <TaskCollectionConsumer
                  children={tasks => (
                    <Button
                      onClick={tasks.add}
                      minimal
                      intent={Intent.PRIMARY}
                      icon={<Icon icon={IconNames.ADD} iconSize={32} />}
                    />
                  )}
                />
              </div>
            </div>
          </HBox>
        </VBox>
      </FocusTrap>
    </AllProviders>
  )
}

export default App
