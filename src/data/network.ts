import type { NetworkDevice } from '../types'

export const networkDevices: NetworkDevice[] = [
  { id: 'worldnet', name: 'Worldnet', type: 'Internet Link', status: 'online', bandwidth: '500 Mbps', latency: 4, packetLoss: 0, uptime: '99.9%' },
  { id: 'protegenet', name: 'Protegenet', type: 'Failover Link', status: 'online', bandwidth: '200 Mbps', latency: 5, packetLoss: 0, uptime: '99.8%' },
  { id: 'mikrotik', name: 'MikroTik RB3011', type: 'Gateway', status: 'online', bandwidth: 'Não informado', latency: 3, packetLoss: 0, uptime: '99.9%' },
  { id: 'firewall', name: 'SWH WEA-ROJ416L', type: 'Firewall', status: 'online', bandwidth: 'Não informado', latency: 4, packetLoss: 0, uptime: '99.9%' },
  { id: 'core-switch', name: 'Core Switch', type: 'Core Switching', status: 'online', bandwidth: 'Não informado', latency: 2, packetLoss: 0, uptime: '99.9%' }
]

