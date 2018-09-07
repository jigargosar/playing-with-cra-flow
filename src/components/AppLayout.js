import { styled } from 'reakit'

export const AppLayout = styled.div`
  display: flex;    
  flex-direction: column;
  height: 100vh;  
`

AppLayout.Middle = styled.div`
  display: flex;    
  overflow: hidden;  
`

AppLayout.Sidebar = styled.div`
  overflow: scroll;
  width: 250px;  
`
AppLayout.Main = styled.div`
  overflow: scroll;  
`