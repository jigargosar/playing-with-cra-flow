import { Base, Block, Button, css, Flex, InlineBlock, styled } from 'reakit'
import { ifProp } from 'styled-tools'

export const spacing1 = ['0.3rem']
export const spacing1e = ['0.3em']

export const TaskItem = styled(Base)`
  margin: 0 1rem 1rem;
`
export const TaskItemCategory = styled(Block)`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: ${spacing1} -${spacing1};
`
export const TaskItemCategoryTitle = styled(InlineBlock)`
  cursor: pointer;
  margin: 0 ${spacing1e};
  &:hover {
    text-decoration: underline deepskyblue;
  }
`
export const TaskItemTags = styled(Block)`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: ${spacing1} -${spacing1};
`
export const TaskItemTag = styled(InlineBlock)`
  margin: 0 ${spacing1e};
  cursor: pointer;
  &:hover {
    text-decoration: underline deepskyblue;
  }
`
export const TagList = styled(Block)``
export const TagListItem = styled(Block)`
  text-transform: uppercase;
  margin: 1rem;
  cursor: pointer;
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
export const IconButton = styled(Button)`
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 1em;
  min-height: 1em;
  widows: auto;
  height: auto;
  &>svg{
    width: 1em;
    height: 1em;
  }
`
