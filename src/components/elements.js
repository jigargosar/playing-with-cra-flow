import {Base, Block, css, Flex, styled} from 'reakit'
import {ifProp} from 'styled-tools'

export const TaskItem = styled(Base)`
  margin: 0 1rem 1rem;
`
export const TaskItemCategory = styled(Block)`
  font-size: 0.7rem;
  text-transform: uppercase;
`
export const TaskItemTag = styled(Block)`
  font-size: 0.7rem;
  text-transform: uppercase;
  margin: 0 0.5rem;
`
export const TaskTitle = styled(Base)`
  ${ifProp(
    'done',
    css`
      color: gray;
      text-decoration: line-through;
    `,
  )};
`
export const SidebarItem = styled(Base)`
  ${ifProp(
    'selected',
    css`
      color: tomato;
    `,
  )};
  padding: 0.5rem;
  min-width: 8rem;
  cursor: pointer;
`
export const CategorySidebarItem = styled(SidebarItem)``
export const PageHeader = styled(Base)`
  padding: 1rem;
`
export const PageSidebar = styled(Base)`
  overflow: scroll;
  padding: 1rem;
  border-right: 1px solid #ddd;
`
export const PageContent = styled(Base)`
  flex: auto;
  overflow: scroll;
  padding: 1rem;
`
export const PageContentWrapper = styled(Flex)`
  height: 100%;
  flex: auto;
  flex-direction: row;
`

export const MenuItem = styled(Base)`
  ${ifProp(
    'selected',
    css`
      color: tomato;
    `,
  )};
  padding: 0.5rem;
  min-width: 8rem;
  cursor: pointer;
`
