import { Check, CircleAlert } from 'lucide-react'
import type { Alert } from '../../types'
import { useMonitorStore } from '../../store/useMonitorStore'

const styles = { critical: 'border-danger/35 bg-danger/5 text-danger', warning: 'border-warning/35 bg-warning/5 text-warning', info: 'border-primary/35 bg-primary/5 text-primary' }
export function AlertCard({ alert, compact = false }: { alert: Alert; compact?: boolean }) {
  const acknowledge = useMonitorStore(state => state.acknowledge)
  return <article className={`rounded-xl border p-4 ${styles[alert.severity]}`}><div className="flex gap-3"><CircleAlert size={18} className="shrink-0"/><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold tracking-[.15em]">{alert.severity.toUpperCase()}</p><h3 className="mt-1 text-sm font-semibold text-ink">{alert.device}</h3></div><span className="text-[10px] text-muted">{alert.timestamp}</span></div><p className="mt-2 text-xs text-muted">{alert.message}</p>{!compact && <button disabled={alert.acknowledged} onClick={() => acknowledge(alert.id)} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-current/30 px-2.5 py-1.5 text-[10px] font-bold transition hover:bg-white/5 disabled:cursor-default disabled:opacity-60">{alert.acknowledged ? <><Check size={12}/>ACKNOWLEDGED</> : 'ACKNOWLEDGE'}</button>}</div></div></article>
}

