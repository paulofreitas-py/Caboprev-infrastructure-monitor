import { Gauge, Network as NetworkIcon, ShieldCheck, Wifi } from 'lucide-react'
import { TrafficChart } from '../components/charts/MetricChart'
import { StatusBadge } from '../components/ui/StatusBadge'
import { networkDevices } from '../data/network'
import { useMonitorStore } from '../store/useMonitorStore'

export function NetworkPage() {
  const metrics = useMonitorStore(state => state.metrics)
  return <div className="space-y-5"><div><p className="eyebrow">Network</p><h1 className="mt-1 text-2xl font-semibold">Network operations</h1><p className="mt-2 text-sm text-muted">Links, core routing and edge availability in real time.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{networkDevices.map((device, index) => <article key={device.id} className="panel p-5 transition hover:border-primary/40"><div className="flex items-start justify-between"><span className="rounded-xl bg-primary/10 p-3 text-primary">{index < 2 ? <Wifi size={18}/> : index === 3 ? <ShieldCheck size={18}/> : <NetworkIcon size={18}/>}</span><StatusBadge status={device.status}/></div><h2 className="mt-4 text-base font-semibold">{device.name}</h2><p className="mt-1 text-xs text-muted">{device.type}</p><div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-xs"><div><p className="eyebrow">Latency</p><b className="mt-1 block">{device.latency} ms</b></div><div><p className="eyebrow">Loss</p><b className="mt-1 block">{device.packetLoss}%</b></div><div><p className="eyebrow">Uptime</p><b className="mt-1 block">{device.uptime}</b></div></div><p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted"><Gauge size={13}/>{device.bandwidth}</p></article>)}</div><section className="panel p-5"><div><p className="section-title">Network Traffic</p><p className="mt-1 text-xs text-muted">Live aggregate traffic · Mbps</p></div><div className="mt-4"><TrafficChart data={metrics}/></div></section></div>
}

