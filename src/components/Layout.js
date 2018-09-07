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
`

Layout.Sidebar = styled(Grid.Item).attrs({ area: 'b' })`
  > * {
    min-height: 100%;
  }
`
Layout.Content = styled(Grid.Item).attrs({ area: 'c' })`
  > * {
    min-height: 100%;
  }
`
Layout.Footer = styled(Grid.Item).attrs({ area: 'd' })`
`
