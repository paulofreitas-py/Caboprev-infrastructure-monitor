import type { Alert, MonitorEvent } from '../types'

export const initialEvents: MonitorEvent[] = [
  { id: 'event-1', device: 'HP DL380 Gen9', message: 'Hyper-V Replica completed successfully', status: 'online', timestamp: '22:41:32' },
  { id: 'event-2', device: 'Core Switch', message: 'Port health check completed', status: 'online', timestamp: '22:40:18' },
  { id: 'event-3', device: 'Secretaria Printer', message: 'Device unreachable', status: 'offline', timestamp: '22:39:54' },
  { id: 'event-4', device: 'MikroTik RB3011', message: 'Latency returned to normal', status: 'online', timestamp: '22:38:22' }
]

export const initialAlerts: Alert[] = [
  { id: 'alert-1', severity: 'critical', device: 'Secretaria Printer', message: 'Device unreachable', timestamp: '2 min atrás', acknowledged: false },
  { id: 'alert-2', severity: 'warning', device: '1st Floor Printer', message: 'No response for 2 minutes', timestamp: '2 min atrás', acknowledged: false },
  { id: 'alert-3', severity: 'warning', device: 'Dell R730', message: 'Disk usage above 80%', timestamp: '5 min atrás', acknowledged: false },
  { id: 'alert-4', severity: 'info', device: 'Internet', message: 'Failover link available', timestamp: 'agora', acknowledged: false }
]

