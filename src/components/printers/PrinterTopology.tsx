import { Printer } from 'lucide-react'
import { printers } from '../../data/printers'
import { useMonitorStore } from '../../store/useMonitorStore'
import { StatusBadge } from '../ui/StatusBadge'

const positions = [[7, 18], [7, 72], [31, 10], [69, 10], [93, 18], [93, 72], [31, 82], [69, 82]]

export function PrinterTopology() {
  const setSelectedDevice = useMonitorStore(state => state.setSelectedDevice)
  return <section className="panel p-5"><div className="flex flex-wrap items-end justify-between gap-2"><div><p className="eyebrow">Printer Network Topology</p><h2 className="mt-1 section-title">Star network · Core Switch</h2></div><p className="text-xs text-muted">192.168.85.0/24</p></div><div className="relative mt-5 h-[520px] overflow-hidden rounded-xl border border-border bg-canvas topology-canvas">
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">{printers.map((printer, index) => { const [x, y] = positions[index]; const color = printer.status === 'offline' ? '#FF5C68' : '#35D07F'; return <line key={printer.id} className={printer.status === 'online' ? 'printer-link-online' : ''} x1="50" y1="50" x2={x} y2={y} stroke={color} strokeWidth=".28" strokeDasharray={printer.status === 'offline' ? '1.4 1.4' : undefined} /> })}</svg>
    <button onClick={() => setSelectedDevice('core-switch')} className="absolute left-1/2 top-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/50 bg-surface p-3 text-left shadow-panel"><span className="flex items-center gap-2 text-primary"><Printer size={15}/><b className="text-xs">CORE SWITCH</b></span><p className="mt-1 text-[10px] text-muted">Distribuição central</p><span className="mt-2 inline-flex items-center gap-1 text-[9px] text-success"><i className="status-dot live-pulse bg-success"/>ONLINE</span></button>
    {printers.map((printer, index) => { const [left, top] = positions[index]; return <button key={printer.id} onClick={() => setSelectedDevice(printer.id)} style={{ left: `${left}%`, top: `${top}%` }} className="absolute z-10 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-3 text-left shadow-panel transition hover:z-20 hover:border-primary"><span className="flex items-start justify-between gap-2"><Printer size={14} className="text-primary"/><StatusBadge status={printer.status}/></span><b className="mt-2 block truncate text-[10px]">{printer.location}</b><small className="mt-1 block text-[10px] text-muted">{printer.ip}</small></button> })}
  </div><p className="mt-3 text-[11px] text-muted">Cada impressora está ligada exclusivamente ao Core Switch. Enlaces offline não têm tráfego animado.</p></section>
}
