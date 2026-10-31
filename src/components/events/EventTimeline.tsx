import type { MonitorEvent } from '../../types'

export function EventTimeline({ events }: { events: MonitorEvent[] }) {
  return <div className="divide-y divide-border/80">{events.map((event, index) => <div key={event.id} className="rise-in grid grid-cols-[70px_10px_1fr] gap-3 py-3" style={{ animationDelay: `${index * 40}ms` }}><time className="text-[10px] text-muted">{event.timestamp}</time><span className={`mt-1 h-2 w-2 rounded-full ${event.status === 'offline' ? 'bg-danger' : event.status === 'warning' ? 'bg-warning' : 'bg-success'}`}/><div><b className="text-xs font-medium">{event.device}</b><p className="mt-1 text-xs text-muted">{event.message}</p></div></div>)}</div>
}

