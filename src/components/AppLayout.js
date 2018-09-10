import styled from 'react-emotion'

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

AppLayout.Middle = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
`

AppLayout.Sidebar = styled.div`
  flex: none;
  overflow-y: scroll;
  width: 250px;
`
AppLayout.Main = styled.div`
  overflow-y: scroll;
  flex: 1 1 auto;
`
