import {Base, Input, styled} from 'reakit'

export const CmdInput = styled(Input)``

CmdInput.defaultProps = {
  placeholder: 'Enter Command',
  autoFocus: true,
}

export const CmdInputWrapper = styled(Base)`
  padding: 1rem;
`
