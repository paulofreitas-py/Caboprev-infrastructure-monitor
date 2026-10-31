import type { Edge, Node } from '@xyflow/react'

export type Status = 'online' | 'offline' | 'warning' | 'info'
export type Severity = 'critical' | 'warning' | 'info'

export interface Device {
  id: string
  name: string
  type: 'internet' | 'gateway' | 'firewall' | 'switch' | 'server'
  status: Status
  ip: string
  hostname: string
  description: string
  uptime: string
  cpu: number
  memory: number
  temperature: string
  latency: number
  lastCheck: string
}

export interface Printer {
  id: string
  name: string
  location: string
  ip: string
  model: string
  status: Status
  ping: number | null
  toner: number | null
  pages: number | null
  lastCheck: string
}

export interface Server extends Device {
  disk: number
  vms: number | null
  replicaStatus: string
}

export interface NetworkDevice {
  id: string
  name: string
  type: string
  status: Status
  bandwidth: string
  latency: number
  packetLoss: number
  uptime: string
}

export interface Alert {
  id: string
  severity: Severity
  device: string
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface MonitorEvent {
  id: string
  device: string
  message: string
  status: Status
  timestamp: string
}

export interface MetricPoint {
  time: string
  cpu: number
  memory: number
  network: number
  availability: number
  download: number
  upload: number
}

export interface TopologyNodeData extends Record<string, unknown> {
  deviceId: string
  label: string
  type: string
  status: Status
  subtitle: string
  ip: string
}

export type TopologyNode = Node<TopologyNodeData>
export type TopologyConnection = Edge

