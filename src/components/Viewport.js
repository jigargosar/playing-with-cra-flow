import { Flex, styled } from 'reakit'

/**
 * General component description in JSDoc format. Markdown is *supported*.
 * @component
 */
export const Viewport = styled(Flex)`
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
Viewport.propTypes = {}
Viewport.defaultProps = {}
