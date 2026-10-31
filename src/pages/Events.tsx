import { useMemo, useState } from 'react'
import { EventTimeline } from '../components/events/EventTimeline'
import { useMonitorStore } from '../store/useMonitorStore'
import type { Status } from '../types'

export function EventsPage() {
  const events = useMonitorStore(state => state.events)
  const [filter, setFilter] = useState<'all' | Status>('all')
  const shown = useMemo(() => events.filter(event => filter === 'all' || event.status === filter), [events, filter])
  return <div className="space-y-5"><div><p className="eyebrow">Events</p><h1 className="mt-1 text-2xl font-semibold">Activity timeline</h1><p className="mt-2 text-sm text-muted">New monitoring events appear at the top automatically.</p></div><section className="panel p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="section-title">System stream</p><p className="mt-1 text-xs text-muted">{events.length} events retained in this local session</p></div><select className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-ink outline-none" value={filter} onChange={event => setFilter(event.target.value as 'all' | Status)}><option value="all">All statuses</option><option value="online">Operational</option><option value="warning">Warning</option><option value="offline">Offline</option></select></div><div className="mt-4"><EventTimeline events={shown}/></div></section></div>
}

