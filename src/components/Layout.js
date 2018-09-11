import { styled } from './styled'

export const Base = styled.div`
`

export const Flex = styled(Base)`
  display: flex;
`
export const FCol = styled(Flex)`
  flex-direction: column;
`

export const FRow = styled(Flex)`
  flex-direction: row;
`
