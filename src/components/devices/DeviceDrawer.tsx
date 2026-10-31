import { Activity, Cpu, MemoryStick, Server, Thermometer, X, type LucideIcon } from 'lucide-react'
import { devices } from '../../data/devices'
import { printers } from '../../data/printers'
import { useMonitorStore } from '../../store/useMonitorStore'
import { StatusBadge } from '../ui/StatusBadge'

export function DeviceDrawer() {
  const selectedDeviceId = useMonitorStore(state => state.selectedDeviceId)
  const drawerOpen = useMonitorStore(state => state.drawerOpen)
  const setDrawerOpen = useMonitorStore(state => state.setDrawerOpen)
  const device = [...devices, ...printers].find(item => item.id === selectedDeviceId)
  if (!drawerOpen || !device) return null
  const hasStats = 'cpu' in device
  const metricRows: Array<[LucideIcon, string, number, string]> = hasStats ? [[Cpu, 'CPU', device.cpu, '%'], [MemoryStick, 'Memory', device.memory, '%'], [Activity, 'Latency', device.latency, ' ms'], [Thermometer, 'Temperature', 58, '%']] : []
  return <div className="fixed inset-0 z-50 flex justify-end bg-canvas/60 backdrop-blur-sm"><aside className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6 shadow-2xl rise-in"><div className="flex items-start justify-between"><div><p className="eyebrow">Device Details</p><h2 className="mt-2 text-xl font-semibold">{device.name}</h2><p className="mt-1 text-xs text-muted">{'hostname' in device ? device.hostname : device.location}</p></div><button aria-label="Close device details" onClick={() => setDrawerOpen(false)} className="rounded-lg p-2 text-muted hover:bg-panel hover:text-ink"><X size={18}/></button></div><div className="mt-5"><StatusBadge status={device.status}/></div><dl className="mt-7 grid grid-cols-2 gap-3">{[['IP', device.ip], ['Last check', device.lastCheck], ['Status', device.status], ['Uptime', hasStats ? device.uptime : 'Não informado'], ['Latency', hasStats ? `${device.latency} ms` : device.ping === null ? 'Sem resposta' : `${device.ping} ms`], ['Temperature', hasStats ? device.temperature : 'Não informado']].map(([term, value]) => <div key={term} className="rounded-xl border border-border bg-panel p-3"><dt className="eyebrow">{term}</dt><dd className="mt-2 text-xs font-medium">{value}</dd></div>)}</dl>{hasStats && <><h3 className="mt-7 text-sm font-semibold">Live metrics</h3><div className="mt-3 space-y-3">{metricRows.map(([Icon, label, value, unit]) => <div key={label} className="rounded-xl border border-border bg-panel p-3"><div className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-muted"><Icon size={14}/>{label}</span><b>{value}{unit}</b></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }}/></div></div>)}</div></>}<div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4"><p className="flex items-center gap-2 text-xs font-semibold text-primary"><Server size={15}/>MONITORING</p><p className="mt-2 text-xs leading-relaxed text-muted">Dados simulados atualizados continuamente e prontos para uma futura fonte de telemetria.</p></div></aside></div>
}
