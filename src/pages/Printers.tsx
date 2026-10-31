import { Printer as PrinterIcon } from 'lucide-react'
import { PrinterTopology } from '../components/printers/PrinterTopology'
import { StatusBadge } from '../components/ui/StatusBadge'
import { printers } from '../data/printers'
import { useMonitorStore } from '../store/useMonitorStore'

export function PrintersPage() {
  const setSelectedDevice = useMonitorStore(state => state.setSelectedDevice)
  const summary = { total: printers.length, online: printers.filter(item => item.status === 'online').length, offline: printers.filter(item => item.status === 'offline').length }
  return <div className="space-y-5"><div><p className="eyebrow">Printers</p><h1 className="mt-1 text-2xl font-semibold">Printer Fleet</h1><p className="mt-2 text-sm text-muted">Availability, consumables and connectivity across the print network.</p></div><div className="grid gap-4 sm:grid-cols-4">{[['Total Printers', summary.total, 'primary'],['Online', summary.online, 'success'],['Offline', summary.offline, 'danger'],['Warning', 0, 'warning']].map(([label,value,tone]) => <div key={label as string} className="panel p-4"><p className="eyebrow">{label}</p><p className={`mt-2 text-2xl font-semibold text-${tone}`}>{value}</p></div>)}</div><section className="panel p-5"><div className="flex items-center gap-2"><PrinterIcon size={16} className="text-primary"/><div><p className="section-title">Fleet status</p><p className="mt-1 text-xs text-muted">Values update subtly when monitoring is active.</p></div></div><div className="table-shell mt-5"><table><thead><tr>{['Status','Printer','Location','IP','Model','Ping','Toner','Pages','Last Check'].map(item => <th key={item}>{item}</th>)}</tr></thead><tbody>{printers.map(printer => <tr key={printer.id} className="cursor-pointer hover:bg-surface" onClick={() => setSelectedDevice(printer.id)}><td><StatusBadge status={printer.status}/></td><td className="font-medium">{printer.name}</td><td>{printer.location}</td><td className="text-muted">{printer.ip}</td><td className="max-w-44 truncate">{printer.model}</td><td>{printer.ping === null ? 'Sem resposta' : `${printer.ping} ms`}</td><td>{printer.toner === null ? '—' : `${printer.toner}%`}</td><td>{printer.pages?.toLocaleString('pt-BR') ?? '—'}</td><td className="text-muted">{printer.lastCheck}</td></tr>)}</tbody></table></div></section><PrinterTopology/></div>
}

