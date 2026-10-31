import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from '@xyflow/react'
import type { Connection, EdgeChange, NodeChange } from '@xyflow/react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialAlerts, initialEvents } from '../data/events'
import { initialTopologyNodes } from '../data/devices'
import { initialMetrics, vary } from '../mock/metrics'
import { realtimeEvent } from '../mock/realtime'
import type { Alert, MetricPoint, MonitorEvent, TopologyConnection, TopologyNode } from '../types'

const edgeStyle = { stroke: '#42C8FF', strokeWidth: 2 }
const initialEdges: TopologyConnection[] = [
  ['internet', 'mikrotik'], ['mikrotik', 'firewall'], ['firewall', 'core-switch'], ['core-switch', 'hp-dl380'], ['core-switch', 'dell-r730'], ['hp-dl380', 'dell-r730']
].map(([source, target], index) => ({ id: `edge-${index}`, source, target, animated: index !== 4, style: index === 5 ? { stroke: '#F5B942', strokeWidth: 2 } : edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: index === 5 ? '#F5B942' : '#42C8FF' } }))

type Page = 'Dashboard' | 'Topology' | 'Servers' | 'Network' | 'Printers' | 'Alerts' | 'Events' | 'Settings'
interface MonitorState {
  nodes: TopologyNode[]
  edges: TopologyConnection[]
  metrics: MetricPoint[]
  events: MonitorEvent[]
  alerts: Alert[]
  activePage: Page
  selectedDeviceId: string | null
  drawerOpen: boolean
  presentationMode: boolean
  sidebarOpen: boolean
  setActivePage: (page: Page) => void
  setSelectedDevice: (id: string | null) => void
  setDrawerOpen: (value: boolean) => void
  setPresentationMode: (value: boolean) => void
  setSidebarOpen: (value: boolean) => void
  onNodesChange: (changes: NodeChange<TopologyNode>[]) => void
  onEdgesChange: (changes: EdgeChange<TopologyConnection>[]) => void
  onConnect: (connection: Connection) => void
  autoLayout: () => void
  removeEdge: (id: string) => void
  acknowledge: (id: string) => void
  tick: () => void
  resetDemo: () => void
}

export const useMonitorStore = create<MonitorState>()(persist((set, get) => ({
  nodes: initialTopologyNodes,
  edges: initialEdges,
  metrics: initialMetrics,
  events: initialEvents,
  alerts: initialAlerts,
  activePage: 'Dashboard',
  selectedDeviceId: null,
  drawerOpen: false,
  presentationMode: false,
  sidebarOpen: false,
  setActivePage: activePage => set({ activePage, sidebarOpen: false }),
  setSelectedDevice: selectedDeviceId => set({ selectedDeviceId, drawerOpen: selectedDeviceId !== null }),
  setDrawerOpen: drawerOpen => set({ drawerOpen }),
  setPresentationMode: presentationMode => set({ presentationMode }),
  setSidebarOpen: sidebarOpen => set({ sidebarOpen }),
  onNodesChange: changes => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: changes => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: connection => set({ edges: addEdge({ ...connection, id: `edge-${crypto.randomUUID()}`, animated: true, style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#42C8FF' } }, get().edges) }),
  autoLayout: () => {
    const positions: Record<string, { x: number; y: number }> = { internet: { x: 430, y: 20 }, mikrotik: { x: 430, y: 150 }, firewall: { x: 430, y: 280 }, 'core-switch': { x: 430, y: 410 }, 'hp-dl380': { x: 130, y: 560 }, 'dell-r730': { x: 730, y: 560 } }
    set({ nodes: get().nodes.map(node => ({ ...node, position: positions[node.id] ?? node.position })) })
  },
  removeEdge: id => set({ edges: get().edges.filter(edge => edge.id !== id) }),
  acknowledge: id => set({ alerts: get().alerts.map(alert => alert.id === id ? { ...alert, acknowledged: true } : alert) }),
  tick: () => {
    const prior = get().metrics.at(-1) ?? initialMetrics.at(-1)!
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const point: MetricPoint = { time: now, cpu: vary(prior.cpu, 9, 22, 74), memory: vary(prior.memory, 4, 48, 78), network: vary(prior.network, 15, 28, 86), availability: vary(prior.availability, .15, 98.8, 99.5), download: vary(prior.download, 42, 70, 310), upload: vary(prior.upload, 16, 12, 110) }
    const [device, message] = realtimeEvent()
    const event: MonitorEvent = { id: crypto.randomUUID(), device, message, status: 'online', timestamp: now }
    set({ metrics: [...get().metrics.slice(-23), point], events: [event, ...get().events].slice(0, 30) })
  },
  resetDemo: () => set({ nodes: initialTopologyNodes, edges: initialEdges, metrics: initialMetrics, events: initialEvents, alerts: initialAlerts, selectedDeviceId: null, drawerOpen: false, presentationMode: false })
}), { name: 'caboprev-monitor-store', partialize: state => ({ nodes: state.nodes, edges: state.edges, alerts: state.alerts, presentationMode: state.presentationMode }) }))
