import type { Status } from '../../types'

const config: Record<Status, { text: string; className: string }> = {
  online: { text: 'ONLINE', className: 'bg-success/10 text-success ring-success/25' },
  offline: { text: 'OFFLINE', className: 'bg-danger/10 text-danger ring-danger/25' },
  warning: { text: 'WARNING', className: 'bg-warning/10 text-warning ring-warning/25' },
  info: { text: 'INFO', className: 'bg-primary/10 text-primary ring-primary/25' }
}

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  const item = config[status]
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold tracking-wide ring-1 ${item.className}`}><i className="status-dot bg-current" />{label ?? item.text}</span>
}

