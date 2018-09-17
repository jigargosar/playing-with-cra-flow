import React from 'react'

import { storiesOf } from '@storybook/react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { cssRaw } from 'typestyle/'
import { NumberValue } from 'react-values'

// language=LESS
cssRaw`
  .router {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .page {
    position: relative;
    top: 0;
    left: 0;
    color: white;
    text-align: center;
    font-size: 100px;
    font-style: italic;
    font-family: Times;
    padding: 100px;
  }

  .fade-enter .page {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active .page {
    opacity: 1;
    transition: opacity 450ms ease-in;
  }

  .app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }


`
storiesOf('Animation', module).add('fade between two dom elements', () => (
  <NumberValue
    defaultValue={1}
    children={({ value, set }) => (
      <div className={'app'}>
        <TransitionGroup className="transition-group">
          <CSSTransition key={value} classNames="fade" timeout={500}>
            <div key={value}>
              <Page page={value} />
              <button onClick={() => set(1)}>1</button>
              <button onClick={() => set(2)}>2</button>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )}
  />
))

const Page = props => (
  <div
    className="page"
    style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
  >
    {props.page}
  </div>
)
