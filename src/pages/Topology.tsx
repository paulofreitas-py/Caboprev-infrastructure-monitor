import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, type EdgeMouseHandler } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useMemo, useRef } from 'react'
import { Expand, Maximize, RotateCcw, Sparkles, Wand2, ZoomIn, ZoomOut } from 'lucide-react'
import { useReactFlow } from '@xyflow/react'
import { DeviceNode } from '../components/topology/DeviceNode'
import { PrinterTopology } from '../components/printers/PrinterTopology'
import { useMonitorStore } from '../store/useMonitorStore'

const nodeTypes = { device: DeviceNode }

function TopologyCanvas() {
  const nodes = useMonitorStore(state => state.nodes)
  const edges = useMonitorStore(state => state.edges)
  const onNodesChange = useMonitorStore(state => state.onNodesChange)
  const onEdgesChange = useMonitorStore(state => state.onEdgesChange)
  const onConnect = useMonitorStore(state => state.onConnect)
  const removeEdge = useMonitorStore(state => state.removeEdge)
  const setSelectedDevice = useMonitorStore(state => state.setSelectedDevice)
  const resetDemo = useMonitorStore(state => state.resetDemo)
  const autoLayout = useMonitorStore(state => state.autoLayout)
  const containerRef = useRef<HTMLDivElement>(null)
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const toggleFullscreen = async () => { if (!document.fullscreenElement) await containerRef.current?.requestFullscreen(); else await document.exitFullscreen() }
  const onEdgeDoubleClick: EdgeMouseHandler = (_, edge) => removeEdge(edge.id)
  const controls = useMemo(() => [
    ['Zoom in', ZoomIn, () => zoomIn()], ['Zoom out', ZoomOut, () => zoomOut()], ['Fit View', Maximize, () => fitView({ padding: .18, duration: 400 })], ['Auto Layout', Wand2, () => { autoLayout(); window.setTimeout(() => fitView({ padding: .18, duration: 300 }), 0) }], ['Reset layout', RotateCcw, resetDemo], ['Fullscreen', Expand, toggleFullscreen]
  ] as const, [fitView, zoomIn, zoomOut, resetDemo, autoLayout])
  return <div ref={containerRef} className="relative h-[620px] overflow-hidden rounded-xl border border-border bg-canvas"><div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">{controls.map(([label, Icon, action]) => <button key={label} title={label} onClick={action} className="action-button bg-surface/95 px-2.5"><Icon size={15}/><span className="hidden xl:inline">{label}</span></button>)}</div><div className="absolute right-4 top-4 z-10 rounded-lg border border-border bg-surface/95 px-3 py-2 text-[10px] text-muted"><Sparkles size={12} className="mr-1 inline text-primary"/>Double-click edge to remove</div><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelectedDevice(node.data.deviceId)} onEdgeDoubleClick={onEdgeDoubleClick} fitView fitViewOptions={{ padding: .18 }} minZoom={.25} maxZoom={2.5} className="topology-canvas"><Background gap={22} size={1} color="#1C303E"/><MiniMap nodeColor={node => node.data.status === 'warning' ? '#F5B942' : '#42C8FF'} maskColor="rgba(5,11,17,.72)"/><Controls showInteractive={false}/></ReactFlow></div>
}

export function TopologyPage() {
  return <div className="space-y-5"><div><p className="eyebrow">Topology</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Infrastructure canvas</h1><p className="mt-2 text-sm text-muted">Construa, organize e explore o caminho de tráfego da infraestrutura.</p></div><section className="panel p-5"><div className="mb-4 flex items-center justify-between"><div><p className="section-title">Main Infrastructure</p><p className="mt-1 text-xs text-muted">Drag devices · connect handles · zoom and pan</p></div><span className="text-xs text-success"><i className="status-dot live-pulse mr-1 bg-success"/>LIVE FLOW</span></div><ReactFlowProvider><TopologyCanvas/></ReactFlowProvider></section><PrinterTopology/></div>
}
