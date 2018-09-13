// @flow
import * as React from 'react'

export class ErrorBoundary extends React.Component<{ children: Function },
  { error: Error | null, info: any },
  > {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error, info: any) {
    this.setState({ error, info })
  }

  render() {
    const { children, ...otherProps } = this.props
    return children({ ...this.state, ...otherProps })
  }
}
