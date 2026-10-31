import type { Server } from '../types'

export const servers: Server[] = [
  { id: 'hp-dl380', name: 'HP DL380 Gen9', type: 'server', status: 'online', ip: 'Não informado', hostname: 'hyperv-primary', description: 'Servidor primário · Hyper-V', uptime: '41d 06h', cpu: 38, memory: 64, disk: 62, temperature: '34°C', latency: 2, vms: 6, replicaStatus: 'SYNCHRONIZED', lastCheck: 'agora' },
  { id: 'dell-r730', name: 'Dell PowerEdge R730', type: 'server', status: 'warning', ip: 'Não informado', hostname: 'hyperv-replica', description: 'Servidor secundário · Hyper-V Replica', uptime: '41d 06h', cpu: 29, memory: 58, disk: 82, temperature: '36°C', latency: 3, vms: null, replicaStatus: 'HEALTHY', lastCheck: 'agora' }
]

