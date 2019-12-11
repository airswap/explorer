import styled from 'styled-components'

import Flex from '../../components/Flex'
import { H2, H4 } from '../../components/Typography'

export const VolumeTitle = styled(H4).attrs({ expand: true, textAlign: 'left' })`
  color: ${({ theme }) => theme.palette.primaryColor};
`

export const VolumeAmount = styled(H2).attrs({ expand: true, textAlign: 'left' })`
  color: white;
`

export const VolumeContentContainer = styled(Flex).attrs({ expand: true })`
  padding: 40px;
  flex-shrink: 0;
`
