import {Base, Flex, styled} from 'reakit'

export const Viewport = styled(Flex)`
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
Viewport.propTypes = {}

export const ViewportItem = styled(Base)``
ViewportItem.propTypes = {}

export const ViewportSpacer = styled(Base)`
  flex: auto;
`
ViewportSpacer.defaultProps = {}

export const ViewportScrollable = styled(Flex)`
  overflow: scroll;
`
ViewportScrollable.propTypes = {}
