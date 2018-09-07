import { styled } from 'reakit'

export const Layout = styled.div`
  display: flex;    
  flex-direction: column;
  height: 100vh;  
`

Layout.Middle = styled.div`
  display: flex;    
  overflow: hidden;  
`

Layout.Sidebar = styled.div`
  overflow: scroll;
  width: 250px;  
`
Layout.Main = styled.div`
  overflow: scroll;  
`
