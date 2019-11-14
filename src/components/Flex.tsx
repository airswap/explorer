import styled from 'styled-components'

export interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  expand?: boolean
  height?: string
  children?: React.ReactNode
  opacity?: number
  shrink?: number
  grow?: number
}

const Flex = styled.div<FlexProps>`
  display: flex;
  box-sizing: border-box;
  flex-shrink: ${({ shrink }) => shrink};
  flex-grow: ${({ shrink }) => shrink};
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  width: ${({ expand }) => (expand ? '100%' : 'auto')};
  opacity: ${({ opacity }) => (opacity !== undefined ? opacity : 1)};
  height: ${({ height }) => height || 'auto'};
`
Flex.displayName = 'Flex'
Flex.defaultProps = {
  direction: 'column',
  justify: 'flex-start',
  align: 'center',
  wrap: 'nowrap',
}

export default Flex
