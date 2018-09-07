import { Grid, styled } from 'reakit'

export const LayoutGrid = styled(Grid).attrs({ template: `
      'a a a' 
      'b c c' minmax(200px, 1fr)
      'd d d'
    ` })`
         height: 100vh;
         width: 100vw;`
// LayoutGrid.displayName='LayoutGrid'
LayoutGrid.Header = styled(Grid.Item).attrs({ area: 'a' })``
// LayoutGrid.Header.displayName='LayoutGrid.Header'
LayoutGrid.Sidebar = styled(Grid.Item).attrs({ area: 'b' })`
  > * {
    height: 100%;
    overflow: scroll;
  }
`
// LayoutGrid.Sidebar.displayName='LayoutGrid.Sidebar'
LayoutGrid.Content = styled(Grid.Item).attrs({ area: 'c' })`
  > * {
    height: 100%;
    overflow: scroll;
  }
`
// LayoutGrid.Content.displayName='LayoutGrid.Content'
LayoutGrid.Footer = styled(Grid.Item).attrs({ area: 'd' })``
// LayoutGrid.Footer.displayName='LayoutGrid.Footer'
