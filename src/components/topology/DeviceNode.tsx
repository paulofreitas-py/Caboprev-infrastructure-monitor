import { Handle, Position, type NodeProps } from '@xyflow/react'
import { GitBranch, Globe2, Router, Server, Shield } from 'lucide-react'
import type { TopologyNode } from '../../types'
import { useMonitorStore } from '../../store/useMonitorStore'

const icons = { WAN: Globe2, GATEWAY: Router, FIREWALL: Shield, 'CORE SWITCHING': GitBranch, 'PRIMARY SERVER': Server, 'REPLICA SERVER': Server }

export function DeviceNode({ data, selected }: NodeProps<TopologyNode>) {
  const setSelectedDevice = useMonitorStore(state => state.setSelectedDevice)
  const Icon = icons[data.type as keyof typeof icons] ?? Server
  const tone = data.status === 'warning' ? 'text-warning' : data.status === 'offline' ? 'text-danger' : 'text-success'
  return <div onDoubleClick={() => setSelectedDevice(data.deviceId)} className={`relative min-w-52 rounded-xl border bg-surface p-3.5 shadow-panel transition ${selected ? 'border-primary ring-1 ring-primary/40' : 'border-border hover:border-primary/60'}`}><Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-2 !border-surface !bg-primary"/><Handle type="target" position={Position.Left} id="left" className="!h-2.5 !w-2.5 !border-2 !border-surface !bg-primary"/><div className="flex items-start gap-3"><span className="rounded-lg bg-primary/10 p-2 text-primary"><Icon size={16}/></span><div><p className="text-[9px] font-bold tracking-[.15em] text-muted">{data.type}</p><p className="mt-1 text-xs font-semibold text-ink">{data.label}</p></div></div><p className="mt-3 max-w-48 text-[10px] text-muted">{data.subtitle}</p><div className={`mt-3 flex items-center gap-1.5 text-[10px] font-bold ${tone}`}><i className={`status-dot ${data.status === 'offline' ? 'bg-danger' : data.status === 'warning' ? 'bg-warning' : 'live-pulse bg-success'}`}/>{data.status.toUpperCase()}</div><Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-2 !border-surface !bg-primary"/><Handle type="source" position={Position.Right} id="right" className="!h-2.5 !w-2.5 !border-2 !border-surface !bg-primary"/></div>
}
