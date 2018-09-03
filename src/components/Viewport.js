import { Base, Flex, styled } from 'reakit'

export const Viewport = styled(Flex)`
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`
Viewport.propTypes = {}
Viewport.defaultProps = {}

export const ViewportItem = styled(Base)``
ViewportItem.propTypes = {}
ViewportItem.defaultProps = {}

export const ViewportSpacer = styled(Base)`
  flex: auto;
`
ViewportSpacer.propTypes = {}
ViewportSpacer.defaultProps = {}

export const ViewportScrollable = styled(Base)`
  overflow: scroll;
  flex: auto;
`
ViewportScrollable.propTypes = {}
ViewportScrollable.defaultProps = {}
