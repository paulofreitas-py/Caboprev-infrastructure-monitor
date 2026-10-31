import { Filter } from 'lucide-react'
import { useState } from 'react'
import { AlertCard } from '../components/alerts/AlertCard'
import { useMonitorStore } from '../store/useMonitorStore'
import type { Severity } from '../types'

type FilterKind = 'all' | Severity | 'resolved'
export function AlertsPage() {
  const alerts = useMonitorStore(state => state.alerts)
  const [filter, setFilter] = useState<FilterKind>('all')
  const shown = alerts.filter(alert => filter === 'all' || filter === 'resolved' ? filter === 'all' ? true : alert.acknowledged : alert.severity === filter)
  const filters: [FilterKind, string][] = [['all','All'], ['critical','Critical'], ['warning','Warning'], ['info','Info'], ['resolved','Resolved']]
  return <div className="space-y-5"><div><p className="eyebrow">Alerts</p><h1 className="mt-1 text-2xl font-semibold">Alert center</h1><p className="mt-2 text-sm text-muted">Prioritize and acknowledge infrastructure conditions.</p></div><div className="grid gap-4 sm:grid-cols-3"><Counter label="Critical" count={alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged).length} tone="danger"/><Counter label="Warning" count={alerts.filter(alert => alert.severity === 'warning' && !alert.acknowledged).length} tone="warning"/><Counter label="Info" count={alerts.filter(alert => alert.severity === 'info' && !alert.acknowledged).length} tone="primary"/></div><section className="panel p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="section-title">Active and historical alerts</p><p className="mt-1 text-xs text-muted">Acknowledgements are stored locally.</p></div><div className="flex flex-wrap rounded-lg border border-border bg-surface p-1">{filters.map(([key, label]) => <button key={key} onClick={() => setFilter(key)} className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition ${filter === key ? 'bg-primary/15 text-primary' : 'text-muted hover:text-ink'}`}>{label}</button>)}</div></div><div className="mt-5 grid gap-3 lg:grid-cols-2">{shown.map(alert => <AlertCard key={alert.id} alert={alert}/>)}</div>{shown.length === 0 && <div className="py-16 text-center text-sm text-muted"><Filter size={22} className="mx-auto mb-3"/>No alerts match this filter.</div>}</section></div>
}
function Counter({ label, count, tone }: { label: string; count: number; tone: 'danger' | 'warning' | 'primary' }) { const colors = { danger: 'text-danger', warning: 'text-warning', primary: 'text-primary' }; return <div className="panel p-4"><p className="eyebrow">{label}</p><p className={`mt-2 text-3xl font-semibold ${colors[tone]}`}>{count}</p></div> }

