// @flow
import { nullableToMaybe } from 'folktale/conversions'
import * as ReactDOM from 'react-dom'
import { anyPass, cond, invoker, mathMod, tap } from 'ramda'
import { atClampedIndex } from '../folktale-helpers'
import { renderWithComponent } from './renderWithComponent'
import * as React from 'react'
import { isHotkey } from 'is-hotkey'
import uniqueSelector from 'unique-selector'

type Props = { children: Function }

function getDOMFromRef(containerRef) {
  return nullableToMaybe(ReactDOM.findDOMNode(containerRef.current))
}

const onFocus = (
  e,
  { refs: { containerRef }, state: { idx, totalCount }, setState },
) => {
  getDOMFromRef(containerRef).map(el => {
    const containerSelector = uniqueSelector(el)

    const chEl = e.target.closest(
      `${containerSelector} > [tabindex='0'], :scope > a`,
    )

    console.log(`chEl`, chEl)
    return null
  })

  // getDOMFromRef(containerRef).map(
  //   tap(el => {
  //     const elList = el.querySelectorAll(`:scope > [tabindex='0'], :scope > a`)
  //     if (totalCount !== elList.length) {
  //       setState({ totalCount: elList.length })
  //     }
  //     const elToFocus = atClampedIndex(idx, elList)
  //     // console.log(`idx`, idx)
  //     requestAnimationFrame(() => elToFocus.map(invoker(0, 'focus')))
  //   }),
  // )
}

const didMountOrUpdate = ({
  refs: { containerRef },
  state: { idx, totalCount },
  setState,
}) => {
  getDOMFromRef(containerRef).map(el =>
    el.querySelectorAll(`:scope > [tabindex='0'], :scope > a`),
  )

  getDOMFromRef(containerRef).map(
    tap(el => {
      const elList = el.querySelectorAll(`:scope > [tabindex='0'], :scope > a`)
      if (totalCount !== elList.length) {
        setState({ totalCount: elList.length })
      }
      const elToFocus = atClampedIndex(idx, elList)
      // console.log(`idx`, idx)
      requestAnimationFrame(() => elToFocus.map(invoker(0, 'focus')))
    }),
  )
}

const isArrowUp = isHotkey('ArrowUp')
const isArrowDown = isHotkey('ArrowDown')
const isArrowLeft = isHotkey('ArrowLeft')
const isArrowRight = isHotkey('ArrowRight')

function onKeyDown({ setState, state: { idx, totalCount } }) {
  return e => {
    if (e.target.matches('input,textarea')) return
    const setIdx = idx => setState({ idx: mathMod(idx, totalCount) })
    cond([
      //
      [isArrowUp, () => setIdx(idx - 1)],
      [isArrowDown, () => setIdx(idx + 1)],
      [isArrowLeft, () => setIdx(0)],
      [isArrowRight, () => setIdx(totalCount - 1)],
    ])(e)

    const isArrowKey = anyPass([
      isArrowUp,
      isArrowDown,
      isArrowRight,
      isArrowLeft,
    ])

    if (isArrowKey(e)) {
      e.preventDefault()
    }
  }
}

export function ArrowKeyNavigator({ children }: Props) {
  return renderWithComponent(
    {
      initialState: { idx: 0, totalCount: 0 },
      getRefs: () => ({ containerRef: React.createRef() }),
      didMount: didMountOrUpdate,
      didUpdate: didMountOrUpdate,
    },
    props => {
      return children({
        containerRef: props.refs.containerRef,
        onKeyDown: onKeyDown(props),
        onFocus: e => onFocus(e, props),
      })
    },
  )
}
