import * as React from 'react'
import { compose, identity, prop } from 'ramda'
import { withState } from 'recompose'

// export class Value extends React.Component {
//   set = value => {
//     return p((resolve, reject) => {
//       try {
//         const newState = ifElse(
//           isFunction,
//           over(lensProp('value'), __),
//           objOf('value'),
//         )(value)
//         this.setState(newState, () => resolve(this.state))
//       } catch (e) {
//         reject(e)
//       }
//     })
//   }
//
//   state = { value: this.props.value, set: this.set }
//
//   render() {
//     return this.props.children(this.state)
//   }
// }

export const Value = compose(withState('value', 'set', prop('value')))(identity)
