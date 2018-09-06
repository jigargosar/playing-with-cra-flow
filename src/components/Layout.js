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

Layout.Header = styled(Grid.Item).attrs({ area: 'a' })`
  background-color: red;
`

Layout.Sidebar = styled(Grid.Item).attrs({ area: 'b' })`
  background-color: green;
`
Layout.Content = styled(Grid.Item).attrs({ area: 'c' })`
  background-color: blue;
`
Layout.Footer = styled(Grid.Item).attrs({ area: 'd' })`
  background-color: yellow;
`

