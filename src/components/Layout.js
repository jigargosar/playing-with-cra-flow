import * as React from 'react'
import { Grid } from 'reakit'

export class Layout extends React.Component<{}> {
  render() {
    const template = `
      "a a a" 
      "b c c" minmax(200px, 1fr)
      "d d d"
    `

    return (
      <Grid template={template} height={'100vh'}>
        <Grid.Item area="a" backgroundColor="red">
          Header
        </Grid.Item>
        <Grid.Item area="b" backgroundColor="green">
          Sidebar
        </Grid.Item>
        <Grid.Item area="c" backgroundColor="blue">
          Content
        </Grid.Item>
        <Grid.Item area="d" backgroundColor="yellow">
          Footer
        </Grid.Item>
      </Grid>
    )
  }
}