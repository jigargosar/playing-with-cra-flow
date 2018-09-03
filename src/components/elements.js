import { Base, css, Flex, styled } from 'reakit'
import { ifProp } from 'styled-tools'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const TaskTitle = styled(Base)`
  ${ifProp(
    'done',
    css`
      color: gray;
      text-decoration: line-through;
    `,
  )};
`
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
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
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const CategorySidebarItem = styled(SidebarItem)``
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const PageHeader = styled(Base)`
  padding: 1rem;
`
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const PageSidebar = styled(Base)`
  overflow: scroll;
  padding: 1rem;
  border-right: 1px solid #ddd;
`
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const PageContent = styled(Base)`
  flex: auto;
  overflow: scroll;
  padding: 1rem;
`
/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const PageContentWrapper = styled(Flex)`
  height: 100%;
  flex: auto;
  flex-direction: row;
`


/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
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
