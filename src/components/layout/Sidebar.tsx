import { Activity, BellRing, Cable, ChevronRight, Gauge, LayoutDashboard, MonitorCog, Network, Printer, Server, Settings, ShieldAlert, X } from 'lucide-react'
import { useMonitorStore } from '../../store/useMonitorStore'

const navigation = [
  ['Dashboard', LayoutDashboard], ['Topology', Cable], ['Servers', Server], ['Network', Network], ['Printers', Printer], ['Alerts', ShieldAlert], ['Events', Activity]
] as const

export function Sidebar() {
  const activePage = useMonitorStore(state => state.activePage)
  const setActivePage = useMonitorStore(state => state.setActivePage)
  const open = useMonitorStore(state => state.sidebarOpen)
  const setOpen = useMonitorStore(state => state.setSidebarOpen)
  const presentation = useMonitorStore(state => state.presentationMode)
  if (presentation) return null
  return <aside className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-72 flex-col border-r border-border bg-surface/95 p-5 backdrop-blur-xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
    <div className="flex items-center justify-between"><button onClick={() => setActivePage('Dashboard')} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-sm font-black text-canvas">CI</span><span><b className="block text-sm tracking-[.12em]">CABOPREV</b><small className="text-[10px] text-muted">INFRASTRUCTURE MONITOR</small></span></button><button className="text-muted lg:hidden" onClick={() => setOpen(false)}><X size={18}/></button></div>
    <nav className="mt-9 space-y-1">{navigation.map(([name, Icon]) => <button key={name} onClick={() => setActivePage(name)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${activePage === name ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-panel hover:text-ink'}`}><Icon size={17}/><span className="flex-1">{name}</span>{activePage === name && <ChevronRight size={14}/>}</button>)}</nav>
    <p className="eyebrow mt-8 px-3">Infrastructure</p><div className="mt-3 space-y-1">{[['Overview', Gauge], ['Devices', MonitorCog], ['Connections', BellRing]].map(([name, Icon]) => <button key={name as string} onClick={() => setActivePage('Topology')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-panel hover:text-ink"><Icon size={16}/>{name as string}</button>)}</div>
    <div className="mt-auto border-t border-border pt-5"><div className="rounded-xl border border-success/20 bg-success/5 p-3"><p className="flex items-center gap-2 text-xs font-medium text-success"><i className="status-dot live-pulse bg-success"/>System Status</p><p className="mt-1 text-[11px] text-muted">All Systems Operational</p></div><button onClick={() => setActivePage('Settings')} className="mt-4 flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-panel"><span className="grid h-8 w-8 place-items-center rounded-full bg-purple/15 text-xs font-bold text-purple">P</span><span className="flex-1"><b className="block text-xs">Paulo</b><small className="text-[10px] text-muted">Infrastructure Admin</small></span><Settings size={15} className="text-muted"/></button></div>
  </aside>
}
