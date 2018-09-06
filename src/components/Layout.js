import * as React from 'react'
import { Grid, styled } from 'reakit'

export const Layout = styled(Grid).attrs({
  template: `
      "a a a" 
      "b c c" minmax(200px, 1fr)
      "d d d"
    `,
})`
  height: 100vh;
  width: 100vw;
`

export class LayoutC extends React.Component<{}> {
  render() {
    const template = `
      "a a a" 
      "b c c" minmax(200px, 1fr)
      "d d d"
    `

    return (
      <Layout>
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
      </Layout>
    )
  }
}
