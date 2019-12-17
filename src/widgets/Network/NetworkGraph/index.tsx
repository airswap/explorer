import React, { useEffect, useRef, useState } from 'react'
import ForceGraph3D from 'react-force-graph-3d'
import styled from 'styled-components'
import WithLoading from '../../../components/WithLoading'
import Container, { NetworkGraphProps } from './Container'
import { GRAPH_COLOR_PALLETE } from '../../../constants'

const GraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;

  .scene-nav-info {
    height: 30px;
  }

  .graph-info-msg {
    display: none;
  }
`

interface GraphDataNode {
  id: string
}

interface GraphDataLink {
  source: string
  target: string
}

interface GraphData {
  nodes: GraphDataNode[]
  links: GraphDataLink[]
}

function NetworkGraph(props: NetworkGraphProps) {
  const graphRef = useRef<HTMLDivElement>(null)
  const [graphData, setGraphData] = useState<GraphData>()
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const onWindowResize = () => {
    if (graphRef.current) {
      setWidth(graphRef.current.getBoundingClientRect().width)
      setHeight(graphRef.current.getBoundingClientRect().height)
    }
  }

  useEffect(() => {
    onWindowResize()
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [graphRef.current])

  useEffect(() => {
    const nodeSet = new Set<string>()
    const links: GraphDataLink[] = []

    props.trades.forEach(trade => {
      nodeSet.add(trade.makerAddress)
      nodeSet.add(trade.takerAddress)
      links.push({ source: trade.makerAddress, target: trade.takerAddress })
    })
    const nodes = Array.from(nodeSet).map((address: string) => ({ id: address }))
    setGraphData({ nodes, links })
  }, [props.trades])

  const onNodeClick = node => {
    window.open(`https://etherscan.io/address/${node.id}`)
  }

  const onNodeHover = (node, prevNode) => {
    if (graphRef.current) {
      graphRef.current.style.cursor = node ? 'pointer' : 'default'
    }
  }

  const getNodeColor = node => {
  return GRAPH_COLOR_PALLETE[Math.floor(Math.random() * GRAPH_COLOR_PALLETE.length)];
}

  return (
    <GraphContainer ref={graphRef}>
      <WithLoading isLoading={!props.trades || !props.trades.length}>
        <ForceGraph3D
          width={width}
          height={height}
          graphData={graphData}
          backgroundColor="#30303b"
          nodeColor={node => getNodeColor(node)}
          nodeAutoColorBy="id"
          nodeResolution={10}
          showNavInfo={false}
          nodeOpacity={1}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={0.2}
          linkDirectionalParticleSpeed={0.004}
          nodeLabel={node => node.id}
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
        />
      </WithLoading>
    </GraphContainer>
  )
}

export default Container(NetworkGraph)
