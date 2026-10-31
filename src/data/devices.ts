import type { Device, TopologyNode } from '../types'

export const devices: Device[] = [
  { id: 'internet', name: 'Internet Links', type: 'internet', status: 'online', ip: 'Não informado', hostname: 'worldnet-protegenet', description: 'Worldnet 500 Mbps + Protegenet 200 Mbps', uptime: '99d 04h', cpu: 14, memory: 31, temperature: 'Não informado', latency: 4, lastCheck: 'agora' },
  { id: 'mikrotik', name: 'MikroTik RB3011', type: 'gateway', status: 'online', ip: '192.168.85.1', hostname: 'gateway-caboprev', description: 'Gateway e roteamento', uptime: '87d 12h', cpu: 24, memory: 42, temperature: 'Não informado', latency: 3, lastCheck: 'agora' },
  { id: 'firewall', name: 'SWH WEA-ROJ416L', type: 'firewall', status: 'online', ip: 'Não informado', hostname: 'firewall-caboprev', description: 'Firewall · VPN · NAT · DHCP', uptime: '87d 12h', cpu: 35, memory: 47, temperature: 'Não informado', latency: 4, lastCheck: 'agora' },
  { id: 'core-switch', name: 'Core Switch', type: 'switch', status: 'online', ip: 'Não informado', hostname: 'core-switch-caboprev', description: '3× TP-Link + 2× Intelbras', uptime: '63d 18h', cpu: 19, memory: 39, temperature: 'Não informado', latency: 2, lastCheck: 'agora' },
  { id: 'hp-dl380', name: 'HP DL380 Gen9', type: 'server', status: 'online', ip: 'Não informado', hostname: 'hyperv-primary', description: 'Servidor primário · Hyper-V · 6 VMs', uptime: '41d 06h', cpu: 38, memory: 64, temperature: '34°C', latency: 2, lastCheck: 'agora' },
  { id: 'dell-r730', name: 'Dell PowerEdge R730', type: 'server', status: 'warning', ip: 'Não informado', hostname: 'hyperv-replica', description: 'Servidor secundário · Hyper-V Replica', uptime: '41d 06h', cpu: 29, memory: 58, temperature: '36°C', latency: 3, lastCheck: 'agora' }
]

export const initialTopologyNodes: TopologyNode[] = [
  { id: 'internet', type: 'device', position: { x: 430, y: 20 }, data: { deviceId: 'internet', label: 'INTERNET', type: 'WAN', status: 'online', subtitle: 'Worldnet 500 Mbps · Protegenet 200 Mbps', ip: 'Não informado' } },
  { id: 'mikrotik', type: 'device', position: { x: 430, y: 150 }, data: { deviceId: 'mikrotik', label: 'MikroTik RB3011', type: 'GATEWAY', status: 'online', subtitle: 'Gateway · 192.168.85.1', ip: '192.168.85.1' } },
  { id: 'firewall', type: 'device', position: { x: 430, y: 280 }, data: { deviceId: 'firewall', label: 'SWH WEA-ROJ416L', type: 'FIREWALL', status: 'online', subtitle: 'VPN · NAT · DHCP', ip: 'Não informado' } },
  { id: 'core-switch', type: 'device', position: { x: 430, y: 410 }, data: { deviceId: 'core-switch', label: 'CORE SWITCH', type: 'CORE SWITCHING', status: 'online', subtitle: '3× TP-Link · 2× Intelbras', ip: 'Não informado' } },
  { id: 'hp-dl380', type: 'device', position: { x: 130, y: 560 }, data: { deviceId: 'hp-dl380', label: 'HP DL380 Gen9', type: 'PRIMARY SERVER', status: 'online', subtitle: 'Hyper-V · 6 VMs', ip: 'Não informado' } },
  { id: 'dell-r730', type: 'device', position: { x: 730, y: 560 }, data: { deviceId: 'dell-r730', label: 'Dell PowerEdge R730', type: 'REPLICA SERVER', status: 'warning', subtitle: 'Hyper-V Replica', ip: 'Não informado' } }
]

