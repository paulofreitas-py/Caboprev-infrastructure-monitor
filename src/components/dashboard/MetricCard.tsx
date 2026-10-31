import type { LucideIcon } from 'lucide-react'

export function MetricCard({ label, value, detail, icon: Icon, tone = 'primary' }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: 'primary' | 'success' | 'warning' | 'danger' }) {
  const tones = { primary: 'bg-primary/10 text-primary', success: 'bg-success/10 text-success', warning: 'bg-warning/10 text-warning', danger: 'bg-danger/10 text-danger' }
  return <article className="panel rise-in p-5 transition hover:-translate-y-0.5 hover:border-primary/40"><div className="flex items-start justify-between"><div><p className="eyebrow">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p></div><span className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon size={18} /></span></div><p className="mt-3 text-xs text-muted">{detail}</p></article>
}

