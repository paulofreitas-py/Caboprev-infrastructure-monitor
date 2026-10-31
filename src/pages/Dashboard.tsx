import { Activity, AlertTriangle, Cpu, MemoryStick, Network, Server } from 'lucide-react'
import { useState } from 'react'
import { AlertCard } from '../components/alerts/AlertCard'
import { HealthChart, TrafficChart } from '../components/charts/MetricChart'
import { MetricCard } from '../components/dashboard/MetricCard'
import { EventTimeline } from '../components/events/EventTimeline'
import { useMonitorStore } from '../store/useMonitorStore'

export function DashboardPage() {
  const metrics = useMonitorStore(state => state.metrics)
  const events = useMonitorStore(state => state.events)
  const alerts = useMonitorStore(state => state.alerts)
  const [metric, setMetric] = useState<'cpu' | 'memory' | 'network' | 'availability'>('availability')
  const latest = metrics.at(-1)!
  const cards = [
    ['SYSTEM HEALTH', `${latest.availability}%`, '● Operational', Activity, 'success'], ['ACTIVE DEVICES', '17', '15 Online · 2 Offline', Server, 'primary'], ['ACTIVE ALERTS', `${alerts.filter(alert => !alert.acknowledged).length}`, '1 Critical · 3 Warning', AlertTriangle, 'danger'], ['NETWORK LATENCY', '4 ms', '↓ 12% vs last hour', Network, 'primary'], ['CPU USAGE', `${latest.cpu}%`, 'Normal', Cpu, 'purple'], ['MEMORY', `${latest.memory}%`, 'Normal', MemoryStick, 'warning']
  ] as const
  return <div className="space-y-5"><div><p className="eyebrow">Dashboard</p><h1 className="mt-1 text-2xl font-semibold tracking-tight">Infrastructure Overview</h1><p className="mt-2 text-sm text-muted">Real-time health and performance monitoring</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value, detail, icon, tone]) => <MetricCard key={label} label={label} value={value} detail={detail} icon={icon} tone={tone === 'purple' ? 'primary' : tone}/>)}</div><div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]"><section className="panel p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="section-title">Infrastructure Health</p><p className="mt-1 text-xs text-muted">Last 24 hours</p></div><div className="flex rounded-lg border border-border bg-surface p-1">{(['availability', 'cpu', 'memory', 'network'] as const).map(item => <button key={item} onClick={() => setMetric(item)} className={`rounded-md px-2.5 py-1.5 text-[10px] font-semibold capitalize transition ${metric === item ? 'bg-primary/15 text-primary' : 'text-muted hover:text-ink'}`}>{item}</button>)}</div></div><div className="mt-4"><HealthChart data={metrics} metric={metric}/></div></section><section className="panel p-5"><div><p className="section-title">Network Traffic</p><p className="mt-1 text-xs text-muted">Download / Upload · Mbps</p></div><div className="mt-5"><TrafficChart data={metrics}/></div></section></div><div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]"><section className="panel p-5"><div className="flex items-center justify-between"><div><p className="section-title">Recent Events</p><p className="mt-1 text-xs text-muted">Live monitoring stream</p></div><span className="text-[10px] font-bold text-success">LIVE</span></div><div className="mt-3"><EventTimeline events={events.slice(0, 5)}/></div></section><section className="panel p-5"><div><p className="section-title">Active Alerts</p><p className="mt-1 text-xs text-muted">Requires attention</p></div><div className="mt-4 space-y-3">{alerts.filter(alert => !alert.acknowledged).slice(0, 4).map(alert => <AlertCard key={alert.id} alert={alert} compact/>)}</div></section></div></div>
}
